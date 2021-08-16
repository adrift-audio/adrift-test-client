const TorrentClient = new WebTorrent();

TorrentClient.on('error', console.error);

function downloadTorrent(magnet = '') {
  if (!magnet) {
    return console.error('magnet link is empty!');
  }

  console.log('got magnet', magnet);
  TorrentClient.add(magnet, (torrent) => {
    const [audio] = torrent.files;

    audio.appendTo('body', { autoplay: true });
  });
}
