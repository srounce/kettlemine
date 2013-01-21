var util = require('util');

module.exports = function( )
{
  var _store = new Array();

  var TeaRound = function TeaRound(values)
  {
    if(values) {
      values.forEach(function() {
        store.push(this);
      });
    }
  };

  TeaRound.prototype.get = function()
  {
    return util.inherits({}, _store);
  };

  TeaRound.prototype.add = function( value )
  {
    _store.push(value);
    return _store.length;
  };

  TeaRound.prototype.remove = function( value )
  {
    var index = _store.indexOf(value);

    if( _store[index] ) {
      var oldVal = _store[index];
      _removeAtIndex(index);
      return oldVal;
    }
  };

  TeaRound.prototype.exists = function( value )
  {
    _exists(value);
  };

  return new TeaRound();
};

function _removeAtIndex( index )
{
  _store.splice(index, 0);
}

function _exists( value )
{
  return _store.indexOf( value ) >= 0;
}
