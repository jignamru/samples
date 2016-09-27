'use strict';
import React, { 
  Component, 
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator,
  Alert
} from 'react-native';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/addSitter');
var SittersListScreen = require('./sittersList');

import CustomTextInput from '../components/customTextInput';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';

class AddSitter extends Component {
   constructor() {
     super();
     this.state = {
                    fullname: '',
                    phone: '',
                    email: '',
                    rate: '',
                    priority: ''
                  };
	}
  
	handleAddSitter(){
 	   	var [firstName, lastName] = this.state.fullname.split(' ');
    	var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.phone,
            emailAddress: this.state.email,
            priorityOrder: this.state.priority
          });
	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
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
                Alert.alert(
		            'Yay!',
		            firstName + " is part of your sitter community!",
		            [
		              	{text: 'OK', onPress: () => this.props.navigator.push({
										              component: SittersListScreen
										            })
		          		},
		            ]
		          )
	            this.props.navigator.push({
	              id: 'sitters'
	            })
	          } else {            
	            Alert.alert('Uh oh!', responseJson.message);
	          }
	        })
	        .catch((error) => {
	          console.warn(error);
	        });
    	}).done();
	}

    render() {
        const leftButtonConfig = {
          title: 'Back',
          handler: () => this.props.navigator.pop()
        };
      
	    return (
	        <View style={styles.container}>
                <NavigationBar
                  title={<IconTitle/>}
                  leftButton={leftButtonConfig} />
	        	<View style={styles.introContainer}>
		            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
		            <CustomText style={styles.title}>Add new sitter</CustomText>
		        </View>

		        <View style={styles.inputs}>
		            <View style={styles.inputContainer}>
		                <Image style={styles.inputName} source={require('../images/icons/name.png')}/>
		                <CustomTextInput 
		                    style={styles.input}
		                    placeholder="First and last name"
		                    placeholderTextColor="#FFF"
		                    value={this.state.fullname}
                            onChangeText={text => this.setState({fullname:text})}
		                />
		            </View>
    	            <View style={styles.inputContainer}>
		                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
		                <CustomTextInput 
		                    style={[styles.input, styles.whiteFont]}
		                    placeholder="Email"
		                    placeholderTextColor="#FFF"
		                    value={this.state.email}
                            onChangeText={text => this.setState({email:text})}
		                />
		            </View>
	                <View style={styles.inputContainer}>
	                    <Image style={styles.inputPhone} source={require('../images/icons/phone.png')}/>
	                    <CustomTextInput 
	                        style={styles.input}
	                        placeholder="Mobile number"
	                        placeholderTextColor="#FFF"
	                        value={this.state.phone}
                            onChangeText={text => this.setState({phone:text})}
	                    />
              		</View>

		            <View style={styles.inputContainer}>
		                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
		                <CustomTextInput 
		                    style={styles.input}
		                    placeholder="Rate"
		                    placeholderTextColor="#FFF"
		                    value={this.state.rate}
                            onChangeText={text => this.setState({rate:text})}
		                />
		            </View>
	              <View style={styles.inputContainer}>
	                  <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
	                  <CustomTextInput
	                      style={styles.input}
	                      placeholder="Priority"
	                      placeholderTextColor="#FFF"
	                      value={this.state.priority}
                            onChangeText={text => this.setState({priority:text})}
	                  />
	              </View>              
	    		</View>
	    		<View style={styles.buttonRow}>
	    		      <CustomButton
	    		      	containerStyle={styles.buttonContainer}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={this.handleAddSitter.bind(this)}
				      >
				        ADD SITTER
				      </CustomButton>
				</View>
            </View>

	    )
	}
}


module.exports = AddSitter;