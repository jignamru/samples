'use strict';
var React = require('react-native');
var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/addSitter');
var Button = require('react-native-button');

var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator
} = React;

var AddSitter = React.createClass({
	getInitialState: function() {
		return {
	      fullname: null,
	      phone: null,
	      email: null,
	      rate: null,
	      priority: null
    	}
	},

	handleAddSitter: function(){
 	   	var [firstName, lastName] = this.state.fullname.split(' ');
    	var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.phone,
            emailAddress: this.state.email,
            priorityOrder: this.state.priority
          });
	    console.log(data);
	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
//	    	console.log('post url is: ' + GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters");
		    fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters", {
	          method: "POST",
	          headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	          },
	          body: data
	        })
	        .then((response) => response.json())
	        .then((responseJson) => {
	          console.log('Response:',responseJson);
	          if(responseJson.id) {
	          	console.log('sitter was added!');
	            // User._setUserId(responseJson.id).done();
	            // this.props.navigator.push({
	            //   id: 'home'
	            // })
	          } else {
	            console.log('Message:', responseJson.message);
	            // TODO display error message to user
	          }
	        })
	        .catch((error) => {
	          console.warn(error);
	        });
    	}).done();
	},

    render: function() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
		            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
		            <Text style={styles.title}>Add new sitter</Text>
		        </View>

		        <View style={styles.inputs}>
		            <View style={styles.inputContainer}>
		                <Image style={styles.inputName} source={require('../images/icons/name.png')}/>
		                <TextInput 
		                    style={styles.input}
		                    placeholder="First and last name"
		                    placeholderTextColor="#FFF"
		                    value={this.state.fullname}
	                      onChangeText={text => this.state.fullname = text}
		                />
		            </View>
    	            <View style={styles.inputContainer}>
		                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
		                <TextInput 
		                    style={[styles.input, styles.whiteFont]}
		                    placeholder="Email"
		                    placeholderTextColor="#FFF"
		                    value={this.state.email}
	                      onChangeText={text => this.state.email = text}
		                />
		            </View>
	                <View style={styles.inputContainer}>
	                    <Image style={styles.inputPhone} source={require('../images/icons/phone.png')}/>
	                    <TextInput 
	                        style={styles.input}
	                        placeholder="Mobile number"
	                        placeholderTextColor="#FFF"
	                        value={this.state.phone}
	                        onChangeText={text => this.state.phone = text}
	                    />
              		</View>

		            <View style={styles.inputContainer}>
		                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
		                <TextInput 
		                    style={styles.input}
		                    placeholder="Rate"
		                    placeholderTextColor="#FFF"
		                    value={this.state.rate}
	                      onChangeText={text => this.state.rate = text}
		                />
		            </View>
	              <View style={styles.inputContainer}>
	                  <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
	                  <TextInput
	                      style={styles.input}
	                      placeholder="Priority"
	                      placeholderTextColor="#FFF"
	                      value={this.state.priority}
	                      onChangeText={text => this.state.priority = text}
	                  />
	              </View>              
	    		</View>
	    		<View style={styles.buttonRow}>
	    		      <Button
	    		      	containerStyle={styles.buttonContainer}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={this.handleAddSitter}
				      >
				        ADD SITTER
				      </Button>
				</View>
            </View>

	    )
	}
});


module.exports = AddSitter;