import express from 'express';

const app = express();

app.use(express.static('public'));

app.get(
  '*',
  (_, res) => res.redirect('/'),
);

app.listen(
  7357,
  () => console.log('-- ADRIFT-TEST-CLIENT is  running on port 7357'),
);
