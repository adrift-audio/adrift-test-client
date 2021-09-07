const TorrentClient = new WebTorrent();

TorrentClient.on('error', console.error);

function downloadTorrent(magnet = '', progressAnchor = 'progress') {
  if (!magnet) {
    return console.error('magnet link is empty!');
  }

  console.log('got magnet', magnet);
  TorrentClient.add(magnet, (torrent) => {
    console.log('got torrent', torrent);

    torrent.on('done', () => {
      const [audio] = torrent.files;
      console.log('track', audio);

      audio.getBlobUrl((err, url) => {
        if (err) {
          throw err;
        }
  
        $('#audio').empty().append(`
  <audio autoplay controls>
    <source src="${url}"
  </audio>   
        `);
      });
    });

    torrent.on('download', () => $(`#${progressAnchor}`).empty().append(torrent.progress));

    // audio.appendTo(
    //   'body',
    //   {
    //     autoplay: true,
    //     muted: false,
    //     controls: true,
    //   },
    // );
  });
}
