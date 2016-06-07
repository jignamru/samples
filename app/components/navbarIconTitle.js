import React from 'react-native';
const {
  Component,
  Image,
  Text,
  View
} = React;

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