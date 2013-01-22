
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , browserify = require('browserify')
  , browserijade = require("browserijade")
  , config = require('./config')
  , util = require('util')
  , libutil = require('./lib/util')

var app = express()
  , staticPath = path.join(__dirname, 'public')
  , sessionStore = new express.session.MemoryStore;

app.configure(function(){
  app.set('port', config.server.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.set('title', config.strings.title);
  app.set('sessionStore', sessionStore);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.cookies.secret));
  app.use(express.session({
    key : 'kettlemine.sid',
    store : sessionStore
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
  app.use(express.static(staticPath));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.locals.util = libutil;

// Routes
routes(app);

util.print('Generating browser bundle...');
var bundle = browserify({ watch : true });
//bundle.alias( 'client', path.join(staticPath, 'js') );
bundle.addEntry( path.join(staticPath, 'js/KettleApp.js') );
bundle.use( browserijade( app.get('views'), ['layout.jade'], { debug : true } ) );
app.use(bundle);
util.print('Done!\n');

http.createServer(app).listen(app.get('port'), function(){
  console.log( '---------------------------------'.bold );
  console.log( (config.strings.title + " listening on port " + app.get('port')).green );
});
