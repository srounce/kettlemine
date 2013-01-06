(function() {
  var evt_form_submit
    , init
    , serializeForm
    , evt_form_submit
    , evt_formXhr_stateChange
    , evt_form_submit
    , tmpl_formSave
    , browserijade = require('browserijade');

  evt_form_submit = function( ev )
  {
    var form = ev.target;

    if( form.attributes.getNamedItem('disabled') ) {
      return;
    }

    ev.preventDefault();

    form.setAttribute('disabled', true);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = evt_formXhr_stateChange;
    xhr.timeout = 10000;
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    try {
      xhr.responseType = "json";
    } catch(e) {}
    xhr.send();
  };

  evt_formXhr_stateChange = function( ev )
  {
    switch( this.readyState ) {
      case 4 :
        switch( this.status ) {
          case 200 :
            evt_formXhr_complete.apply(this);
            break;
          default :
            break;
        }
        document.querySelector('form').attributes.removeNamedItem('disabled');
        break;
      default :
        break;
    }
  };

  evt_formXhr_complete = function( )
  {
    var data = typeof this.response === "object" ? this.response : JSON.parse(this.response);
    var statusText = browserijade('partials/statusText', { wantsTea : data.wantsTea });
    var el_cupCount = document.querySelector('.cupCount');
    
    document.querySelector('.statusText').innerHTML = statusText;
    el_cupCount.classList.add('countOut');
    setTimeout(function() {
      el_cupCount.textContent = data.count;
      el_cupCount.classList.add('countIn');
      el_cupCount.classList.remove('countOut');
      
      setTimeout(function() {
        el_cupCount.classList.remove('countIn');
      }, 200);
    }, 200);
  };

  init = function()
  {
    document.querySelector('form').addEventListener('submit', evt_form_submit, false);
  };

  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', init, false);
  } else {
    window.attachEvent('onload', init);
  }

}())
