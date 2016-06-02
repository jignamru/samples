'use strict';
import React, { 
  Component, 
  View, 
  Text,
  TouchableHighlight,
  Navigator
} from 'react-native';

class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View>
          <Text 
            style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}
             >YOU MADE IT with id: {this.props.sitter.id}!</Text>
      </View>
    )
  }
}


module.exports = SitterDetails;
