# F1JS Modal - User Manual

	function initBookingViewModal() {
	  return new F1.Modal( { elm: elBookingViewModal } );
	}

	function initBookingEditModal() {
	  return new F1.Modal( { elm: elBookingEditModal,
	    formController: bookingFormCtrl,
	    focusFormOnShow: 1  } );
	}

	bookingViewModalCtrl.show( { data: booking, body: modalBodyHTML } );
	bookingFormModalCtrl.show( { data: booking } );
	dateNavCalModalCtrl.show();

## Methods

onClick( event )
onCloseClick( event )
makeDraggable()
show( options )
close()
