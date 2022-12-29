/**
 * F1JS - F1 Global Object - 26 Nov 2022
 * 
 * Include this file inside the <head> tag of your HTML docs.

 * Register the F1 system as early as possible, before any
 * scripts that might depend on it.
 *  
 * @author  C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 2.0.0 - 29 Dec 2022
 *   - Rename from `f1.js` to `f1-global.js`
 * 
 */

window.F1 = { DEBUG: 0, deferred: [], data: {}, components: {}, controllers: {}, locale: {} };