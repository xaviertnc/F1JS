# F1JS Form - Changelog

## 10 Jul 2022 - Ver 1.0.0
  - Initial version.

## 13 Nov 2022 - DEV - Ver 1.1.0
  - Improve `Calendar` and `Time` custom fields types + Change component ids.
  - Change where `Form` level errors are added by default.

## 18 Nov 2022 - FT - Ver 1.2.0
  - Re-arrange / re-factor `Form` + `FieldTypes` + `ValidatorTypes`!
  - Add better support for multiple validators per field and ValidatorTypes
  - Rename support classes like: Validator -> FieldValidator.
  - Add getValidators() to auto-set required validators.
  - Add optional GreaterThan_Validator validator type.
  - Include `Required` ValidatorType by default.
  - Add clearErrors() to init().
  - Remove `Form.Controllers`

# 24 Nov 2022 - FT - Ver 1.3.0
  - Add `onlyShowGlobalErrors` option.
  - Add `Form.addGlobalError()` method.
  - Add `name` property to `Calendar Field Controller`
  - Remove `Required Validator` from the `Duration Field`. The `NOT Zero` check is enough...?
  - Add new `elm` constructor option to allow using an existing HTMLElement instance reference.
  - Fix bug in `Field.validate()` not returning the correct value when we have multiple validators.
  - Improve `Form.validate()` to also return TRUE / FALSE depending on the overall valid status.
  - Update `Form.showErrors()` to reflect the new GLOBAL ERRORS feature.
  - Add `Form.errors` to allow showing GLOBAL errors not linked to a specific field.

# 26 Nov 2022 - REL - Ver 2.0.0
  - Convert to ES6 module
  - Remove F1 global dependancy
  - Remove prettier.js (not relevant anymore)
  - Fix white space issues.

# 27 Nov 2022 - FIX - Ver 2.0.1
  - Fix ES6 module conversion issues
  - Detach sub-classes from the main class
  - Rename Error to FormError to prevent name clashes
  - Export sub-classes indiviually
  - Move FormError, FieldValidator and ValidatorType `prototype` 
      methods into their constructors as props, just to keep
      code lines down!
  - Convert `form-fieldtypes.js` and `form-validatortypes.js`
      to ES6 modules and remove their dependancy in F1.

# 15 Dec 2022 - DEV - Ver 2.1.0
  - Improve the FieldValidator class. Change from `Array args` to `Object args`!
  - Improve the built-in `Required validation` to accept a 'zeroIsBad' option.
  - Drop the GreaterThan validator in Duration Fields and use the newly
    improved Required validator with `zeroIsBad` instead.
