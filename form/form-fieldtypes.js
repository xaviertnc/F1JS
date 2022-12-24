/* globals VanillaCalendar */

/**
 * F1JS Form Custom Field Types - 10 Jul 2022
 * 
 * Import this file before initializing a F1JS Form. See README file.
 * Include `customFieldTypes` as a F1JS Form contructor param.
 * 
 * PS: VanillaCalendar is an 3rd party lib and not ES6 module friendly.
 * Hence the GLOBAL status :|
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.2.0 - DEV - 24 Dec 2022
 *   - Set export default
 */


/* Import required F1JS plugins */

import { FieldType, FieldValidator } from './form.js';
import DateTime from '../datetime/datetime.js';
import Select from '../select/select.js';


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


export const FullName_FieldType = new FieldType( 'FullName_Field', {
  inputSelector: 'input',
  getName: function() { return this.elm.id || 'fullname'; },
  getValue: function() { let val = this.inputs[0].value; if ( val === '' ) return val;
    if ( this.inputs[1].value ) val = val + ' ' + this.inputs[1].value;
    return val; },
  setValue: function( val ) { if ( ! val ) { this.inputs[0].value = ''; 
    this.inputs[1].value = ''; return; } const parts = val.split( ' ' );
    if ( parts[0] ) { this.inputs[0].value = parts.shift(); }
    this.inputs[1].value = parts.join( ' ' ); }
} )


export const Calendar_FieldType = new FieldType( 'Calendar_Field', {
  inputSelector: 'input',
  parseDispValue: function( dispValue ) { return DT.formatYmd( DT.parseLong( dispValue ) ); },
  printDispValue: function(v) { return DT.formatLong( DT.parseYmd(v) ); },
  getValue: function() {
    // console.log('Calendar::getValue(), input.val =', this.input.value );
    return this.input.value.length > 1 ? this.parseDispValue( this.input.value ) : ''; },
  setValue: function(v) {
    // console.log('Calendar::setValue(), v =', v );
    this.hidden_input.value = v;
    this.input.value = v ? this.printDispValue(v) : '';
    const sel = this.controller.settings.selected; sel.dates = v ? [v] : []; 
    sel.month = v ? parseInt( v.split('-')[1] ) - 1 : null;
    this.controller.update(); },
  onChange: function() {
    // console.log('Calendar::onChange(), input.val =', this.input.value);
    this.setValue(this.getValue());
  },
  onClickDay: function(e) {
    const v = e.target.dataset.calendarDay;
    // console.log('Calendar::onClickDay(), e.target.dataset.calendarDay =', v );
    this.hidden_input.value = v; this.input.value = this.printDispValue(v); this.focus(); },
  beforeInit: function() { const ctrl = new VanillaCalendar( this.elm.dataset.control );
    ctrl._type = 'Calendar_Controller'; ctrl.actions.clickDay = this.onClickDay.bind(this);
    this.controller = ctrl; },
  afterInit: function() {
    this.input.addEventListener('change', this.onChange.bind(this));
    const elInput = document.createElement('input');
    elInput.type = 'hidden'; elInput.name = this.input.name; this.input.name =  '_' + this.input.name;
    this.hidden_input = elInput; this.elm.appendChild(elInput);
    // console.log('Calendar::afterInit(), input.val =', this.input.value );
    if ( this.input.value ) this.setValue( this.input.value );
    // console.log('Calendar::afterInit(), input.val.after =', this.input.value );
    this.controller.name = 'calCtrl_' + ( elInput.name || nextCID++ ); 
    this.controller.click(); 
  },
} );

export const Time_FieldType = new FieldType( 'Time_Field', {
  inputSelector: 'select',
  getValue: function() { 
    console.log('Time_FieldType::getValue()', this );
    const hour = this.inputs[0].value; if ( hour === '' ) return '';
    const min = this.inputs[1].value; if ( min === '' ) return '';
    return hour + ':' + min; },
  setValue: function(v) { 
    console.log('Time_FieldType::setValue(), value =', v, this );
    if ( ! v ) { this.inputs[0].value = ''; 
    this.inputs[1].value = ''; return; } const parts = v.split( ':' );
    if ( parts[0] ) { this.inputs[0].value = ( parts[0].length < 2 ? '0' : '' ) + parts[0]; }
    if ( parts[1] ) { this.inputs[1].value = ( parts[1].length < 2 ? '0' : '' ) + parts[1]; } }   
} );

export const Duration_FieldType = new FieldType( 'Duration_Field', {
  inputSelector: 'input',
  setValue: function(v) {
    console.log('Duration_FieldType::setValue(), value =', v, this );
    this.input.value = v; this.setDispValue(v); },
  formatValue: function(min) { return (min >= 60 ? Math.floor(min/60)+'h'+(min%60||'00') : min)+'min'; },
  setDispValue: function(v) { this.input.nextElementSibling.innerText = this.formatValue(v); },
  afterInit: function() { this.input.addEventListener('input', this.onChange.bind(this)); },
  getValidators: function() { this.validators.push( new FieldValidator( 
    this.form.validatorTypes.Required, this, { zeroIsBad: 1 } ) ); }, 
  onChange: function(ev) { this.setDispValue(ev.target.value); },
} );


const customFieldTypes = {
  Select:   Select_FieldType,
  FullName: FullName_FieldType,
  Calendar: Calendar_FieldType,
  Duration: Duration_FieldType,
  Time:     Time_FieldType
};

export default customFieldTypes;