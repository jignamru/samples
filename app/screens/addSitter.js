'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert, ScrollView, Modal, KeyboardAvoidingView} from 'react-native';
import { Form, PickerField } from 'react-native-form-generator';
import Icon from 'react-native-vector-icons/FontAwesome';

var GLOBAL = require('../common/globals');
var styles = require('../styles/addSitter');
var Validators = require('../common/formFieldValidators');

import CustomTextInput from '../components/customTextInput';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';

class AddSitter extends Component {
   constructor(props) {
     super(props);
     this.state = {
        formData: {
        	fullname: '',
        	phone: '',
        	email: '',
        	priority: '5'
        },
        disableButton: true
		}
	}

	componentWillMount() {
		if(this.props.contact){
			var data = {
				fullname: this.props.contact.name,
				phone: this.props.contact.phone,
				email: this.props.contact.email
			}
			this.setState({formData : data});
		}
	}

	handleAddSitter(){
 	   	var [firstName, lastName] = this.state.formData.fullname.split(' ');
    	var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.formData.phone,
            emailAddress: this.state.formData.email,
            priorityOrder: this.state.formData.priority
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
	          if(responseJson.firstName) {
                Alert.alert(
		            'Yay!',
		            firstName + " is part of your sitter community!" 
		           );
                var SittersListScreen = require('./sittersList'); // need this here for lazy loading
                this.props.navigator.push({
          			component: SittersListScreen
        		})
	          } else {
	            Alert.alert('Uh oh!', "We weren't able to add your sitter. Totally our fault, sorry! Maybe you can try again later?");
	            console.warn(responseJson.message);
	          }
	        })
	        .catch((error) => {
	          console.warn(error);
	        });
    	}).done();
	}

	handleFormChange(newData){
		var data = {};
		data.fullname = newData.fullname ? newData.fullname : this.state.formData.fullname;
		data.phone = newData.phone ? newData.phone : this.state.formData.phone;
		data.email = newData.email ? newData.email : this.state.formData.email;
		data.priority = newData.priority ? newData.priority: this.state.formData.priority;

	    this.setState({formData:data});
	    this.props.onFormChange && this.props.onFormChange(newData);

	    if( (this.refs.addSitterForm.refs.fullname && this.refs.addSitterForm.refs.fullname.valid) &&
	      (this.refs.addSitterForm.refs.phone && this.refs.addSitterForm.refs.phone.valid) &&
	      (this.refs.addSitterForm.refs.email && this.refs.addSitterForm.refs.email.valid) 
	    ){
	      this.state.disableButton = false;
	    } else {
	      this.state.disableButton = true;
	    }
	}

    render() {
	    return (
	        <View style={styles.container}>
            <NavigationBar
              title={<IconTitle/>}
              leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
		        />

  	        <View style={styles.introContainer}>
  					  <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/elephant.png')} />
	            <CustomText isHeading={true} style={styles.title}>Add new sitter</CustomText>
		        </View>

		      <ScrollView keyboardShouldPersistTaps={true} style={styles.scrollView}>
            <KeyboardAvoidingView behavior='padding'>
              <Form ref='addSitterForm'
              	// onFocus={this.handleFormFocus.bind(this)}
                onChange={this.handleFormChange.bind(this)}
                label="Login">

                <CustomTextInput
                  ref='fullname'
                  style={styles.input}
                  iconLeft={<Icon name="user" size={20} style={styles.inputIcon} />}
                  placeholder='First and last name'
                  value={this.state.formData.fullname}
                  validationFunction={ value => Validators.validateFullname(value) }
                  autoCapitalize="words"
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.addSitterForm.refs.fullname.valid){
                        return <CustomText style={styles.errors}>{self.refs.addSitterForm.refs.fullname.validationErrors.join("\n")}</CustomText>;
                      }
                    }
                  })(this)}
                />

                <CustomTextInput
                  ref='phone'
                  style={styles.input}
                  iconLeft={<Icon name="mobile" size={20} style={styles.inputIcon} />}
                  keyboardType='phone-pad'
                  placeholder='Mobile number'
                  value={this.state.formData.phone}
                  validationFunction={ value => Validators.validatePhone(value) }
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.addSitterForm.refs.phone.valid){
                        return <CustomText style={styles.errors}>{self.refs.addSitterForm.refs.phone.validationErrors.join("\n")}</CustomText>;
                      }
                    }
                  })(this)}
                />

                <CustomTextInput
                  ref='email'
                  style={styles.input}
                  iconLeft={<Icon name="at" size={20} style={styles.inputIcon} />}
                  keyboardType='email-address'
                  placeholder='Email address'
                  value={this.state.formData.email}
                  autoCapitalize="none"
                  validationFunction={ value => Validators.validateEmail(value) }
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.addSitterForm.refs.email.valid){
                        return <CustomText style={styles.errors}>{self.refs.addSitterForm.refs.email.validationErrors.join("\n")}</CustomText>;
                      }
                    }
                  })(this)}
                />

          			<PickerField ref='priority'
          				iconLeft={<Icon name="heart-o" size={20} style={styles.inputIcon} />}
          				iconRight={<Icon name="angle-right" size={20} style={[ styles.inputIcon, styles.iconRight ]} />}
          				placeholder= 'Priority'
          				valueStyle={[ styles.input, styles.pickerFieldValue ]}
          				value={this.state.formData.priority}
          				options={{
          					10: 'High priority',
          					5: 'Medium priority',
          					1: 'Low priority'
          				}}
                  pickerWrapper={<CustomModal modalTitle="Choose your priority level for this sitter" />}
          				/>
              </Form>
            </KeyboardAvoidingView>

            <CustomButton
              onPress={this.handleAddSitter.bind(this)}
              disabled={this.state.disableButton}
              label="ADD SITTER"/>

          </ScrollView>
        </View>

	    )
	}
}


module.exports = AddSitter;
