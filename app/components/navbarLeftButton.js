import React from 'react-native';
const {
  Component,
  Image,
  TouchableOpacity
} = React;

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