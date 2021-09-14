const AUDIO = new Audio();

let IS_PLAYING = false;

const playbackStart = () => AUDIO.play();
const playbackStop = () => AUDIO.pause();

const drawAudioComponent = (anchor = "palyer-anchor") => {
  $(`#${anchor}`).empty().append(`
<div class="flex justify-content-space-around w-100 player">
  <button
    id="play-pause"
    type="button"
  >
    ${IS_PLAYING ? 'Pause' : 'play'}
  </button>
</div>
  `);
};
