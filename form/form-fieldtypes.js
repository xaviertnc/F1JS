/* globals F1, VanillaSelect, VanillaCalendar */


if ( ! F1.controllers ) { F1.controllers = []; }


( function( window, document, controllers, Form, DT ) {


  const Select_FieldType = new Form.FieldType( 'Select_Field', {
    inputSelector: '.select__hidden',
    getName: function() { return this.input.name; },
    setValue: function(v) { this.input.MODEL.setValue(v); },
    focus: function() { const elDisplay = this.input.MODEL.dom.display;
      setTimeout( function() { elDisplay.focus(); } ); },
    beforeInit: function() { const elSelect = this.elm.querySelector('select'),
      ctrl = new VanillaSelect( elSelect ); ctrl.init();
      controllers.push(this.controller = ctrl); },      
  } );


  const FullName_FieldType = new Form.FieldType( 'FullName_Field', {
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


  const Calendar_FieldType = new Form.FieldType( 'Calendar_Field', {
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
      controllers.push(this.controller = ctrl); },
    afterInit: function() {
      this.input.addEventListener('change', this.onChange.bind(this));
      const elInput = document.createElement('input');
      elInput.type = 'hidden'; elInput.name = this.input.name; this.input.name =  '_' + this.input.name;
      this.hidden_input = elInput; this.elm.appendChild(elInput);
      // console.log('Calendar::afterInit(), input.val =', this.input.value );
      if (this.input.value) this.setValue( this.input.value );
      // console.log('Calendar::afterInit(), input.val.after =', this.input.value );
      this.controller.name = elInput.name;
      this.controller.click(); 
    },
  } );


  const Duration_FieldType = new Form.FieldType( 'Duration_Field', {
    inputSelector: 'input',
    setValue: function(v) {
      console.log('Duration_FieldType::setValue(), value =', v, this );
      this.input.value = v; this.setDispValue(v); },
    formatValue: function(min) { return (min >= 60 ? Math.floor(min/60)+'h'+(min%60||'00') : min)+'min'; },
    setDispValue: function(v) { this.input.nextElementSibling.innerText = this.formatValue(v); },
    afterInit: function() { this.input.addEventListener('input', this.onChange.bind(this)); },
    getValidators: function() { if ( this.getRequired() ) this.validators.push(
      new Form.FieldValidator( Form.ValidatorTypes.GreaterThan, this, [0] ) ); },   
    onChange: function(ev) { this.setDispValue(ev.target.value); },
  } );


  const Time_FieldType = new Form.FieldType( 'Time_Field', {
    inputSelector: 'select',
    getValue: function() { let val = this.inputs[0].value; if ( val === '' ) return val;
      if (this.inputs[1].value) val = val + ':' + this.inputs[1].value; return val; },
    setValue: function(v) { 
      console.log('Time_FieldType::setValue(), value =', v, this );
      if ( ! v ) { this.inputs[0].value = ''; 
      this.inputs[1].value = ''; return; } const parts = v.split( ':' );
      if ( parts[0] ) { this.inputs[0].value = ( parts[0].length < 2 ? '0' : '' ) + parts[0]; }
      if ( parts[1] ) { this.inputs[1].value = ( parts[1].length < 2 ? '0' : '' ) + parts[1]; } }   
  } );


  // Export types...
  Form.FieldTypes.Select   = Select_FieldType;
  Form.FieldTypes.FullName = FullName_FieldType;
  Form.FieldTypes.Calendar = Calendar_FieldType;
  Form.FieldTypes.Duration = Duration_FieldType;
  Form.FieldTypes.Time     = Time_FieldType;


}( window, document, F1.controllers, F1.Form, F1.DateTime ) );