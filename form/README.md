# F1JS Form - User Manual

		f1.form.validate('#my-form', options);

		e.g. elMyForm.onsubmit = (event) => f1.form.validate(event.target, options);

		e.g. elMyInput.onblur = (event) => f1.form.validate(event.target, options);

		f1.form.validations.add( 'required', testFn(el, args, errormessage ){} );

		f1.form.fieldTypes.add( 'email', {
		        selector: '.field',
		        getInputs: fn(){},
		        getValue: fn(){},
		        setValue: fn(){},
		        getLabel: fn(){},
		        getTabIndex: fn(){},
		        validate: fn(){},
		        showErrors: fn(el, errors){},
		        removeErrors: fn(el){},
		        create: fn(){}
		      } )
		      

		f1.form.fields.add( elm, type )

		f1.form.fields.constructSelector().. put inside fields.get()!

		f1.form.fields.sort()... by tabIndex

		f1.form.fields.get()
