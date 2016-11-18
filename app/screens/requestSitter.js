'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View, Text, Image, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, Navigator, DatePickerIOS, Modal, Alert} from 'react-native';

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/requestSitter');
var CheckBox = require('react-native-checkbox');
var HomeScreen = require('./home');

import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import CustomButton from '../components/customButton';
import CustomText from '../components/customText';


class RequestSitter extends Component{

  constructor(props) {
      super(props);
      this.state = {
        startDateTime: new Date(),
        endDateTime: new Date(),
        type: 'NORMAL',
        showStartDateTimePicker: false,
        showEndDateTimePicker: false,
        urgent: false
      }
  }

  componentWillMount() {
    this.state.endDateTime.setHours(this.state.endDateTime.getHours() + 2);
  }
  
  toggleStartDatePicker() {
    var show = this.state.showStartDateTimePicker == false ? true : false;
    this.setState( { showStartDateTimePicker: show } );
  }
  
  toggleEndDatePicker() {
    var show = this.state.showEndDateTimePicker == false ? true : false;
    this.setState( { showEndDateTimePicker: show } );
  }
  
  handleRequestSitter() {
    var requestType = this.state.urgent ? 'URGENT' : 'NORMAL';
    var data = JSON.stringify({
                startDatetimeIso8601: this.state.startDateTime.toISOString(),
                endDatetimeIso8601: this.state.endDateTime.toISOString(),
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

  render() {
    
    var startDatePicker = (
      <View>      
          <Modal 
            animationType="slide"
            transparent={false}
            visible={this.state.showStartDateTimePicker}>
            <View
              style={styles.modal}>
                <DatePickerIOS
                  date={this.state.startDateTime}
                  mode="datetime"
                  minuteInterval = {15}
                  minimumDate = {new Date()}
                  onDateChange={ text => this.setState({startDateTime:text}) }
                />
                <CustomButton
                  containerStyle={styles.buttonContainer}
                  style={styles.button}
                  styleDisabled={{color: 'red'}}
                  onPress={ this.toggleStartDatePicker.bind(this) }
                >
                  SELECT
                </CustomButton>
            </View>
          </Modal>
      </View>
    );    
    var endDatePicker = (
      <View>      
          <Modal 
            animationType="slide"
            transparent={false}
            visible={this.state.showEndDateTimePicker}>
            <View
              style={styles.modal}>
      
              <DatePickerIOS
                        date={this.state.endDateTime}
                        mode="datetime"
                        minuteInterval = {15}
                        minimumDate = {this.state.startDateTime}
                        onDateChange={ text => this.setState({endDateTime:text}) }
                      />

              <CustomButton
                containerStyle={styles.buttonContainer}
                style={styles.button}
                styleDisabled={{color: 'red'}}
                onPress={ this.toggleEndDatePicker.bind(this) }
              >
                SELECT
              </CustomButton>
            </View>
          </Modal>
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

        <View style={styles.inputs}> 
          <View style={styles.inputContainer}>
              <CustomText>Start date and time:</CustomText>
              <TouchableWithoutFeedback onPress={ this.toggleStartDatePicker.bind(this) }>
                <View style={ styles.input }>
                  <CustomText>
                    {this.state.startDateTime.toLocaleDateString() +
                      ' at ' + this.state.startDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </CustomText>
                </View>
              </TouchableWithoutFeedback>
              { this.state.showStartDateTimePicker == true ? startDatePicker : <View/> }

          </View>
          
           <View style={styles.inputContainer}>
              <CustomText>End date and time:</CustomText>
              <TouchableWithoutFeedback onPress={ this.toggleEndDatePicker.bind(this) }>
                <View style={ styles.input }>
                  <CustomText>
                    {this.state.endDateTime.toLocaleDateString() +
                      ' at ' + this.state.endDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </CustomText>
                </View>
              </TouchableWithoutFeedback>
              { this.state.showEndDateTimePicker == true ? endDatePicker : <View/> }

          </View>
          <View style={styles.inputContainer}>
            <CheckBox
              label='Urgent'
              labelStyle={styles.checkbox}
              uncheckedImage={require('../images/icons/checkbox-false.png')}
              checkedImage={require('../images/icons/checkbox-true.png')}
              onChange={(checked) => this.state.urgent = checked}
            />
          </View>
   
      </View>

      <View style={styles.buttonRow}>
            <CustomButton
              containerStyle={styles.buttonContainer}
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this.handleRequestSitter.bind(this)}
            >
              SEND REQUEST
            </CustomButton>
      </View>
        
        </View>
    )
  }
}

module.exports = RequestSitter;
