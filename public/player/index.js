let IS_MUTED = false;
let IS_PLAYING = false;
let LOADED_DATA = {};
let LOCK_TRACK_SLIDER = false;
let SELECTED_TRACK = {};

function drawSlider(value = 1) {
  if (LOCK_TRACK_SLIDER) {
    return null;
  }

  return $('#track-slider-container').empty().append(`
<input
  class="w-100"
  disabled
  id="track-slider"
  max="200"
  min="1"
  name="track-slider"
  type="range"
  value="${String(value)}"
/>  
  `);
}

function Player(anchor = '#home-player') {
  $(anchor).empty();

  $('#select-player').addClass('tab-selected');
  $('#select-playlist').removeClass('tab-selected');
  TAB = 'player';
  $(anchor).append(`
<div class="flex justify-content-space-between">
  <div>
    ${SELECTED_TRACK.name || ''}
  </div>
  <div id="download-progress"></div>
</div>
  `);
  $(anchor).append(`
<div class="flex justify-content-space-around w-100 mt-1">
  <button
    id="play-pause"
    type="button"
  >
    ${IS_PLAYING ? 'Pause' : 'Play'}
  </button>
  <button
    id="play-previous"
    type="button"
  >
    Previous
  </button>
  <button
    id="play-next"
    type="button"
  >
    Next
  </button>
  <button
    id="stop-playback"
    type="button"
  >
    Stop
  </button>
  <input
    id="volume-slider"
    max="1"
    min="0"
    name="volume-slider"
    step="0.01"
    type="range"
  />
  <button
    id="mute-playback"
    type="button"
  >
    ${IS_MUTED ? 'Unmute' : 'Mute'}
  </button>
</div>
<div
  id="track-slider-container"
  class="flex w-100"
></div>
  `);

  drawSlider(1);

  $('#play-pause').on('click', () => {
    if (IS_PLAYING) {
      AUDIO.pause();
    } else {
      AUDIO.play();
    }

    IS_PLAYING = !IS_PLAYING;
    return Player();
  });

  $('#volume-slider').on('input', (event) => {
    AUDIO.volume = event.target.value;
  });

  AUDIO.ontimeupdate = () => {
    const time = AUDIO.currentTime;
    const sliderValue = Math.round(time / (Number(SELECTED_TRACK.duration) / 200));
    drawSlider(sliderValue);
  };

  // TODO: handle track seeking functionality
}
