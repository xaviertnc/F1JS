/**
 * F1JS Form Validator Types - 10 Jul 2022
 * 
 * Import this file before initializing a F1JS Form.
 * Include `customValidatorTypes` as a F1JS Form contructor param.
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.2.0 - DEV - 24 Dec 2022
 *   - Set export default
 */

import { ValidatorType } from './form.js';



/* ValidatorType:: function( name, test, getInvalidMessage ) */

export const GreaterThan_Validator = new ValidatorType(
  'GreaterThan_Validator',
  function( field, args ) { return field.getValue() > args.value; },
  function( field, args ) { return field.getLabel() + ' must be greater than ' + args.value + '.'; }
);


const customValidatorTypes = {
  GreaterThan: GreaterThan_Validator,
};

export default customValidatorTypes;
