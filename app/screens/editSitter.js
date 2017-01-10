'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableHighlight, Navigator, Alert, ScrollView, Modal} from 'react-native';
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

class EditSitter extends Component {
   constructor(props) {
     super(props);
     this.state = {
        formData: {
        	fullname: '',
        	email: '',
        	priority: ''
        },
        disableButton: true
		}
	}

	componentWillMount() {
		var sitter = this.props.sitter;
		if(sitter){
			var data = {
				fullname: sitter.firstName + ' ' + sitter.lastName,
				priority: sitter.priorityOrder,
				email: sitter.emailAddress
			}
			this.setState({formData : data});
		}
	}

	handleEditSitter(){
 	   	var [firstName, lastName] = this.state.formData.fullname.split(' ');
    	var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            emailAddress: this.state.formData.email,
            priorityOrder: this.state.formData.priority
          });

    	console.log('data', data);
    	return;
    	
	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
		    fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters", {
	          method: "PUT",
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
		            firstName + "'s info has been updated." 
		           );
                var SitterDetailsScreen = require('./sitterDetails'); // need this here for lazy loading
                this.props.navigator.push({
			      component: SitterDetailsScreen, 
			      passProps: {
			      	sitter: sitterData
			      }
        		})
	          } else {
	            Alert.alert('Uh oh!', "We weren't able to update your sitter's information. Totally our fault, sorry! Maybe you can try again later?");
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
		data.email = newData.email ? newData.email : this.state.formData.email;
		data.priority = newData.priority ? newData.priority: this.state.formData.priority;

	    this.setState({formData:data});
	    this.props.onFormChange && this.props.onFormChange(newData);

	    if( (this.refs.editSitterForm.refs.fullname && this.refs.editSitterForm.refs.fullname.valid) &&
   	        (this.refs.editSitterForm.refs.email && this.refs.editSitterForm.refs.email.valid) 
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
		            <CustomText isHeading={true} style={styles.title}>Edit sitter</CustomText>
		        </View>

		<ScrollView keyboardShouldPersistTaps={true} style={styles.scrollView}>
          <Form ref='editSitterForm'
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
                  if(!self.refs.editSitterForm.refs.fullname.valid){
                    return <CustomText style={styles.errors}>{self.refs.editSitterForm.refs.fullname.validationErrors.join("\n")}</CustomText>;
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
                  if(!self.refs.editSitterForm.refs.email.valid){
                    return <CustomText style={styles.errors}>{self.refs.editSitterForm.refs.email.validationErrors.join("\n")}</CustomText>;
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

          <CustomButton
              onPress={this.handleEditSitter.bind(this)}
              disabled={this.state.disableButton}
              label="SAVE"/>

        </ScrollView>

            </View>

	    )
	}
}


module.exports = EditSitter;