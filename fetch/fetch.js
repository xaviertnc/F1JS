/* globals F1 */

/**
 * F1 Fetch JS - 01 Oct 2022
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.0.0 - 01 Oct 2022
 * 
 */

 F1.fetch = function(url, onsuccess, onfail) {

  var self = this;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.setRequestHeader('X-REQUESTED-WITH', 'AJAX');
  xhr.onload = function() {
    var xhr = this;
    if (xhr.status === 200) {
      // console.log('Fetch result:', xhr);
      if ( onsuccess ) onsuccess( xhr );
    } else { 
      console.error('Fetch error:', xhr);
      if ( onfail ) onfail( xhr );
    }
    console.log( "Fetch done." );
  };

  xhr.onerror = function() {
    var xhr = this;
    console.error('Fetch error:', xhr);
    if ( onfail ) onfail( xhr );
  };

  xhr.send();

};

// end: F1.fetch
