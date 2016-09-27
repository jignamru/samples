'use strict';
import React, { 
  Component, 
  View, 
  Text,
  TouchableHighlight,
  Navigator,
  Image
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import CustomText from '../components/customText';

var styles = require('../styles/sitterDetails');

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
      // todo: style, add "request sitter", "delete sitter" and "edit sitter"
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={leftButtonConfig} />
            <View style={styles.introContainer}>
                <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
                <CustomText style={styles.title}>Sitter Details</CustomText>
            </View>

          <CustomText style={styles.sitterInfo}>
             Name: {this.props.sitter.firstName} {this.props.sitter.lastName} 
          </CustomText>
          <CustomText style={styles.sitterInfo}>
             ID: {this.props.sitter.id}
          </CustomText>
      </View>
    )
  }
}


module.exports = SitterDetails;
