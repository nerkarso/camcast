const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const appInfo = {
  appName: process.env.APP_NAME,
  appDescription: process.env.APP_DESCRIPTION,
  appOgImage: process.env.APP_OG_IMAGE,
};

console.log(appInfo);

app.get('/', (req, res) => {
  res.render('index', { isCaster: false, ...appInfo });
});

app.get('/cast', (req, res) => {
  res.render('index', { isCaster: true, ...appInfo });
});

app.listen(process.env.PORT || 5000);
