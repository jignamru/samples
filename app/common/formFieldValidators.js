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
	}

};