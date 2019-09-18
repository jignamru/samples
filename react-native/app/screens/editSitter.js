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
        	priority: '',
          notes: '',
          type: '',
          typeDescription: ''
        },
        sitterId: '',
        disableButton: true,
        showSpinner: false,
        showTypeDescriptionInput: false
		}
	}

	componentWillMount() {
		var sitter = this.props.sitter;

		if(sitter){
			var data = {
				fullname: sitter.firstName + ' ' + sitter.lastName,
				phone: sitter.phoneNumber, 
				priority: sitter.priorityOrder,
        userNotes: sitter.userNotes,
        type: sitter.type,
        typeDescription: sitter.typeDescription
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
            userNotes: this.state.formData.notes,
            type: this.state.formData.type,
            typeDescription: this.state.formData.typeDescription,
            priorityOrder: this.state.formData.priority,
          });

      console.log('data', data);

	    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
        console.log(GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/" + this.state.sitterId);
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
    var showTypeDescription = false;
		var data = {};
		data.fullname = newData.fullname ? newData.fullname : this.state.formData.fullname;
		data.phone = newData.phone ? newData.phone : this.state.formData.phone;	
    data.priority = newData.priority ? newData.priority: this.state.formData.priority;
    data.notes = newData.notes ? newData.notes: this.state.formData.notes;
    data.type = newData.type ? newData.type: this.state.formData.type;
    data.typeDescription = newData.typeDescription ? newData.typeDescription: this.state.formData.typeDescription;

    this.setState({formData:data});
    this.props.onFormChange && this.props.onFormChange(newData);

    if( data.type == "OTHER" ){
      showTypeDescription = true;
    }
    this.setState({
      showTypeDescriptionInput: showTypeDescription
    });


    if( (this.refs.editSitterForm.refs.fullname && this.refs.editSitterForm.refs.fullname.valid) &&
			(this.refs.editSitterForm.refs.phone && this.refs.editSitterForm.refs.phone.valid) 
    ){
      this.state.disableButton = false;
    } else {
      this.state.disableButton = true;
    }
	}

    render() {
      var typeDescriptionInput = (
        <CustomTextInput
          ref='typeDescription'
          labelStyle={styles.typeDescriptionLabel}
          label='Custom sitter type: '
          placeholder='start typing here...'
          value={this.state.formData.userNotes}
        />
      );

	    return (
	        <View style={styles.container}>
                <NavigationBar
                  title={<IconTitle/>}
                  leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
				/>

        <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>

        <TopBannerBox
          imageSource={require('../images/bg/cuppa.jpg')}
          title="Edit sitter"
        />

          <Form ref='editSitterForm'
            onChange={this.handleFormChange.bind(this)}
            label="Login">

            <CustomTextInput
              ref='fullname'
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

            <PickerField ref='type'
              iconLeft={<Icon name="handshake-o" size={15} style={styles.inputIcon} />}
              iconRight={<Icon name="angle-right" size={20} style={[ styles.inputIcon, styles.iconRight ]} />}
              valueStyle={styles.pickerFieldValue}
              value={this.state.formData.type}
              options={{
                'CHILD': 'Child sitter',
                'PET': 'Pet sitter',
                'HOUSE': 'House sitter',
                'OTHER': 'Custom'
              }}
              pickerWrapper={<CustomModal modalTitle="Choose sitter type" />}
            /> 

            { this.state.showTypeDescriptionInput ? typeDescriptionInput : <View/> }

            <CustomTextInput
              ref='notes'
              iconLeft={<Icon name="pencil-square-o" size={15} style={styles.inputIcon} />}
              placeholder='Your private notes about this sitter (optional)'
              value={this.state.formData.userNotes}
            />


            <CustomTextInput
              ref='phone'
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
				valueStyle={styles.pickerFieldValue}
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
