// SELECTORS

const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const toggleBtn = document.querySelector('.player__button');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const fullscreen = document.querySelector('.player__button--fullscreen');
const skipBtns = document.querySelectorAll('.player__button--skip');
// HANDLERS

function toggleVideo(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton(e) {
  const button = video.paused ? '▶️' : '⏸️';
  toggleBtn.textContent = button;
}

function updateValue(e) {
  video[this.name] = this.value;
  console.log(video.volume);
}

function handleProgress(e) {
  const percentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${Math.floor(percentage)}%`;
}

function handleSetTime(e) {
  const percentage = Math.floor((e.offsetX / progress.offsetWidth) * 100);
  progressFilled.style.flexBasis = `${Math.floor(percentage)}%`;
  video.currentTime = video.duration * (percentage / 100);
}

function handleFullScreen(e) {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function handleSkip(e) {
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

// EVENT HOOKS
video.addEventListener('click', toggleVideo);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggleBtn.addEventListener('click', toggleVideo);
volume.addEventListener('change', updateValue);
playbackRate.addEventListener('change', updateValue);
progress.addEventListener('click', handleSetTime);
fullscreen.addEventListener('click', handleFullScreen);
skipBtns.forEach((skipBtn) => {
  skipBtn.addEventListener('click', handleSkip);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    console.log('space clicked');
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
});
