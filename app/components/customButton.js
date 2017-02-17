import React, { Component } from 'react';
import _ from 'lodash';
import { StyleSheet, Modal, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import CustomText from '../components/customText';

var common = require('../common/styles');
var styles = require('../styles/customButton');


export default class CustomButton extends Component {
  constructor(props) {
      super(props);
      this.state = {
        disabled: ''
      }
  }

  componentWillMount(){
    var isDisabled = (this.props.disabled || this.props.showSpinner) ? true : false;  
    this.setState({disabled: isDisabled});
  }

  componentWillReceiveProps(nextProps) { 
    if( typeof nextProps.showSpinner !== "undefined" ) {
      this.setState({disabled: nextProps.showSpinner});
    } else if( typeof nextProps.disabled !== "undefined" ) {
      this.setState({disabled: nextProps.disabled});
    }
  }

  render() {
    var buttonStyle = [styles.button];
    var labelStyle = [styles.buttonText];

    if(this.props.type == 'small'){
      buttonStyle.push(styles.small);
    }

    if(this.state.disabled){
      buttonStyle.push(styles.buttonDisabled);
      labelStyle.push(styles.buttonTextDisabled);
    } else {
      buttonStyle.push(styles.buttonActive);
      labelStyle.push(styles.buttonTextActive);
    }

    if(this.props.buttonStyle){
      buttonStyle.push(this.props.buttonStyle);
    }

    var activityIndicator = (
      <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator 
            style={styles.activityIndicator} 
            size="small"/>
          <CustomText style={styles.activityIndicatorText}>PROCESSING...</CustomText>
      </View>
    );

    var buttonLabel = (
      <CustomText style={labelStyle}>{this.props.label}</CustomText>
    );

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        disabled={this.state.disabled}
        underlayColor={common.color.lightGrey}>
        <View style={buttonStyle}>
          { this.props.showSpinner ? activityIndicator : buttonLabel}
      </View>
      </TouchableHighlight>
    );
  }
}


