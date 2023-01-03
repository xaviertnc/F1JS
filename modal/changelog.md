# F1JS Modal - Changelog

## 15 July 2022 - Ver 1.0.0
 - Initial version. Adapted from the original OneFile JS

## 01 Oct 2022 - Ver 1.1.0
 - Change class names...
  * .modal-inner becomes .modal
  * .modal becomes .modal-base

## 25 Nov 2022 - Ver 2.0.0
 - TOTALLY refactor Modal JS from Static Object to Class Type Service.
 - Change content, reset, clear & focus option names + Add `draggable`
 - Add this.elm.ENTITY + this.elm.MODAL

## 25 Nov 2022 - FIX - Ver 2.0.1
 - Move ENTITY prop from `elm` to `this` 

## 26 Nov 2022 - REL - Ver 3.0.0
 - Convert to ES6 module
 - Remove F1 global dependancy
 - Fix white space issues

## 24 Dec 2022 - DEV - Ver 3.1.0
 - Convert to ES6 Class
 - Set `Modal` as ES6 default export

## 29 Dec 2022 - DEV - Ver 4.0.0
 - Rename `elModal.MODAL` to `elModal.CONTROL`
 - Add afterInit() event handler option.
 - Update README.md

## 03 Jan 2023 - FT - Ver 4.1.0
 - Add support for setting the modal `Header`, `Title` and `Footer` in
   the `constructor` or `onShow`.  