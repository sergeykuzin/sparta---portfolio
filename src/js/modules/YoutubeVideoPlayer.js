const onLoadWindow = () => {
  const playButton = document.querySelector('.video-player__play-button');
  const videoPlayer = document.querySelector('.video-player-wrapper');
  let player = null;

  player = new YT.Player('player', {
    videoId: 'NR2pM95f8Rw',
  });

  videoPlayer.addEventListener('click', () => {
    document.querySelector('.video-player-wrapper #player').style.display = 'block';
    playButton.style.display = 'none';
    player.playVideo();
  });
};

window.addEventListener('load', onLoadWindow);
