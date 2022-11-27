/* Import required F1 plugins */

import { ValidatorType } from './form.js';



/* ValidatorType:: function( name, test, getInvalidMessage ) */

const GreaterThan_Validator = new ValidatorType(
  'GreaterThan_Validator',
  function( field, args ) { return field.getValue() > args[0]; },
  function( field, args ) { return field.getLabel() + ' must be greater than ' + args[0] + '.'; }
);


export const customValidatorTypes = {
  GreaterThan: GreaterThan_Validator,
};