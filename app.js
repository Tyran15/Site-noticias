const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/Noticias', ({
  useNewUrlParser: true,
  useUnifiedTopology: true
}));

const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');

app.get('/', indexRouter);
app.get('/login', indexRouter);
app.get('/cadastro', indexRouter);

app.post('/cadastro', indexRouter);
app.post('/login', indexRouter);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
