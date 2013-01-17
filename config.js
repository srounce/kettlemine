module.exports = exports = {};

exports.server = {
  hostname : '0.0.0.0',
  port : 8888
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
  title : "title",
  email : {
    to : "samuel@theoneoff.com",
    subject : "",
    html : "<form action=\"http://" + exports.server.hostname + ":8888/choose\" method=\"POST\"><button type=\"submit\">Tea!</button></form>",
    plaintext : ""
  }
};
