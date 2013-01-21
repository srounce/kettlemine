var nodemailer = require('nodemailer')
  , config = require('../config.js')
  , TeaRound = require('../lib/models/tearound');

var routePrefix = "/arduino";

var routes = {
  index : {
    all : function( req, res ) {
      res.send('Hello arduino!');
    }
  }, 
  ready : {
    all : function( req, res ) {
      var smtpTransport = nodemailer.createTransport("SMTP", config.email);

      smtpTransport.sendMail({
        from : config.strings.title + ' <' + config.email.auth.user + '>',
        to : config.strings.email.to,
        subject : config.strings.email.subject,
        text : config.strings.email.plaintext,
        html : config.strings.email.html
      }, function( err, mState ) {
        if( err ) {
          console.error(err)
          res.send(0);
        } else {
          console.info(mState);
          res.send(1);
        }
      });
    },
  },
  count : {
    all : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      res.send(teaCounter.toString());
    },
    del : function( req, res ) {
      var teaCounter = res.app.locals.teaCounter;
      var sessionStore = res.app.get('sessionStore');
      var smtpTransport = nodemailer.createTransport("SMTP", config.email);

      var sids = Object.keys(sessionStore.sessions);
console.log(sids.length);      
      sids.forEach(function( sid ) {
        var session = JSON.parse(sessionStore.sessions[sid]);
console.log(sids);
        
        if( session.wantsTea && session.email && session.email !== false ) {
          smtpTransport.sendMail({
            from : config.strings.title + ' <' + config.email.auth.user + '>',
            to : session.email,
            subject : "Tea's ready!",
            text : "Plaintext message goes here",
            html : "<b>HTML</b> message <em>goes</em> here!"
          }, function( err, res ) {
            if( err ) 
              console.error(err)
            else
              console.info(res);
          });
        }

        session.wantsTea = false;
        sessionStore.sessions[sid] = JSON.stringify(session);

        if( sid === sids[ sids.length -1 ] ) {
          smtpTransport.close();
        }
      }.bind(this));
      res.send( String(teaCounter.reset() ? 1 : 0) );
    }
  }
};
 
exports.init = function( server ) 
{
  server.all(routePrefix, routes.index.all);
  
  server.all(routePrefix+"/ready", routes.ready.all);
  
  server.del(routePrefix+"/count", routes.count.del);
  server.all(routePrefix+"/count", routes.count.all);
};
