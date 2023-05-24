var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session')
var mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session) 

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017")

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  store: new MongoDBStore({
    uri: process.env.DATABASE_CONNECTION_STRING,
    collection:"mySession"
  }),
  cookie: {
    maxAge: 100000,
  },
  resave: false
}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
