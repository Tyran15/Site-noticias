const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Noticias')

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
