'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity,Alert} from 'react-native';
import { Form, SwitchField, DatePickerField } from 'react-native-form-generator';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/requestSitter');
var HomeScreen = require('./home');

import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import CustomText from '../components/customText';
import CustomModal from '../components/customModal';
import Icon from 'react-native-vector-icons/FontAwesome';


class RequestSitter extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {
          startDateTime: new Date(),
          endDateTime: new Date(),
          urgent: false
        },
        disableButton: true
      }
  }

  componentWillMount() {
    this.state.formData.endDateTime.setHours(this.state.formData.endDateTime.getHours() + 2);
  }
    
  handleRequestSitter() {
    var requestType = this.state.formData.urgent ? 'URGENT' : 'NORMAL';
    var startDT = new Date(this.state.formData.startDateTime);
    var endDT = new Date(this.state.formData.endDateTime);

    var data = JSON.stringify({
                startDatetimeIso8601: startDT.toISOString(),
                endDatetimeIso8601: endDT.toISOString(),
                type:  requestType,
                sitterUserIds: [], //todo ?
                parentUserNotes:  "", //todo ?
              });

    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/schedule", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.id) {
              Alert.alert(
                'Done!', 
                "Your request has been submitted. We'll keep in touch!",
                [ 
                  {
                    text: 'OK', 
                    onPress: () => this.props.navigator.pop() 
                  }
                ]
                );
          } else {
            Alert.alert('Uh oh!', responseJson.message);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    }).done();
  }

  handleFormChange(newData){
    var data = {};
    data.startDateTime = newData.startDateTime ? newData.startDateTime : this.state.formData.startDateTime;
    data.endDateTime = newData.endDateTime ? newData.endDateTime : this.state.formData.endDateTime;
    data.urgent = newData.urgent ? newData.urgent: this.state.formData.urgent;

    this.setState({formData:data});
    this.props.onFormChange && this.props.onFormChange(newData);

    if( this.refs.requestSitterForm.values.startDateTime &&
        this.refs.requestSitterForm.values.endDateTime 
      ) {
      this.state.disableButton = false;
    } else {
      this.state.disableButton = true;
    }
  }

  formatDate(d) {
    var formatted =  d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return formatted;
  }

  render() {

    var disabledButton = (
      <View style={[styles.button, styles.buttonDisabled]}>
          <CustomText style={[styles.buttonText, styles.buttonTextDisabled]}>REQUEST SITTER</CustomText>
      </View>  
    );

    var activeButton = (
      <View style={[styles.button, styles.buttonActive]}>
        <CustomText style={[styles.buttonText, styles.buttonTextActive]}>REQUEST SITTER</CustomText>
      </View>
    );
    
    return (
        <View style={styles.container}>
          <NavigationBar
            title={<IconTitle/>}
            leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
           />

            <View style={styles.introContainer}>
                <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/reading.png')} />
                <CustomText isHeading={true} style={styles.title}>Request a sitter</CustomText>
            </View>

            <Form ref='requestSitterForm' 
            onChange={this.handleFormChange.bind(this)}>

              <DatePickerField ref='startDateTime'
                iconLeft={<Icon style={{alignSelf:'center', marginLeft:10}} name='calendar' size={15} />}
                date={this.state.formData.startDateTime}
                mode="datetime"
                minuteInterval = {15}
                minimumDate = {new Date()}
                prettyPrint={true}
                pickerWrapper={<CustomModal modalTitle="Choose a start date and time" />}
                dateTimeFormat = { date => { return this.formatDate(date) }}
                placeholderStyle = {styles.placeholderStyle}
                valueStyle = {styles.valueStyle}
                placeholder='Start Date & Time'/>

              <DatePickerField ref='endDateTime'
                iconLeft={<Icon style={{alignSelf:'center', marginLeft:10}} name='calendar' size={15} />}
                date={this.state.formData.endDateTime}
                mode="datetime"
                minuteInterval = {15}
                minimumDate = {new Date()}
                prettyPrint={true}
                pickerWrapper={<CustomModal modalTitle="Choose an end date and time" />}                
                dateTimeFormat = { date => { return this.formatDate(date) }}
                labelStyle = {styles.labelStyle}
                valueStyle = {styles.valueStyle}
                placeholderStyle = {styles.placeholderStyle}
                placeholder='End Date & Time'/>

                <SwitchField 
                  label={<CustomText style={styles.urgent}><Icon name="bullhorn" size={15} style={styles.inputIcon} />&nbsp;&nbsp;Urgent Request</CustomText>}
                  helpTextComponent={<CustomText style={[styles.urgent, styles.urgentHelpText]}>Urgent requests will notify *all* sitters at once (vs. by priority)</CustomText>}
                  ref="urgent"
            />

            </Form>

            <TouchableHighlight
              style={styles.button}
              onPress={this.handleRequestSitter.bind(this)}
              disabled={this.state.disableButton}>
                { this.state.disableButton ? disabledButton : activeButton }
            </TouchableHighlight>
        
        </View>
    )
  }
}

module.exports = RequestSitter;
