const TorrentClient = new WebTorrent();

TorrentClient.on('error', console.error);

const LINKS = [];

// total space used for file storing
let TOTAL_SPACE = 0;

function downloadTorrent(magnet = '', progressAnchor = 'progress', track) {
  if (!magnet) {
    return console.error('magnet link is empty!');
  }

  const [existing] = LINKS.filter(({ id }) => id === track.id);
  console.log(existing);
  if (existing) {
    console.log('total space used', TOTAL_SPACE / 1024 / 1024);
    $(`#${progressAnchor}`).empty().append('100%');
    return $('#audio').empty().append(`
<audio autoplay controls>
  <source src="${existing.link}"
</audio>   
    `);
  }

  console.log('got magnet', magnet);
  TorrentClient.add(magnet, (torrent) => {
    console.log('got torrent', torrent);

    torrent.on('done', () => {
      TOTAL_SPACE += torrent.files[0].length;
      torrent.files[0].getBlob((err, blob) => {
        if (err) {
          throw err;
        }

        const link = URL.createObjectURL(blob);
        LINKS.push({
          id: track.id,
          link,
        });
  
        $('#audio').empty().append(`
  <audio autoplay controls>
    <source src="${link}"
  </audio>   
        `);

        console.log('total space used', TOTAL_SPACE / 1024 / 1024);
      });
    });

    torrent.on(
      'download',
      () => $(`#${progressAnchor}`).empty().append(`${Math.floor(torrent.progress * 100)}%`),
    );
  });
}
