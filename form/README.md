# F1JS Form - User Manual

## Setup

    import { ValidatorType } from './form.js';

    const GreaterThan_Validator = new ValidatorType(
      'GreaterThan_Validator',
      function( field, args ) { return field.getValue() > args[0]; },
      function( field, args ) { return field.getLabel() + ' must be greater than ' + args[0] + '.'; }
    );

    export const customValidatorTypes = {
      GreaterThan: GreaterThan_Validator,
    };


## Init

    options = {
      elm,
      selector,
      onlyShowSummary,
      onlyShowGlobalErrors,
    }

    const bookingForm = new Form({
      onlyShowSummary: true,
      selector: '#booking-edit-modal form'
    });


## Submit

    F1.onSubmitBooking = function( event ) {
      event.preventDefault();
      if ( ! bookingFormCtrl.validate() )
      {
        bookingFormCtrl.addGlobalError( 'Some field values are invalid.' );
        const fieldErrors = bookingFormCtrl.showErrors()
        log( 'onSubmitBooking, fieldErrors:', fieldErrors );
        return fieldErrors.pop().focus();
        // return fieldErrors[0].focus();
      } 
      saveBooking( elBookingEditModal.ENTITY );
    };