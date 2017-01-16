'use strict';

module.exports = {

	validateEmail: function(value) {
	    if(!value || value == '') return "Email is required.";

	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	    var matches = re.test(value);
	    if (!matches) return "Please enter a valid email.";
	   
	    return true;
	},

	validatePassword: function(value) {
	    if(!value || value == '') return "Please enter your password";

	    return true;
	},

	validateFullname: function(value) {
	    if(!value || value == '') return "First and last name are required.";

		var re = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i;
		
		var matches = re.test(value);
	    if (!matches) return "Please enter a valid full name.";
	   
	    return true;
	},

	// currently only for US numbers
	// this validates US numbers with or without country code prefix (ex: "+1")
	validatePhone: function(value) {
	    if(!value || value == '') return "Mobile number is required.";

		var re = /^(\+[1])?(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
		
		var matches = re.test(value);
	    if (!matches) return "Please enter a valid US phone number.";
	   
	    return true;
	}

};