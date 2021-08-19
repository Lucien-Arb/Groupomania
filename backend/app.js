const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');

const routesPosts = require('./routes/routesPosts');
const routesUsers = require('./routes/routesUsers');
const routesMod = require('./routes/routesMod');

const app = express();

app.use(xss());
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/post', routesPosts);
  app.use('/api/auth', routesUsers);
  app.use('/api/moderation', routesMod);


module.exports = app;