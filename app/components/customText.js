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

    if (_.isArray(this.props.style)){
      props.style.push({fontFamily: fontFamily});
    } else if (props.style) {
      props.style = [props.style, {fontFamily: fontFamily}];
    } else {
      props.style = {fontFamily: fontFamily};
    }

    this.props = props;

    return super.render();
  }
}


