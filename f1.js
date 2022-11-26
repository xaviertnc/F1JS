/**
 * F1JS - F1 - 26 Nov 2022
 * 
 * Include this file inside the <head> tag of your HTML docs.

 * Register the F1 system as early as possible, before any
 * scripts that might depend on it.
 *  
 * @author  C. Moller <xavier.tnc@gmail.com>
 * 
 */

window.F1 = { DEBUG: 0, deferred [], locale: {} };


document.addEventListener( 'DOMContentLoaded', () => {
  F1.deferred.forEach( fn => fn() ); 
  if ( F1.DEBUG ) console.log( 'F1', F1 );
} );