const onLoadWindow = () => {
  const playButton = document.querySelector('.video-player__play-button');
  let player = null;

  window.console.log('YT - ', YT);

  player = new YT.Player('player', {
    videoId: 'NR2pM95f8Rw',
  });

  const videoPlayer = document.querySelector('.video-player-wrapper');

  videoPlayer.addEventListener('click', () => {
    document.querySelector('.video-player-wrapper #player').style.display = 'block';
    playButton.style.display = 'none';
    player.playVideo();
  });
};

// window.attachEvent ? window.attachEvent('onload', onLoadWindow) : window.addEventListener('load', onLoadWindow);

window.addEventListener('load', onLoadWindow);
