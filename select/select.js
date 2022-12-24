/**
 * F1JS - Select Class - 07 Oct 2022
 *  
 * @author  C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 2.2.0 - DEV - 24 Dec 2022
 *
 */

export default class Select {
  constructor(elm, options = {}) {
    this.elSelect = elm;
    this.type = 'Select_Controller';
    this.prefix = elm.dataset.prefix || 'select';
    this.multiple = elm.dataset.multiple === 'true';
    this.name = this.name || elm.name || (+new Date()).toString();
    this.locale = options.locale || { SEARCH: 'Search...', NO_RESULT: '- no result -', PLACEHOLDER_SINGLE: '- Select -', PLACEHOLDER_MULTI: '- Select one or more -' };
    this.placeholder = elm.dataset.placeholder || (this.multiple ? this.locale.PLACEHOLDER_MULTI : this.locale.PLACEHOLDER_SINGLE);
    this.id = `${this.prefix}-${this.name}`;
    this.initialValue = elm.dataset.value;
    this.hasSearch = elm.dataset.search;
    this.disabled = elm.disabled;
  }
  focusOption(curr) {
    this.curr = curr;
    this.printOptions(this.shown);
    const which = this.dom.list.querySelector(`#${this.id}--${curr.key}`);
    if (this.hasSearch) this.dom.search.setAttribute('aria-activedescendant', which.id);
    this.dom.display.setAttribute('aria-activedescendant', which.id);
    const scrollTop = which.offsetTop - this.rem2px(5);
    this.dom.list.scrollTop = scrollTop < 0 ? 0 : scrollTop;
  }
  open() {
    this.isOpen = true;
    this.dom.el.classList.add('open');
    this.dom.display.setAttribute('aria-expanded', true);
    this.curr = this.options.filter((op) => !op.disabled && op.value == this.dom.hidden.value)[0];
    let scrollTop = 0; if (this.curr) {
      const which = this.dom.list.querySelector(`#${this.id}--${this.curr.key}`);
      scrollTop = which ? which.offsetTop - this.rem2px(5) : 0; }
    this.dom.list.scrollTop = scrollTop < 0 ? 0 : scrollTop;
    if (this.hasSearch) { this.dom.search.focus(); this.dom.display.tabIndex = -1; }
  }
  close() {
    this.curr = null;
    this.isOpen = false;
    this.dom.display.tabIndex = 0;
    this.dom.el.classList.remove('open');
    this.dom.display.removeAttribute('aria-activedescendant');
    this.dom.display.setAttribute('aria-expanded', false);
    this.dom.list.querySelectorAll(`.${this.prefix}--option`).forEach(o => o.classList.remove('focus'));    
  }
  toggle() { if (this.isOpen) this.close(); else if (!this.disabled) this.open(); }
  isSelected(key) { return this.options.find(o => o.key == key).selected; }
  selectOption(key) { if (!this.isSelected(key)) this.toggleSelect(key); }
  selectOptions(csvStr) { const vals = csvStr !== undefined ? csvStr.toString().split(',') : [], selected = []; this.options.forEach(o => vals.forEach(v => {
      if (o.value === v) { o.selected = true; selected.push(o) } else o.selected = false; })); return selected; }
  bindEvents() {
    window.addEventListener('mousedown', (e) => { if (!this.dom.el.contains(e.target)) this.close(); });
    document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape': if (this.isOpen) { this.close(); this.dom.display.focus(); } break;
      case 'Tab': if (this.isOpen) this.close(); break;
      case 'PageUp': if (this.isOpen) { e.preventDefault(); this.keyEvent = true;
        this.focusOption(this.shown[0]); } break;
      case 'PageDown': if (this.isOpen) { e.preventDefault(); this.keyEvent = true;
        this.focusOption(this.shown[this.shown.length - 1]); } break;
      case 'ArrowUp': if (this.isOpen) { e.preventDefault(); this.keyEvent = true;
        const currInShownPos = this.shown.indexOf(this.curr); if (currInShownPos > 0)
         this.focusOption(this.shown[currInShownPos - 1]); } break;
      case 'ArrowDown': if (this.isOpen) { e.preventDefault(); this.keyEvent = true;
        const inShownPos = this.shown.indexOf(this.curr);
        if (inShownPos < (this.shown.length - 1)) this.focusOption(this.shown[inShownPos + 1]); } 
        else if (!this.isOpen && this.dom.el.contains(document.activeElement)) {
          e.preventDefault(); this.keyEvent = true; this.open(); } break;
      case 'Enter': e.preventDefault(); if (this.dom.el.contains(document.activeElement)) {
        if (this.isOpen) this.toggleAndClose(this.curr ? this.curr.key : null);
        else { this.keyEvent = true; this.open(); } } break;
    } });
  }
  getOptions() {
    const opts = []; let i = 0;
    this.elSelect.querySelectorAll(':scope > optgroup').forEach(og => {
      og.querySelectorAll(':scope > option').forEach(op => { i++;
        opts.push({ key: i, title: op.title || op.innerText, value: op.value, img: op.dataset.img || '',
          desc: op.dataset.desc || '', group: og.label, selected: op.getAttribute('selected'), 
          disabled: op.disabled }); }); });
    this.elSelect.querySelectorAll(':scope > option').forEach(op => { i++;
      opts.push({ key: i, title: op.title || op.innerText, value: op.value, img: op.dataset.img 
        || '', desc: op.dataset.desc || '', selected: op.getAttribute('selected'), 
        disabled: op.disabled }); }); return opts;
  }
  buildSingleOption(op) {
    const mkElm = this.mkElm, item = mkElm('li'), body = mkElm('div'), title = mkElm('span');
    item.setAttribute('role', 'option');
    item.id = `${this.dom.el.id}--${op.key}`;
    item.classList.add(`${this.prefix}--option`);
    body.classList.add(`${this.prefix}--option__body`);
    title.innerHTML = op.title;
    body.appendChild(title);
    if (op.img) {
      const img = mkElm('img');
      img.src = op.img; img.alt = op.title;
      if (op.desc) img.style.marginTop = '.3rem';
      img.classList.add(`${this.prefix}--option__img`);
      item.insertBefore(img, item.firstChild); }
    if (op.desc) {
      const desc = mkElm('small');
      desc.innerHTML = op.desc;
      title.style.marginTop = '0px';
      body.appendChild(desc); }
    item.appendChild(body);
    if (!op.disabled) {
      item.onclick = () => this.toggleAndClose(op.key);
      item.onmouseenter = () => { if (this.keyEvent) { return this.keyEvent = false; }
        const options = this.dom.list.querySelectorAll(`.${this.prefix}--option`);
        options.forEach(t => t.classList.remove('focus'));
        item.classList.add('focus'); this.curr = op;
        if (op.id && this.hasSearch) this.dom.search.setAttribute('aria-activedescendant', op.id);
        if (op.id) this.dom.display.setAttribute('aria-activedescendant', op.id); }; }
    if (op.selected) { item.classList.add('selected'); item.setAttribute('aria-selected', true); }
    if (op.disabled) { item.setAttribute('aria-disabled', true); item.classList.add('disabled'); }
    if (this.curr && this.curr.value == op.value) { item.classList.add('focus'); }
    return item;
  }
  printOptions(options) {
    this.dom.list.innerHTML = '';
    const groups = [...new Set(options.map((op) => op.group).filter((gr) => !!gr))];
    groups.forEach((gr) => {
      const grItem = this.mkElm('li');
      grItem.classList.add(`${this.prefix}__group`);
      grItem.setAttribute('aria-label', gr);
      grItem.setAttribute('role', 'none');
      grItem.innerHTML = gr;
      this.dom.list.appendChild(grItem);
      options.filter((op) => op.group == gr).forEach((top) => this.dom.list
        .appendChild(this.buildSingleOption(top)));
    });
    options.filter((op) => !op.group).forEach((op) => this.dom.list
      .appendChild(this.buildSingleOption(op)));
  }
  printDisplay(selected) {
    selected = selected || this.options.filter((op) => op.selected);
    if (selected.length) this.dom.display.innerHTML = '<span>' + selected.map((op) => op.title).join('</span>,<span>') + '</span>';
    else this.dom.display.innerHTML = `<span class="${this.prefix}__placeholder">${this.placeholder}</span>`;
  }
  toggleAndClose(key) {
    if (key) this.toggleSelect(key);
    if (!this.multiple) { this.close(); setTimeout(()=>this.dom.display.focus()); }
  }
  toggleSelect(key) {
    const dest = this.dom.search ? this.dom.search : this.dom.display;
    if (this.multiple) dest.focus();
    this.options.forEach((op) => {
      if (!this.multiple && op.key != key) op.selected = false;
      if (op.key == key && !op.disabled) op.selected = this.multiple ? !op.selected : true;
    });
    this.setValue();
    if (this.multiple) this.printOptions(this.shown);
    else { this.dom.search.value = ''; this.doSearch(''); }
  }
  doSearch(key) {
    this.curr = null;
    key = key.toLowerCase().trim();
    this.shown = this.options.filter((op) => (op.group && op.group.toLowerCase().includes(key))
     || op.title.toLowerCase().includes(key)
     || op.value.toLowerCase().includes(key)
     || op.desc.toLowerCase().includes(key));
    if (!this.shown.length) {
      const item = this.mkElm('li');
      item.classList.add(`${this.prefix}__noresult`);
      item.setAttribute('aria-live', 'polite');
      item.innerHTML = this.locale.NO_RESULT;
      this.dom.list.innerHTML = '';
      this.dom.list.appendChild(item);
    } else this.printOptions(this.shown);
  }
  setValue(csvStr) { // console.log('setValue(), csvStr:', csvStr, this);
    const oldValue = this.dom.hidden.value, selected = csvStr !== undefined ? this.selectOptions(csvStr) : this.options.filter(op => op.selected),
    newValue = this.dom.hidden.value = selected.map(op => op.value).join(','); this.printDisplay(selected); this.printOptions(this.options);
    if ( newValue !== oldValue ) return this.onchange({ oldValue, newValue, selected });
  }
  init() {
    this.fontSize = window.DOC_FONTSIZE || (window.DOC_FONTSIZE = this.getFontSize());
    const mkElm = this.mkElm, el = mkElm('div'), hidden = mkElm('input'), display = mkElm('button'), 
    menu = mkElm('div'), search = mkElm('input'), list = mkElm('ul');
    this.dom = { el, hidden, display, menu, search, list };   
    if (this.hasSearch) menu.appendChild(search);
    menu.appendChild(list);
    el.id = this.id;
    el.appendChild(hidden);
    el.appendChild(display);
    el.appendChild(menu);    
    el.classList.add(`${this.prefix}`);
    if (el.offsetTop >= 0.5 * window.innerHeight) el.classList.add('reverse');
    this.elSelect.MODEL = hidden.MODEL = this;
    hidden.tabIndex = -1;
    hidden.readOnly = true;
    hidden.name = this.name;
    hidden.disabled = this.disabled;
    hidden.setAttribute('aria-hidden', true);
    hidden.classList.add(`${this.prefix}__hidden`);
    display.type = 'button';
    display.setAttribute('role', 'combobox');
    display.setAttribute('aria-multiselectable', this.multiple);
    display.setAttribute('aria-label', this.name);
    display.setAttribute('aria-disabled', this.disabled);
    display.setAttribute('aria-expanded', this.isOpen);
    display.setAttribute('aria-owns', `${el.id}_list`);
    display.classList.add(`${this.prefix}__display`);
    display.onclick = () => this.toggle();
    menu.id = `${el.id}_menu`;
    menu.classList.add(`${this.prefix}__menu`);
    if (this.hasSearch) {
      search.classList.add(`${this.prefix}__search`);
      search.setAttribute('role', 'searchbox');
      search.setAttribute('aria-label', this.locale.SEARCH);
      search.setAttribute('aria-autocomplete', 'list');
      search.setAttribute('aria-controls', `${el.id}_list`);
      search.autocapitalize = 'none';
      search.autocomplete = 'off';
      search.spellcheck = 'off';
      search.placeholder = this.locale.SEARCH;
      search.type = 'search';
      search.oninput = () => this.doSearch(search.value);
    }
    list.id = `${el.id}_list`;
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', this.name);
    list.setAttribute('aria-expanded', this.isOpen);
    list.classList.add(`${this.prefix}__list`);
    this.shown = this.options = this.getOptions();
    this.setValue(this.initialValue);
    this.elSelect.style.display = 'none'; this.elSelect.name = '_' + this.elSelect.name;
    this.elSelect.parentElement.insertBefore(el, this.elSelect);
    this.bindEvents();
  }
  onchange(detail) { return this.elSelect.dispatchEvent(new CustomEvent('change', { detail })); }
  getFontSize() { return parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size')); }
  rem2px(rem) { return rem * this.fontSize; }
  mkElm(tag) { return document.createElement(tag); }
}