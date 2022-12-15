/**
 * F1JS Form Validator Types - 10 Jul 2022
 * 
 * Import this file before initializing a F1JS Form.
 * Include `customValidatorTypes` as a F1JS Form contructor param.
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.1.0 - DEV - 15 Dec 2022
 *   - Change the `args` param from an Array to an Object.
 */

import { ValidatorType } from './form.js';



/* ValidatorType:: function( name, test, getInvalidMessage ) */

const GreaterThan_Validator = new ValidatorType(
  'GreaterThan_Validator',
  function( field, args ) { return field.getValue() > args.value; },
  function( field, args ) { return field.getLabel() + ' must be greater than ' + args.value + '.'; }
);


export const customValidatorTypes = {
  GreaterThan: GreaterThan_Validator,
};