
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', config.server.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.set('title', config.strings.title);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.cookies.secret));
  app.use(express.session({
    key : 'kettlemine.sid'
  }));
  app.use(app.router);
  app.use(stylus.middleware({
    src : __dirname + '/public',
    compile : function compile(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
    }
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log( '---------------------------------'.bold );
  console.log( ("KettleMine listening on port " + app.get('port')).green );
});
