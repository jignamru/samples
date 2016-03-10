'use strict';
var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Navigator
} = React;

var SignUpScreen = require('./signup');

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  signupClicked: function() {
    this.props.navigator.push({
      id: 'signup'
    })
  },
  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('../images/bg-12.png')} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={require('../images/icons/name.png')}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={require('../images/icons/password.png')}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Password"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <View style={styles.signin}>
                <Text style={styles.whiteFont}>Sign In</Text>
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={this.signupClicked}>
              <View style={styles.signup}>
                  <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
              </View>
            </TouchableHighlight>
        </View>
    );
  }
});

var styles = require('../styles/login');

module.exports = Login;

