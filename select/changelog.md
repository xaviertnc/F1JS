# F1JS Select - Changelog

## 07 Oct 2022 - Ver 1.0.0
 - Initial version.

## 18 Nov 2022 - FIX - Ver 1.0.1
 - selectOptions: Force `csvStr` to string to prevent: `scvStr.split` is NOT a function!

## 24 Nov 2022 - UPD - Ver 1.0.2
 - Comment out `console.log` line.

## 26 Nov 2022 - REL - Ver 2.0.0
 - Convert to ES6 module
 - Remove F1 global dependancy
 - Remove select.md ( just junk at this stage... )
 - Fix white space issues

## 20 Dec 2022 - FT - Ver 2.1.0
 - Add contructor options. e.g. options.locale
 - Add `onchange` event support on the original HTML select.
 - Remove option to set `locale` via data attributes.
 - Remove `required` global variables!
 - Change `old` to `elSelect`.
 - Add getFontSize() method.
 - Update README.md

## 24 Dec 2022 - DEV - Ver 2.2.0
 - Set `Select` as ES6 default export

## 29 Dec 2022 - FT - Ver 3.0.0
 - Rename DOC_FONTSIZE to S_FONTSIZE
 - Rename `elSelect.MODEL` to `elSelect.S_CONTROL`
 - Add support for `onchange="F1.onSelectChanged(event)"` style event handler definition!

## 10 Jan 2023 - FIX - Ver 3.0.1
 - Fix issue with a global `keypress` event handler blocking ENTER on non-related form elements and menu toggles.


