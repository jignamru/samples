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
  TouchableWithoutFeedback,
  TouchableOpacity,
  Navigator,
  DatePickerIOS,
  Modal,
} from 'react-native'

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/requestSitter');
var Button = require('react-native-button');
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';

class RequestSitter extends Component{

  constructor(props) {
      super(props);
      this.state = {
        startDateTime: new Date(),
        endDateTime: new Date(),
        type: 'NORMAL',
        showStartDateTimePicker: false,
        showEndDateTimePicker: false
      }
  }
  
  toggleStartDatePicker() {
    var show = this.state.showStartDateTimePicker == false ? true : false;
    this.setState( { showStartDateTimePicker: show } );
    console.log('show picker: ', show);
  }
  
  toggleEndDatePicker() {
    var show = this.state.showEndDateTimePicker == false ? true : false;
    this.setState( { showEndDateTimePicker: show } );
  }
  
  handleRequestSitter() {
    //todo
  }


  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.props.navigator.pop()
    };
    
    var startDatePicker = (
      <View>      
          <Modal 
            animated={true}
            transparent={false}
            visible={this.state.showStartDateTimePicker}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f5fcff',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}>
                <DatePickerIOS
                  date={this.state.startDateTime}
                  mode="datetime"
                  minuteInterval = {15}
                  minimumDate = {new Date()}
                  onDateChange={ text => this.setState({startDateTime:text}) }
                />
                <Button
                  containerStyle={styles.buttonContainer}
                  style={styles.button}
                  styleDisabled={{color: 'red'}}
                  onPress={ this.toggleStartDatePicker.bind(this) }
                >
                  SELECT
                </Button>
            </View>
          </Modal>
      </View>
    );    
    var endDatePicker = (
      <View style={ [styles.datePicker, styles.endDatePicker ] }>

        <TouchableOpacity onPress={ this.toggleEndDatePicker.bind(this) } style={{ padding: 5, alignItems: 'flex-end' }}>
          <Text>Done</Text>
        </TouchableOpacity>
      
        <DatePickerIOS
                  date={this.state.endDateTime}
                  mode="datetime"
                  minuteInterval = {15}
                  minimumDate = {this.state.startDateTime}
                  onDateChange={ text => this.setState({endDateTime:text}) }
                />
      </View>
    );
    
    return (
        <View>
          <NavigationBar
            title={<IconTitle/>}
            leftButton={leftButtonConfig} />

        <Text>Request a Sitter</Text>
        
        <View style={styles.inputs}> 
          <View style={styles.inputContainer}>
              <Text>Start date and time:</Text>
              <TouchableWithoutFeedback onPress={ this.toggleStartDatePicker.bind(this) }>
                <View style={ styles.input }>
                  <Text>
                    {this.state.startDateTime.toLocaleDateString() +
                      ' at ' + this.state.startDateTime.toLocaleTimeString()}
                    </Text>
                </View>
              </TouchableWithoutFeedback>
              { this.state.showStartDateTimePicker == true ? startDatePicker : <View/> }

          </View>
          
           <View style={styles.inputContainer}>
              <Text>End date and time:</Text>
              <TouchableWithoutFeedback onPress={ this.toggleEndDatePicker.bind(this) }>
                <View style={ styles.input }>
                  <Text>
                    {this.state.endDateTime.toLocaleDateString() +
                      ' at ' + this.state.endDateTime.toLocaleTimeString()}
                    </Text>
                </View>
              </TouchableWithoutFeedback>
              { this.state.showEndDateTimePicker == true ? endDatePicker : <View/> }

          </View>   
      </View>

      <View style={styles.buttonRow}>
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.button}
              styleDisabled={{color: 'red'}}
              onPress={this.handleRequestSitter.bind(this)}
            >
              SEND REQUEST
            </Button>
      </View>
        
        </View>
    )
  }
}

module.exports = RequestSitter;
