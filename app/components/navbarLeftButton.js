import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var common = require('../common/styles');

const {
  Component,
} = React;

const {
  View,
  TouchableHighlight,
} = ReactNative;

export default class BackArrow extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}>
          <View>
            <Icon name='angle-left' size={30} style={{marginLeft: 5, marginTop:10, color: common.color.grey}}/>
          </View>
      </TouchableHighlight>
    );
  }
}