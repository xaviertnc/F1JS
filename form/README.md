# F1JS Form - User Manual

## Setup

	const GreaterThan_Validator = new F1.Form.ValidatorType(
		'GreaterThan_Validator',
	  function( field, args ) { return field.getValue() > args[0]; },
	  function( field, args ) { return field.getLabel() + ' must be greater than ' + args[0] + '.'; }
	);

	F1.Form.ValidatorTypes.GreaterThan = GreaterThan_Validator;


## Init

	const bookingForm = new F1.Form({
	  onlyShowSummary: true,
	  selector: '#booking-edit-modal form'
	});
