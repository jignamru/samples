'use strict';
var GLOBAL = require('../common/globals');
var User = require('../common/user');

import React, { 
  Component, 
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator
} from 'react-native';

class RequestSitter extends Component{

  constructor(props) {
      super(props);
      this.state = {
//         username: null,
//         password: null
      }
  }

  componentWillMount() {
//     AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((value) => {
//       if( value != null) {
//         console.log('User logged in. UserId: ' + value);
//         this.props.navigator.push({
//           component: HomeScreen
//         })
//       }
//     }).done();
  }


  

  render() {
    return (
        <View>
        <Text>HOOOOLLLLLLAAA!</Text>
        </View>
    )
  }
}

// var styles = require('../styles/login');

module.exports = RequestSitter;
