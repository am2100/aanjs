var express = require('express'),
    path = require('path'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: 'catscanfly'}));

var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  // development specific settings
  app.use(session({secret: config.sessionSecret}));
} else {
  // production specific settings
}
require('./routes/routes.js')(express, app);

app.listen(3000, function(){
  console.log('ChatCat working on Port 3000');
  console.log('Mode: ' + env);
})
