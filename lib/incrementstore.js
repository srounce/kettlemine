module.exports = function IncrementStore( value )
{

  var IncrementStore;
  
  var _value;
  
  IncrementStore = function IncrementStore( value )
  {
    _value = parseInt(value) || 0;
  };

  IncrementStore.prototype.up = function up()
  {
    _value += 1;
  };

  IncrementStore.prototype.down = function down()
  {
    _value -= 1;
  };

  IncrementStore.prototype.by = function by( offset )
  {
    _value += offset;
  };

  IncrementStore.prototype.reset = function reset()
  {
    try {
      _value = 0;
    } catch(e) {
      return false;
    }

    return true;
  };

  IncrementStore.prototype.valueOf = function valueOf()
  {
    return _value;
  };

  IncrementStore.prototype.toString = function toString()
  {
    return String(_value);
  };

  IncrementStore.prototype.valueOf = function valueOf()
  {
    return _value;
  };

  return new IncrementStore(value);

};
