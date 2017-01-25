'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity,Alert} from 'react-native';
import { Form, SwitchField, DatePickerField } from 'react-native-form-generator';
import moment from 'moment';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/requestSitter');
var HomeScreen = require('./home');

import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import CustomText from '../components/customText';
import CustomTextInput from '../components/customTextInput';
import CustomModal from '../components/customModal';
import CustomButton from '../components/customButton';
import Icon from 'react-native-vector-icons/FontAwesome';


class RequestSitter extends Component{

  constructor(props) {
      super(props);
      this.state = {
        formData: {
          startDateTime: moment().add(1,'h'),
          endDateTime: moment().add(2,'h'),
          urgent: false,
          parentNotes: ''
        },
        disableButton: true,
        errorMessage: ''
      }
  }
    
  handleRequestSitter() {
    var requestType = this.state.formData.urgent ? 'URGENT' : 'NORMAL';
    var startDT = this.state.formData.startDateTime;
    var endDT = this.state.formData.endDateTime;

    var data = JSON.stringify({
                startDatetimeIso8601: startDT.format(),
                endDatetimeIso8601: endDT.format(),
                type:  requestType,
                sitterUserIds: [], //todo ?
                parentUserNotes:  this.state.formData.parentNotes,
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
            console.log('errorResponse', responseJson);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    }).done();
  }

  handleFormChange(newData){
    var data = {};
    data.startDateTime = newData.startDateTime ? moment(newData.startDateTime) : this.state.formData.startDateTime;
    data.endDateTime = newData.endDateTime ? moment(newData.endDateTime) : this.state.formData.endDateTime;
    data.urgent = newData.urgent ? newData.urgent: this.state.formData.urgent;
    data.parentNotes = newData.parentNotes ? newData.parentNotes : this.state.formData.parentNotes;

    var datesDiff = data.endDateTime.diff(data.startDateTime);
    // update endTime only if its value is before startTime
    if( datesDiff < 1){  
      data.endDateTime = data.startDateTime;
      data.endDateTime.add(1,'h');
      this.state.errorMessage = "Please pick an end date and time that's ahead of your start date and time.";
      // to-do: update the displayed endDate (for some reason it's not updating automatically.)
      // this.refs.requestSitterForm.values.endDateTime = data.endDateTime.format();
    } else {
      this.state.errorMessage = '';
    }

    this.setState({formData:data});
    this.props.onFormChange && this.props.onFormChange(newData);

    if( this.refs.requestSitterForm.values.startDateTime &&
        this.refs.requestSitterForm.values.endDateTime &&
        ( datesDiff > 0 )
        ) {
      this.state.disableButton = false;
    } else {
      this.state.disableButton = true;
    }
  }

  formatDate(d) {
    return d.format('ddd MMM D    h:mm a');
  }

  render() {    
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
                pickerWrapper={<CustomModal modalTitle="Choose a start date and time" />}
                dateTimeFormat = { date => { return this.formatDate(moment(date)) }}
                placeholderStyle = {styles.placeholderStyle}
                valueStyle = {styles.valueStyle}
                placeholder='Start Date & Time'/>

              <DatePickerField ref='endDateTime'
                iconLeft={<Icon style={{alignSelf:'center', marginLeft:10}} name='calendar' size={15} />}
                date={this.state.formData.endDateTime}
                mode="datetime"
                minuteInterval = {15}
                minimumDate = {new Date(this.state.formData.startDateTime.toISOString())}
                pickerWrapper={<CustomModal modalTitle="Choose an end date and time" />}                
                dateTimeFormat = { date => { return this.formatDate(moment(date)) }}
                labelStyle = {styles.labelStyle}
                valueStyle = {styles.valueStyle}
                placeholderStyle = {styles.placeholderStyle}
                placeholder='End Date & Time'/>

              <CustomTextInput
                multiline={true}
                ref='parentNotes'
                iconLeft={<Icon style={{alignSelf:'center', marginLeft:10}} name='comment-o' size={15} />}
                placeholder='Include an optional note'
                style = {styles.valueStyle}
              />

              <SwitchField 
                label={<CustomText style={styles.urgent}><Icon name="bullhorn" size={15} style={styles.inputIcon} />&nbsp;&nbsp;Urgent Request</CustomText>}
                helpTextComponent={<CustomText style={[styles.urgent, styles.urgentHelpText]}>Urgent requests will notify *all* sitters at once (vs. by priority)</CustomText>}
                ref="urgent"
              />

            </Form>
            <CustomText style={styles.error}>{this.state.errorMessage}</CustomText>
            <CustomButton
              onPress={this.handleRequestSitter.bind(this)}
              disabled={this.state.disableButton}
              label="REQUEST SITTER"/>

              <BottomIconBar navigator={this.props.navigator}/>
        
        </View>
    )
  }
}

module.exports = RequestSitter;
