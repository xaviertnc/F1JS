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
