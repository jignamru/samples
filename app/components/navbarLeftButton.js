import React from 'react';
import ReactNative from 'react-native';

const {
  Component,
} = React;

const {
  Image,
  TouchableOpacity,
} = ReactNative;

export default class BackArrow extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('../images/icons/left-arrow.png')}
          style={[{ width: 30, height: 30, marginLeft: 5, marginTop:10 }, this.props.style]}/>
      </TouchableOpacity>
    );
  }
}