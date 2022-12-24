/**
 * F1JS Form Class - 10 Jul 2022
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 2.2.0 - DEV - 24 Dec 2022
 * 
 */

function extend( obj, props ) { 
  for ( let key in props || {} ) { obj[ key ] = props[ key ]; } }


function clearErrors( frmObj, errorsSelector ) {
  frmObj.errors = [];
  frmObj.elm.classList.remove( frmObj.unhappyClass );
  errorsSelector = errorsSelector || '.' + frmObj.errorsClass.replace( ' ', '.' );
  frmObj.elm.querySelectorAll( errorsSelector ).forEach(
    elMsgs => elMsgs.parentElement.removeChild( elMsgs ) );
}


export const FormError = function( field, message )
{
  this.field = field;
  this.message = message;
  this.focus = function() { this.field.focus(); };
}


export const FieldValidator = function( validatorType, field, args )
{
  this.type = validatorType.name;
  this.model = validatorType;
  this.field = field; this.args = args || {};
  this.validate = function( options ) { 
    const valid = this.model.test( this.field, this.args, options );
    if ( ! valid ) this.field.errors.push( new FormError( this.field,
      this.model.getInvalidMessage( this.field, this.args, options ) ) );
    return valid;
  };
};


export const ValidatorType = function( name, test, getInvalidMessage )
{
  this.name = name; 
  this.test = test; // valid = test( field, args ); 
  this.getInvalidMessage = getInvalidMessage || function( field, args ) { 
    return field.getLabel() + ' is invalid'; };
};


export const FieldType = function( id, options )
{
  this.type = id;
  extend( this, options );
};


FieldType.prototype = {

  getInputs: function() { const field = this;
    const elements = this.elm.querySelectorAll( this.inputSelector );
    elements.forEach( elm => field.inputs.push( elm ) );
  },

  getLabel: function() { let label = this.elm.getAttribute( 'aria-label' );
    if ( ! label ) { const elLbl = this.elm.querySelector( 'label' );
      if ( elLbl ) { label = elLbl.innerHTML; } else label = this.getName(); }
    return label || 'Field';
  },

  getName: function() { return this.elm.dataset.name || this.elm.id || this.input.name; },
  getValue: function() { const val = this.input.type === 'checkbox'
    ? ( this.input.checked ? this.input.value : '' ) : this.input.value;
    return val;
  },
  setValue: function( val ) { this.input.type === 'checkbox' ? this.input.checked = ( 
    this.input.value === val ) : this.input.value = val || ''; },
  getRequired: function() { return this.elm.classList.contains( 'required' ); },
  getValidators: function() { this.validators.push( 
    new FieldValidator( this.form.validatorTypes.Required, this ) ); },
  clearErrors: function() { clearErrors( this ) },
  clear: function() { this.setValue( '' ); },
  reset: function() { this.setValue( this.initialValue || '' ); },
  focus: function() { this.input ? this.input.focus() : null; },

  showErrors: function() {
    if ( !this.errors.length ) return;
    this.elm.classList.add( this.unhappyClass );
    if ( this.form.onlyShowSummary || this.form.onlyShowGlobalErrors ) return;
    const elMsgs = document.createElement( 'div' );
    elMsgs.innerHTML = this.errors.map( e => '<div class="error">'+e.message+'</div>' ).join('');
    elMsgs.className = this.errorsClass;
    this.elm.appendChild( elMsgs );
  },

  validate: function( options ) { let valid = true;
    this.validators.forEach( validator => { 
      if ( ! validator.validate( options ) ) valid = false; });
    return valid;
  },

  inputSelector: 'input,textarea,select'

};


export const Field = function( form, elm )
{
  this.elm = elm;
  this.type = '';
  this.form = form;
  this.inputs = [];
  this.errors = [];
  this.validators = [];
  this.controller = {};
  this.initialValue = '';
  this.inputSelector = 'input';
  this.errorsClass = form.errorsClass;
  this.unhappyClass = form.unhappyClass;
  const fieldTypeId = elm.getAttribute( 'data-type' );
  const fieldType = form.fieldTypes[ fieldTypeId ];
  extend( this, fieldType || new FieldType( 'Text' ) );
  if (this.beforeInit) this.beforeInit();
  this.getInputs(); this.input = this.inputs[0]; this.getValidators();
  if (this.afterInit) this.afterInit();
};


const Form = function( options, fieldTypes, validatorTypes )
{
  const vtRequired = new ValidatorType( 'Required_Validator',
    function( field, args /*, options */ ) {
      if ( ! field.getRequired() ) return true;
      const fieldValue = field.getValue();
      if ( args && args.zeroIsBad && fieldValue == 0 ) return false;
      return fieldValue !== ''; },
    function( field ) { return field.getLabel() + ' is required.'; } );
  const defaults = {
    selector: 'form',
    fieldSelector: '.field',
    summaryClass: 'summary',
    unhappyClass: 'unhappy',
    errorsClass: 'errors',
    validatorTypes: { Required: vtRequired },
    fieldTypes: {},
    errors: [],
    fields: []
  };
  extend( this, defaults );
  extend( this, options );
  if ( fieldTypes ) extend( this.fieldTypes, fieldTypes );
  if ( validatorTypes ) extend( this.validatorTypes, validatorTypes );
  this.elm = options.elm || document.querySelector( this.selector );
  this.getFields();
  this.init( this.initialValues );
};

Form.prototype = {

  addField: function( elm ) {
    this.fields.push( new Field( this, elm ) ); },

  addGlobalError: function( errorMessage ) {
    this.errors.push( new FormError( this, errorMessage ) ); },

  getFields: function() {
    const elements = this.elm.querySelectorAll( this.fieldSelector );
    elements.forEach( elm => this.addField( elm ) ); },

  getErrors: function() {
    const errors = [];
    this.fields.forEach( field => { if ( field.errors[0] ) 
      errors.push( field.errors[0] ); } );
    return errors;
  },

  showErrors: function() {
    const fieldErrors = [];
    this.elm.classList.add( this.unhappyClass );
    const showFieldErrorText = ! this.onlyShowGlobalErrors;
    this.fields.forEach( field => { field.showErrors(); 
      if ( showFieldErrorText && field.errors[0] ) fieldErrors.push( field.errors[0] ); } );
    const elMsgs = document.createElement( 'div' );
    const allErrors = [].concat( fieldErrors, this.errors );
    elMsgs.className = this.errorsClass + ' ' + this.summaryClass;
    elMsgs.innerHTML = allErrors.map( e => '<div class="error">'+e.message+'</div>' ).join('');
    this.elm.insertBefore( elMsgs, this.elm.firstElementChild );
    return fieldErrors;
  },

  clearErrors: function() { clearErrors( this, '.' + this.summaryClass );
    this.fields.forEach( field => field.clearErrors() ); },

  validate: function( options ) { let valid = true; this.clearErrors();
    this.fields.forEach( field => { if ( ! field.validate( options ) ) valid = false; } );
    return valid;
  },

  focus: function() { this.fields[0].focus(); },
  clear: function() { this.clearErrors(); this.fields.forEach( field => field.clear() ); },
  reset: function() { this.clearErrors(); this.fields.forEach( field => field.reset() ); },

  init: function( initialValues, nameSpace ) {
    console.log('Form:init(), initialValues =',initialValues, ', nameSpace =', nameSpace);
    this.clearErrors();
    this.fields.forEach( f => { const fname = f.getName(), fid = nameSpace
      ? fname.replace( `${nameSpace}[`, '' ).replace( ']', '' ) : fname;
      // console.log('Form:init() fname =', fname, ', fid =', fid);
      f.initialValue = initialValues ? initialValues[ fid ] || '' : f.getValue();
      if ( initialValues ) f.setValue( f.initialValue ); } );
  },  

};

export default Form;