import React, { Component } from 'react';
import _ from 'lodash';
import { StyleSheet, Modal, TouchableHighlight, View } from 'react-native';
import CustomText from '../components/customText';

var common = require('../common/styles');
var styles = require('../styles/customButton');


export default class CustomButton extends Component {
  render() {
    var buttonStyle = [styles.button];
    var labelStyle = [styles.buttonText];

    if(this.props.type == 'small'){
      buttonStyle.push(styles.small);
    }

    if(this.props.disabled){
      buttonStyle.push(styles.buttonDisabled);
      labelStyle.push(styles.buttonTextDisabled);
    } else {
      buttonStyle.push(styles.buttonActive);
      labelStyle.push(styles.buttonTextActive);
    }

    if(this.props.buttonStyle){
      buttonStyle.push(this.props.buttonStyle);
    }

    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        underlayColor={common.color.lightGrey}>
        <View style={buttonStyle}>
          <CustomText style={labelStyle}>{this.props.label}</CustomText>
      </View>
      </TouchableHighlight>
    );
  }
}


