const gulp = require('gulp');
// SCSS => CSS
const sass = require('gulp-sass');
// PUG => HTML
const pug = require('gulp-pug');
// CSS vendor prefixes
const autoprefixer = require('gulp-autoprefixer');
// CSS minification
const csso = require('gulp-csso');
// Create a raster sprite
const spritesmith = require('gulp.spritesmith');
// Create SVG sprite
const svgSprite = require('gulp-svg-sprite');
// Converting images to webp
const webp = require('gulp-webp');
// Add hash to file name
const rev = require('gulp-rev');
// Delete the original file rewritten by gulp-rev.
const revdel = require('gulp-rev-delete-original');
// Replacing HTML links for CSS with new CSS names with hashes
const revCollector = require('gulp-rev-collector');
// Deleting files / directories
const del = require('del');
// Hot reload
const browserSync = require('browser-sync').create();


const pugConfig = { pretty: true };

const spritesmithConfig = {
  imgName: 'sprite.png',
  cssName: 'sprite.scss',
  cssFormat: 'scss',
  algorithm: 'binary-tree',
  imgPath: '../img/sprite/sprite.png',
};

// PUG => HTML
function buildHtml() {
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug(pugConfig))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulp.dest('./src/template-html-for-webpack'))
    .pipe(browserSync.stream());
}
exports.buildHtml = buildHtml;

// SCSS => CSS => prefixes => minification
function buildCss() {
  return gulp.src([
    './src/sass/core.scss',
    './src/sass/pages/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(csso({ restructure: true }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}
exports.buildCss = buildCss;

// Create a raster sprite
function rasterSprite() {
  return gulp.src('./src/img/icon-raster/*.png')
    .pipe(spritesmith(spritesmithConfig))
    .pipe(gulp.dest('./src/img/sprite/'));
}
exports.rasterSprite = rasterSprite;

// Create SVG sprite
function vectorSprite() {
  return gulp.src('./src/img/icon-vector/*.svg')
    .pipe(svgSprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
      },

      mode: {

        symbol: {
          bust: false,
          dest: './',
          sprite: './vector-sprite',
          common: 'background-image',
        },

      },
    }))
    .pipe(gulp.dest('./src/img/sprite'));
}
exports.vectorSprite = vectorSprite;

// Converting images to webp
function createWebp() {
  return gulp.src([
    './src/img/**',
    '!./src/img/sprite/**',
    '!./src/img/webp/**',
    '!./src/img/icon-raster/**',
    '!./src/img/icon-vector/**'], {
    nodir: true,
  })
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('./src/img/webp/'));
}
exports.createWebp = createWebp;

// Add hash to file name
function hashForCss() {
  return gulp.src('./dist/css/*.css')
    .pipe(rev())
    .pipe(revdel())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/manifest-for-hash-css'))
    .pipe(gulp.src(['./src/manifest-for-hash-css/*.json', 'dist/*.html']));
}
exports.hashForCss = hashForCss;

// Replacing HTML links for CSS with new CSS names with hashes
function replaceCssHashLinkInHtml() {
  return gulp.src([
    'src/manifest-for-hash-css/*.json', 'dist/*.html'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        css: 'css',
      },
    }))
    .pipe(gulp.dest('dist'));
}
exports.replaceCssHashLinkInHtml = replaceCssHashLinkInHtml;

// Copy source to production folder
function copy() {
  return gulp.src([
    './src/fonts/**',
    '!./src/img/icon-raster/*.png',
    '!./src/img/icon-vector/*.svg',
    './src/img/**/*.png',
    './src/img/**/*.jpg',
    './src/img/**/*.svg',
    './src/img/**/*.webp',
    './src/js/vendor/**',
    './src/video/**',
  ], {
    base: './src/',
  })
    .pipe(gulp.dest('./dist/'));
}
exports.copy = copy;

// Delete production folder
function clean() {
  return del('./dist');
}
exports.clean = clean;

// Start server + watch for changes
function serve() {
  browserSync.init({
    server: './dist',
    notify: false,
  });

  gulp.watch('./src/sass/**/*.scss', buildCss);
  gulp.watch('./src/pug/**/*.pug', buildHtml);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}
exports.serve = serve;

// Build for development
exports.dev = gulp.series(
  clean,
  rasterSprite,
  buildHtml,
  buildCss,
  vectorSprite,
  copy,
);

// Build for production
exports.build = gulp.series(
  clean,
  rasterSprite,
  buildHtml,
  buildCss,
  hashForCss,
  vectorSprite,
  replaceCssHashLinkInHtml,
  createWebp,
  copy,
);
