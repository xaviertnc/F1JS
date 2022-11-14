/* globals F1 */

/**
 * F1JS Modal - Simplify Modal Popups - 15 July 2022
 * 
 * @author C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 1.1.0 - 01 Oct 2022
 * 
 */

F1.Modal = {

  makeDraggable: function( elModal )
  {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      const elModalInner = elModal.querySelector( '.modal-inner');
      const elHeader = elModalInner.querySelector( 'header' );
      elHeader.addEventListener('mousedown', dragMouseDown);

      function dragMouseDown( e ) {
        console.log( 'dragMouseDown' );
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener( 'mouseup', closeDragElement );
        document.addEventListener( 'mousemove', elementDrag );
      }

      function closeDragElement() {
        console.log( 'closeDragElement' );
        // stop moving when mouse button is released:
        document.removeEventListener( 'mouseup', closeDragElement );
        document.removeEventListener( 'mousemove', elementDrag );
      }
  
      function elementDrag( e ) {
        e = e || window.event;
        e.preventDefault();
        console.log( 'elementDrag' );
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elModalInner.style.top = (elModalInner.offsetTop - pos2) + "px";
        elModalInner.style.left = (elModalInner.offsetLeft - pos1) + "px";
      }
  },

  show: function ( elModal, options )
  {
    if ( ! elModal ) return;

    options = options || {};

    // console.log( 'F1.Modal::show(), elModal:', elModal, ', opts:', options );    
    
    if ( options.event ) event.preventDefault();

    document.documentElement.classList.add( 'has-modal' );

    const elModalInner = elModal.querySelector( '.modal-inner');
    const elClose = elModalInner.querySelector( '.modal-close' );
    if ( elClose && ! elClose.MODAL ) elClose.MODAL = elModal;

    // NB: options.form === F1.Form instance
    const form = options.form;
 
    if ( form )
    {
      if ( options.clear ) form.clear();
        else if ( options.reset ) form.reset();
          else if ( options.init ) form.init( options.init );
      if ( options.focus ) form.focus();
    }

    if ( ! elModal.hasClickListener ) {
      elModal.hasClickListener = true;
      elModal.addEventListener( 'click',
        function( e ) {
          if ( e.target === elModal ) {
            elModal.classList.remove( 'open' );
            document.documentElement.classList.remove( 'has-modal' );
          }
        }
      );
    }

    elModal.classList.add( 'open' );
  },


  close: function ( el, e )
  {
    if ( e ) e.preventDefault();
    document.documentElement.classList.remove( 'has-modal' );
    const elModal = el && el.MODAL ? el.MODAL : el;
    elModal.classList.remove( 'open' );
  }

};

// end: F1.Modal
