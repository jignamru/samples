import React from 'react-native';
import _ from 'lodash';
var common = require('../common/styles');
var Button = require('react-native-button');

export default class CustomButton extends Button {
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


