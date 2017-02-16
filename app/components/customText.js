import React from 'react';
import ReactNative from 'react-native';
import _ from 'lodash';
var common = require('../common/styles');


const {
  Text,
} = ReactNative;


export default class CustomText extends Text {
  render() {
	  var props = _.clone(this.props);
    var fontFamily = this.props.isHeading ? common.fontFamily.heading : common.fontFamily.base;
    var customStyles = {fontFamily: fontFamily, fontSize: 17};

    if (_.isArray(this.props.style)){
      props.style.push({customStyles});
    } else if (props.style) {
      props.style = [customStyles, props.style];
    } else {
      props.style = {customStyles};
    }

    this.props = props;

    return super.render();
  }
}


