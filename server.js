const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./app/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./app/controllers'));


// ====================================
app.get('/upload', (req, res) => {
  res.render('main.handlebars');
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('image uploaded');
});

// ====================================

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
