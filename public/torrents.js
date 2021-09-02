const TorrentClient = new WebTorrent();

TorrentClient.on('error', console.error);

function downloadTorrent(magnet = '', progressAnchor = 'progress') {
  if (!magnet) {
    return console.error('magnet link is empty!');
  }

  console.log('got magnet', magnet);
  TorrentClient.add(magnet, (torrent) => {
    console.log(torrent);
    const [audio] = torrent.files;

    torrent.on('download', () => $(`#${progressAnchor}`).empty().append(torrent.progress));

    audio.appendTo(
      'body',
      {
        autoplay: true,
        muted: false,
        controls: true,
      },
    );
  });
}
