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
  title : "Kettlemin"
};

exports.strings.email = {
  subject : "Fancy a cuppa?",
  html : "<p>Yo!<br><br>I've got some tea on the way. Care for a mug?</p><form action=\"http://" + exports.server.hostname + (exports.server.port === 80) ? '' : (':' + exports.server.port) + "/choose\" method=\"POST\"><button type=\"submit\">Tea!</button></form><p>Lots of warm, sweet (slightly milky) love,<br><br><b>The Kettle</b>",
  plaintext : ""
}
