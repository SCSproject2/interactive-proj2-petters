const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3006;
const app = express();
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

<<<<<<< HEAD



sequelize.sync({ force: true }).then(() => {
=======
sequelize.sync({ force: false }).then(() => {
>>>>>>> 1a53b03db2f25f3449f5e7ec0e65bbcd0b258dbf
  app.listen(PORT, () => console.log('Now listening'));
});
