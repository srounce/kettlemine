var path = require('path');

module.exports.validUrl = function validUrl( segments )
{
  var args = Array.prototype.slice.apply(arguments);
  args.splice(0, 0, '/');
  return path.join.apply(this, args);
};

