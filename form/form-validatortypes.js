/* globals F1 */


( function( window, document, Form ) {


  // Form.ValidatorType = function( name, test, getInvalidMessage )

  const GreaterThan_Validator = new Form.ValidatorType(
  	'GreaterThan_Validator',
	  function( field, args ) { return field.getValue() > args[0]; },
	  function( field, args ) { return field.getLabel() + ' must be greater than ' + args[0] + '.'; }
  );
  

  Form.ValidatorTypes.GreaterThan = GreaterThan_Validator;


}( window, document, F1.Form ) );