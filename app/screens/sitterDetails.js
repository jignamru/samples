'use strict';
import React, { 
  Component, 
  View, 
  Text,
  TouchableHighlight,
  Navigator
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';

class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.props.navigator.pop()
    };
    
    return (
      <View>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={leftButtonConfig} />
          <Text 
            style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}
             >YOU MADE IT with name: {this.props.sitter.firstName} {this.props.sitter.lastName} and id: {this.props.sitter.id}!</Text>
      </View>
    )
  }
}


module.exports = SitterDetails;
