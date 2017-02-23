const express = require('express');

const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index');
}))
