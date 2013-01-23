var nodemailer = require('nodemailer')
  , config = require('../config.js')
  , libutil = require('../lib/util')
  , TeaRound = require('../lib/models/tearound');

var routePrefix = "/arduino";

var routes = {
  index : {
    all : function( req, res ) {
      res.send('Hello arduino!');
    }
  }, 
  round : {
    post : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      var sessionStore = res.app.get('sessionStore');
      var smtpTransport = nodemailer.createTransport("SMTP", config.email);

      var sids = Object.keys(sessionStore.sessions);

      sids.forEach(function( sid ) {
        var session = JSON.parse(sessionStore.sessions[ sid ]);
console.log(session);
        if( session.wantsTea ) {
console.log('yeah');
          smtpTransport.sendMail({
            from : config.strings.title + ' <' + config.email.auth.user + '>',
            to : session.email,
            subject : config.strings.email.teaReady.subject,
            text : config.strings.email.teaReady.plaintext,
            html : config.strings.email.teaReady.html
          }, function( err, mState ) {
            if( err ) {
              console.error(err)
              res.send(0);
            } else {
              console.info(mState);
              res.send(1);
            }
          });

          session.wantsTea = false;

        }

      });

      res.app.locals.teaCounter.reset();

      res.end();
    }
  },
  reset : {
    post : function( req, res ) {

    }
  },
  count : {
    get : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      res.send(teaCounter.toString());
    },
    del : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      var sessionStore = res.app.get('sessionStore');
      var smtpTransport = nodemailer.createTransport("SMTP", config.email);

      var sids = Object.keys(sessionStore.sessions);

      sids.forEach(function( sid ) {
        var session = JSON.parse(store.sessions[ sid ]);
        
        if( session.wantsTea && session.email && session.email !== false ) {
          smtpTransport.sendMail({
            from : config.strings.title + ' <' + config.email.auth.user + '>',
            to : session.email,
            subject : config.strings.email.newround.subject,
            html : config.strings.email.newround.html,
            text : config.strings.email.newround.plaintext
          }, function( err, res ) {
            if( err ) 
              console.error(err)
            else
              console.info(res);
          });
        }

        session.wantsTea = false;
        sessionStore.sessions[sid] = JSON.stringify(session);
      }.bind(this));

      smtpTransport.close();

      res.send( String(teaCounter.reset() ? 1 : 0) );
    }
  }
};
 
exports.init = function( server ) 
{
  server.all(libutil.validUrl(routePrefix), routes.index.all);
  
  server.post(libutil.validUrl(routePrefix, "/round"), routes.round.post);

  server.post(libutil.validUrl(routePrefix, "/reset"), routes.reset.post);
  
  server.del(libutil.validUrl(routePrefix, "/count"), routes.count.del);
  server.all(libutil.validUrl(routePrefix, "/count"), routes.count.get);
};

function iterateSessions( store, iterFunc, who )
{
  var sids = Object.keys(store.sessions);
  
  sids.forEach(function( sid, key ) {
    var session = JSON.parse(store.sessions[ sid ]);
    
    iterFunc(session, sid);

  });
}
