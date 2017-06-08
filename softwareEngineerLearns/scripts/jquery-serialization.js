// Extends the jQuery with functions to get and set object to and from form fields
(function($) {
	$.fn.extend({

		// Creates an object from the form fields, with attributes field.name: field.value
		toObject: function() {
			let result = {};

			// Important to use []-notation instead of the .-notation,
			// since names of the fields can be whatever
			this.serializeArray().forEach(obj => result[obj.name] = obj.value);
			return result;
		},

		// Exctracts the forms fields from the obj, takes the name-attribute
		// of these fields, and if the obj has a property with that name,
		// sets the value of the field from the value of the property
		fromObject: function(obj) {
			this.find(':input').toArray().forEach(input => {
				let name = $(input).attr('name');
				if (obj[name]) {
					$(input).val(obj[name]);
				} else {
					$(input).val("");
				}
			});
		}		
	});
})(jQuery);