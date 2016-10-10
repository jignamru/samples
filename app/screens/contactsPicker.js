'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator} from 'react-native';


var Contacts = require('react-native-unified-contacts');

class ContactsPicker extends Component {
   constructor() {
     super();
     this.state = {
                    contacts: ''
                  };
	}

	componentWillMount() {
		Contacts.getContacts( (error, contacts) =>  {
		  if (error) {
		    console.error(error);
		  }
		  else {
		    console.log(contacts);
		  }
		});
	}

	render() {
	    return (
	        <View>
	        <Text>ALOHA</Text>
	        </View>

	    )
	}
}


module.exports = ContactsPicker;