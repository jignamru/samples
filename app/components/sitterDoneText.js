import React from 'react-native';
var common = require('../common/styles');
const {
  Component,
  Text,
} = React;


export default class SitterDoneText extends Component {
  render() {
    return (
      <Text style={{fontFamily: common.fontFamily.base }}>
        {this.props.children}
      </Text> 
    );
  }
}
