import React from 'react';
import ReactNative from 'react-native';
import _ from 'lodash';
import {InputField} from 'react-native-form-generator';
var common = require('../common/styles');

export default class CustomTextInput extends InputField {
  render() {
	var props = _.clone(this.props);

    if (_.isArray(this.props.style)){
      props.style.push({fontFamily: common.fontFamily.base});
    } else if (props.style) {
      props.style = [props.style, {fontFamily: common.fontFamily.base}];
    } else {
      props.style = {fontFamily: common.fontFamily.base};
    }

    this.props = props;

    return super.render();
  }
}


