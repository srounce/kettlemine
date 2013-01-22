(function() {
  var xhr
    , evt_form_submit
    , updateCupCount
    , initCountPolling
    , init
    , serializeForm
    , evt_form_submit
    , evt_form_submit
    , tmpl_formSave
    , browserijade = require('browserijade')
    , libutil = require('../lib/util')

  xhr = function(url, method, data, success, error) 
  {
    successFunc = success || function(){};
    errorFunc = error || function(){};
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function( ev )
    {
      switch( this.readyState ) {
        case 3 :
          errorFunc.call(this);
          break;
        case 4 :
          switch( this.status ) {
            case 200 :
              successFunc.call(this, this.response);
              break;
            default :
              break;
          }
          try {
            document.querySelector('form').attributes.removeNamedItem('disabled');
          } catch(e) { }
          break;
        default :
          break;
      }
    };
    xhr.timeout = 3000;
    xhr.open(method, url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
  };

  evt_form_submit = function( ev )
  {
    var form = ev.target;
    formData = (form.elements.length > 1) ? new FormData(form) : null;

    if( form.attributes.getNamedItem('disabled') ) {
      return;
    }

    ev.preventDefault();

    form.setAttribute('disabled', '');
    xhr(form.action, form.method, formData, evt_formXhr_complete);
  };


  evt_formXhr_complete = function( data )
  {
    var data = typeof this.response === "object" ? this.response : JSON.parse(this.response);
    document.querySelector('form').innerHTML = browserijade('partials/teaform', {
      routePrefix : '/' // < Naughty naughty!
    , util : libutil
    , wantsNotify : data.wantsNotify 
    });

    var statusText = browserijade('partials/statusText', { wantsNotify : data.wantsNotify });
    
    document.querySelector('.statusText').innerHTML = statusText;
    var el_cupCount = document.querySelector('.cupCount');
    updateCupCount(el_cupCount, data.count);
  };

  updateCupCount = function( element, value )
  {
    element.classList.add('countOut');
    setTimeout(function() {
      element.textContent = parseInt(value);
      
      if(parseInt(value) === 0) {
        var statusText = browserijade('partials/statusText', { wantsNotify : false });
        
        document.querySelector('.statusText').innerHTML = statusText;
      }

      element.classList.add('countIn');
      element.classList.remove('countOut');
      
      setTimeout(function() {
        element.classList.remove('countIn');
      }, 200);
    }, 200);
  }

  initCountPolling = function()
  {
    xhr('/arduino/count', 'GET', null, function( data ) {
      
      var el_cupCount = document.querySelector('.cupCount');
      if( parseInt(el_cupCount.textContent, 10) !== parseInt(data, 10) ) {
        updateCupCount(el_cupCount, data);
      }
      setTimeout(initCountPolling, 5000);
    });
  };

  init = function()
  {
    document.querySelector('form').addEventListener('submit', evt_form_submit, false);
    setTimeout(initCountPolling, 5000);
  };

  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', init, false);
  } else {
    window.attachEvent('onload', init);
  }

}())
