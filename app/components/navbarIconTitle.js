import React from 'react-native';
const {
  Component,
  Image,
  Text,
  View
} = React;

export default class Title extends Component {
  render() {
    const icon = 'http://vignette3.wikia.nocookie.net/pokemon/images/1/16/025Pikachu_OS_anime_10.png/revision/20150102074354';
    return (
      <View style={{ flexDirection: 'row', }}>
        <Image
          source={{ uri: icon }}
          style={{ width: 20, height: 20, marginRight: 5, }}/>
      </View>
    );
  }
}