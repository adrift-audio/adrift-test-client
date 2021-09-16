const TorrentClient = new WebTorrent();

TorrentClient.on('error', console.error);

const LINKS = [];

const AUDIO = new Audio();

function downloadTorrent(magnet = '', track) {
  if (!magnet) {
    return console.error('magnet link is empty!');
  }

  const [existing] = LINKS.filter(({ id }) => id === track.id);
  if (existing) {
    $('#download-progress').empty().append('100%');
    IS_PLAYING = true;
    AUDIO.src = existing.link;
    AUDIO.play();
    Player();
  }

  console.log('got magnet', magnet);
  TorrentClient.add(magnet, (torrent) => {
    console.log('got torrent', torrent);

    torrent.on('done', () => {
      torrent.files[0].getBlob((err, blob) => {
        if (err) {
          throw err;
        }

        const link = URL.createObjectURL(blob);
        LINKS.push({
          id: track.id,
          link,
        });

        $('#download-progress').empty().append('100%')
        IS_PLAYING = true;
        AUDIO.src = link;
        AUDIO.play();
        Player();
      });
    });

    torrent.on(
      'download',
      () => $('#download-progress').empty().append(`${Math.floor(torrent.progress * 100)}%`),
    );
  });
}
