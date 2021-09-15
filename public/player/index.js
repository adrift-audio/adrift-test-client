let SELECTED_TRACK = {};
let LOADED_DATA = {};

function Player(anchor = '#home-player') {
  console.log('is here');
  $(anchor).empty();

  $('#select-player').addClass('tab-selected');
  $('#select-playlist').removeClass('tab-selected');
  TAB = 'player';
  $(anchor).append(`Selected track: ${SELECTED_TRACK.name}`);
}