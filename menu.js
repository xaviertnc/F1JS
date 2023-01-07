/**
 * F1JS Menu Class - 07 Jan 2023
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.0.0 - INIT - 07 Jan 2023
 * 
 */

export default class Menu {
  
  constructor( options = {} ) {
    console.log( 'Menu Controller Says Hi! opts:', options );
    this.type = 'Menu_Controller';
    this.selector = options.selector || '.menu';
    this.elm = options.elm || document.querySelector( this.selector );
    this.name = options.name || this.elm.getAttribute( 'aria-label' );
    this.toggleSelector = options.toggleSelector || '.menu__toggle';
    this.itemSelector = options.itemSelector || '.menu li';
    this.linkSelector = options.linkSelector || ':scope > a';
    this.activeClass = options.activeClass || 'active';
    this.elm.setAttribute( 'aria-label', this.name );
    this.elMenuWrappers = [];
    this.elMenuToggles = [];
  }

  setActive( pageRef ) {
    const menuCtrl = this;
    const activeItemRef = pageRef || 'home';
    this.menuItems = this.elm.querySelectorAll( this.itemSelector );
    this.menuItems.forEach( function( elItem ) {
      const elLink = elItem.querySelector( menuCtrl.linkSelector );
      const itemRef = elLink?.getAttribute( 'href' );
      if ( itemRef == activeItemRef || ( itemRef === '' && activeItemRef === 'home' ) ) {
        menuCtrl.elm.setAttribute( 'aria-expanded', 'true' );
        elItem.classList.add( menuCtrl.activeClass );
      }
    });
  }

  setToggle( options = {} ) {
    const elMenu = options.elm || this.elm;
    const elMenuWrapper = elMenu.parentElement;
    const elMenuToggle = elMenuWrapper.querySelector( options.selector || this.toggleSelector );
    console.log('MenuController::setToggle', { options, elMenu, elMenuWrapper, elMenuToggle });
    elMenuToggle.addEventListener( 'click', (event) => this.onToggle(event, elMenu, elMenuWrapper) );
    this.elMenuWrappers.push( elMenuWrapper );
    this.elMenuToggles.push( elMenuToggle );
  }

  onToggle( event, elMenu, elMenuWrapper ) {
    console.log( 'MenuController::onToggle', { event, elMenu, elMenuWrapper } );
    const ariaLabel = elMenu.getAttribute( 'aria-label' );
    if ( ariaLabel.includes( ' close' ) ) {
      elMenu.setAttribute( 'aria-label', ariaLabel.replace( ' close', '' ) );
      elMenu.setAttribute( 'aria-expanded', 'false' );
    } else {
      elMenu.setAttribute( 'aria-label', ( ariaLabel || 'menu' ) + ' close' );
      elMenu.setAttribute( 'aria-expanded', 'true' );      
    }
  }

  initSubmenus( options = {} ) {
    const menuCtrl = this;
    const submenus = menuCtrl.elm.querySelectorAll( '.submenu' );
    console.log( 'MenuController::initSubmenus', { options, submenus } );
    submenus.forEach( elm => menuCtrl.setToggle({ elm, selector: '.submenu__toggle' }) );
    this.submenus = submenus;
  }

}