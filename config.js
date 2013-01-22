module.exports = exports = {};

exports.server = {
  hostname : '0.0.0.0',
  port : 8081
};

exports.email = {
  service : 'Gmail',
  auth : {
    user : 'samuel@theoneoff.com',
    pass : 'qBGV4sr5'
  }
};

exports.cookies = {
  secret : 'CookieMonstahhhhh!!11'
};

exports.strings = {
  title : "Kettle'in"
};

exports.strings.email = {
  newRound : {
    subject : "Fancy a cuppa?",
    html : "<p>Yo!<br><br>I've got some tea on the way. Care for a mug?</p><form action=\"http://" + exports.server.hostname + (exports.server.port === 80) ? '' : (':' + exports.server.port) + "/email/opt\" method=\"POST\"><button type=\"submit\">Tea!</button></form><p>Lots of warm, sweet, love,<br><br><b>The Kettle</b>",
    plaintext : ""
  },
  teaReady : {
    subject : "Ready when you are!",
    html : "<p>Hey!</p><p>Your luvverly cuppa is ready and awaiting you sippage",
    plaintext : ""
  }
};
