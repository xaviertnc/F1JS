# F1JS Form - User Manual

## Setup

### Define FieldTypes
```
import { FieldType, FieldValidator } from './form.js';
import DateTime from './datetime.js';
import Select from './select.js';

let nextCID = 1;

const DT = new DateTime();

export const Select_FieldType = new FieldType( 'Select_Field', {
  inputSelector: '.select__hidden',
  getName: function() { return this.input.name; },
  setValue: function(v) { this.input.MODEL.setValue(v); },
  focus: function() { const elDisplay = this.input.MODEL.dom.display;
    setTimeout( function() { elDisplay.focus(); } ); },
  beforeInit: function() { const elSelect = this.elm.querySelector('select'),
    ctrl = new Select( elSelect ); ctrl.init(), this.controller = ctrl; },
  afterInit: function() { this.controller.name = 'selectCtrl_' + ( this.input.name || nextCID++ ); },
} );

...

export const Duration_FieldType = new FieldType( 'Duration_Field', {
  inputSelector: 'input',
  setValue: function(v) {
    console.log('Duration_FieldType::setValue(), value =', v, this );
    this.input.value = v; this.setDispValue(v); },
  formatValue: function(min) { return (min >= 60 ? Math.floor(min/60)+'h'+(min%60||'00') : min)+'min'; },
  setDispValue: function(v) { this.input.nextElementSibling.innerText = this.formatValue(v); },
  afterInit: function() { this.input.addEventListener('input', this.onChange.bind(this)); },
  getValidators: function() { const gtVal = 0; if ( this.getRequired() ) this.validators.push(
    new FieldValidator( this.form.validatorTypes.GreaterThan, this, [gtVal] ) ); },
  onChange: function(ev) { this.setDispValue(ev.target.value); },
} );

...

const customFieldTypes = {
  Select:   Select_FieldType,
  FullName: FullName_FieldType,
  Calendar: Calendar_FieldType,
  Duration: Duration_FieldType,
  Time:     Time_FieldType
};

export default customFieldTypes;    
```

### Define Validator Types
```
import { ValidatorType } from './form.js';

export const GreaterThan_Validator = new ValidatorType(
  'GreaterThan_Validator',
  function( field, args ) { return field.getValue() > args[0]; },
  function( field, args ) { return field.getLabel() + ' must be greater than ' + args[0] + '.'; }
);

const customValidatorTypes = {
  GreaterThan: GreaterThan_Validator,
};

export default customValidatorTypes;
```

## Create
```
import Form from './js/vendors/f1js/form.js';

import customValidatorTypes from './js/vendors/f1js/f1-validatortypes.js';
import customFieldTypes from './js/vendors/f1js/f1-fieldtypes.js';

const options = { showSummary: true, selector: '#booking-edit-modal form' };
const bookingForm = new Form( options, customFieldTypes, customValidatorTypes );
```
#### Create Options
 - {HTMLElement} elm
 - {String} selector
 - {Function} mountSummary,
 - {Boolean} showSummary,
 - {Object} initialValues


## Reset
```
bookingForm.init( {Object} newInitialValues ); 
```

## Submit
```
F1.onSubmitBooking = function( event ) {
  event.preventDefault();
  if ( ! bookingFormCtrl.validate() )
  {
    bookingFormCtrl.addFormError( 'Some field values are invalid.' );
    const fieldErrors = bookingFormCtrl.showErrors()
    log( 'onSubmitBooking, fieldErrors:', fieldErrors );
    return fieldErrors.pop().focus();
    // return fieldErrors[0].focus();
  } 
  saveBooking( elBookingEditModal.ENTITY );
};
```

## Show Field Errors
NB: Don't set `showSummary` = `true` if you want to display field errors on each field instead of in a form summary.
```
  const fieldErrors = bookingFormCtrl.showErrors();
```

## Show Form Errors Summary
```
  const formErrors = [ 'Summary Message #1', 'Another Message', ... ];
  const mountSummary = function( formCtrl, elSummary ) { ... elParent.append( elSummary ) };
  const renderSummary = function( formCtrl, allErrors, formErrors, fieldErrors ) { ... return HTML };
  const showErrorOptions = { showSummary: true, formErrors, mountSummary, renderSummary };

  const fieldErrors = bookingFormCtrl.showErrors( showErrorOptions );

```
-- OR --
```

const mountErrorSummary = function( formCtrl, elSummary ) { ... };
const renderErrorSummary = function( formCtrl, allErrors, formErrors, fieldErrors ) { ... };
const formOptions = { showSummary: true, mountErrorSummary, renderErrorSummary, selector: '#booking-edit-modal form' };
const bookingForm = new Form( formOptions, customFieldTypes, customValidatorTypes );

...

bookingForm.addFormError( 'Form Summary Message #1' );
bookingForm.addFormError( 'Form Summary Message #2' );

...

const fieldErrors = bookingFormCtrl.showErrors();
```