'use strict';

module.exports = {
	request: {
		status: {
			COULD_NOT_FIND_SITTER: "None of your sitters are available",
			IN_PROGRESS: "We're working on it...",
			BOOKED: "Woohoo!"
		},
		type: {
			NORMAL: 'Non urgent (We sent a request to your sitters by priority)',
			URGENT: 'Urgent (We sent a request to *all* your sitters)'
		}
	}
};