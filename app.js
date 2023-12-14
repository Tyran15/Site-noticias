const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Noticias')

const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

const indexRouter = require('./routes/index');
app.get('/', indexRouter);
app.get('/login', indexRouter);
app.get('/cadastro', indexRouter);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
