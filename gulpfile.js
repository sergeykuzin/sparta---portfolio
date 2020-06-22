'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const pug = require('gulp-pug');
const webpack = require('webpack-stream');
const browsersync = require('browser-sync');
const del = require('del');
const webp = require('gulp-webp');

const dist = './dist/';

gulp.task('buildHtml', () => gulp
  .src('./src/pug/pages/*.pug')
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest(dist))
  .pipe(browsersync.stream()));

gulp.task('buildCss', () => gulp
  .src('./src/sass/pages/*.scss')
  .pipe(sass())
  .pipe(autoprefixer({ cascade: false }))
  .pipe(csso({ restructure: true }))
  .pipe(gulp.dest(`${dist}css/`))
  .pipe(browsersync.stream()));

gulp.task('createWebp', () => gulp
  .src([
    './src/img/**',
    '!./src/img/sprite/**',
    '!./src/img/webp/**',
    '!./src/img/icon-raster/**',
    '!./src/img/icon-vector/**',
  ], { nodir: true })
  .pipe(webp({ quality: 80 }))
  .pipe(gulp.dest('./src/img/webp/')));

gulp.task('copyImage', () => gulp
  .src('./src/img/**/*')
  .pipe(gulp.dest(`${dist}img/`)));

gulp.task('copyFonts', () => gulp
  .src('./src/fonts/**/*')
  .pipe(gulp.dest(`${dist}fonts/`)));

gulp.task('clean', () => del(dist));

gulp.task('build-js', () => gulp
  .src('./src/js/main.js')
  .pipe(
    webpack({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      watch: false,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      debug: true,
                      corejs: 3,
                      useBuiltIns: 'usage',
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    }),
  )
  .pipe(gulp.dest(`${dist}js/`))
  .on('end', browsersync.reload));

gulp.task('watch', () => {
  browsersync.init({
    server: dist,
    port: 4000,
    notify: true,
  });

  gulp.watch('./src/pug/**/*.pug', gulp.parallel('buildHtml'));
  gulp.watch('./src/sass/**/*.scss', gulp.parallel('buildCss'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));
  gulp.watch('./src/img/**/*', gulp.parallel('copyImage'));
});

gulp.task('build', gulp.series('clean', 'buildHtml', 'buildCss', 'build-js', 'createWebp', 'copyImage', 'copyFonts'));

gulp.task('build-prod-js', () => gulp
  .src('./src/js/main.js')
  .pipe(
    webpack({
      mode: 'production',
      output: {
        filename: './js/main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      corejs: 3,
                      useBuiltIns: 'usage',
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    }),
  )
  .pipe(gulp.dest(dist)));

gulp.task('default', gulp.parallel('watch', 'build'));
