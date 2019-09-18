import React from 'react';
import ReactNative from 'react-native';
const {
  Component,
} = React;

const {
  Image,
  Text,
  View,
} = ReactNative;

export default class Title extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', }}>
        <Image
          source={require('../images/icons/logo.png')}
          style={{ width: 20, height: 25, marginRight: 5, }}/>
      </View>
    );
  }
}