const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/Noticias', ({
  useNewUrlParser: true,
  useUnifiedTopology: true
}));

const app = express();
const port = 3000;

app.use(session({
  secret: 'ndijjsandijqokdoiqwjadiuehidabsdijsandi',
  resave: false,
  saveUninitialized: true,
}));

app.use(cookieParser('dsakdnskandokasndwoqidnqedbekjacxz'));

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/img/avatar_user/');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');

app.get('/', indexRouter);
app.get('/login', indexRouter);
app.get('/cadastro', indexRouter);
app.get('/dashboard', indexRouter);

app.post('/cadastro', upload.single("file"), indexRouter);
app.post('/login', indexRouter);

app.get('/logout', indexRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
