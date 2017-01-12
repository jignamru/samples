'use strict';

module.exports = {
	request: {
		status: {
			COULD_NOT_FIND_SITTER: "None of your sitters are available",
			IN_PROGRESS: "We're working on it...",
			BOOKED: "You got a sitter! Woohoo!"
		},
		type: {
			NORMAL: 'Non urgent request (We sent a request to your sitters by priority)',
			URGENT: 'Urgent request (We sent a request to *all* your sitters)'
		}
	}
};