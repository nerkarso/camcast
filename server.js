const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { isCaster: false });
});

app.get('/cast', (req, res) => {
  res.render('index', { isCaster: true });
});

app.listen(3000);
