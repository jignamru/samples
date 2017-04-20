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
import TopBannerBox from '../components/topBannerBox';

class EditSitter extends Component {
   constructor(props) {
     super(props);
     this.state = {
        formData: {
        	fullname: '',
        	phone: '',
        	priority: ''
        },
        sitterId: '',
        disableButton: true,
        showSpinner: false
		}
	}

	componentWillMount() {
		var sitter = this.props.sitter;

		if(sitter){
			var data = {
				fullname: sitter.firstName + ' ' + sitter.lastName,
				phone: sitter.phoneNumber, 
				priority: sitter.priorityOrder
			}
			this.setState({formData : data});
			this.setState({sitterId: sitter.id})
		}
	}

	handleEditSitter(){
      this.setState( { showSpinner: true } );  

 	   	var [firstName, lastName] = this.state.formData.fullname.split(' ');
    	var data = JSON.stringify({
            firstName:    firstName,
            lastName:     lastName,
            phoneNumber:  this.state.formData.phone,
            emailAddress: '',
            priorityOrder: this.state.formData.priority
          });

	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
    	    fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/" + this.state.sitterId, {
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
        			      	sitter: responseJson
        			      }
              		})
	          } else {
              this.setState( { showSpinner: false } );  
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
		data.phone = newData.phone ? newData.phone : this.state.formData.phone;	
		data.priority = newData.priority ? newData.priority: this.state.formData.priority;

	    this.setState({formData:data});
	    this.props.onFormChange && this.props.onFormChange(newData);

	    if( (this.refs.editSitterForm.refs.fullname && this.refs.editSitterForm.refs.fullname.valid) &&
  			(this.refs.editSitterForm.refs.phone && this.refs.editSitterForm.refs.phone.valid) 
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

        <TopBannerBox
          imageSource={require('../images/bg/cuppa.jpg')}
          title="Edit sitter"
        />

		<ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
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
                  ref='phone'
                  style={styles.input}
                  iconLeft={<Icon name="mobile" size={20} style={styles.inputIcon} />}
                  keyboardType='phone-pad'
                  placeholder='Mobile number'
                  value={this.state.formData.phone}
                  validationFunction={ value => Validators.validatePhone(value) }
                  helpTextComponent={((self)=>{
                    if(Object.keys(self.refs).length !== 0){
                      if(!self.refs.editSitterForm.refs.phone.valid){
                        return <CustomText style={styles.errors}>{self.refs.editSitterForm.refs.phone.validationErrors.join("\n")}</CustomText>;
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
              showSpinner={this.state.showSpinner}
              label="SAVE"/>

        </ScrollView>

            </View>

	    )
	}
}


module.exports = EditSitter;
