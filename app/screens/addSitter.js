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
var commonStyles = require('../common/styles');
var User = require('../common/user');
var styles = require('../styles/addSitter');
var SittersListScreen = require('./sittersList');

import CustomTextInput from '../components/customTextInput';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';

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
	    return (
	        <View style={styles.container}>
                <NavigationBar
                  title={<IconTitle/>}
                  leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
				/>
	        	
	        	<View style={styles.introContainer}>
		            <CustomText style={styles.title}>Add new sitter</CustomText>
		        </View>

		        <View style={styles.inputs}>
		            <View style={styles.inputContainer}>
		                <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/person.png')}/>
		                <CustomTextInput 
		                    style={styles.input}
		                    placeholder="First and last name"
		                    placeholderTextColor={commonStyles.color.grey}
		                    value={this.state.fullname}
                            onChangeText={text => this.setState({fullname:text})}
		                />
		            </View>
    	            <View style={styles.inputContainer}>
		                <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/email.png')}/>
		                <CustomTextInput 
		                    style={styles.input}
		                    placeholder="Email"
		                    placeholderTextColor={commonStyles.color.grey}
		                    value={this.state.email}
                            onChangeText={text => this.setState({email:text})}
		                />
		            </View>
	                <View style={styles.inputContainer}>
	                    <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/phone.png')}/>
	                    <CustomTextInput 
	                        style={styles.input}
	                        placeholder="Mobile number"
	                        placeholderTextColor={commonStyles.color.grey}
	                        value={this.state.phone}
                            onChangeText={text => this.setState({phone:text})}
	                    />
              		</View>

		            <View style={styles.inputContainer}>
		                <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/rate.png')}/>
		                <CustomTextInput 
		                    style={styles.input}
		                    placeholder="Hourly rate"
		                    placeholderTextColor={commonStyles.color.grey}
		                    value={this.state.rate}
                            onChangeText={text => this.setState({rate:text})}
		                />
		            </View>
	              <View style={styles.inputContainer}>
	                  <Image style={styles.inputIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/like.png')}/>
	                  <CustomTextInput
	                      style={styles.input}
	                      placeholder="Likeability"
	                      placeholderTextColor={commonStyles.color.grey}
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