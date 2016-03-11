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

var SignUp = React.createClass({
  getInitialState: function() {
    return {
      // todo
    }
  },
  handleSignup: function() {
    // to do: API hookup
  },
  goBack: function() {
    this.props.navigator.pop();
  },
  render: function() {
    return (
    	<View style={styles.container}>
            <Image style={styles.bg} source={require('../images/bg-11.png')} />
            <TouchableHighlight
              onPress={this.goBack}>
              <View style={styles.back}>
                    <Image style={styles.backIcon} source={require('../images/icons/back.png')} />
              </View>
            </TouchableHighlight>

    		<Text style={[styles.title, styles.whiteFont]}>Sign Up</Text>
	    	<View style={styles.inputs}>
	            <View style={styles.inputContainer}>
	                <Image style={styles.inputName} source={require('../images/icons/name.png')}/>
	                <TextInput 
	                    style={[styles.input, styles.whiteFont]}
	                    placeholder="First and last name"
	                    placeholderTextColor="#FFF"
	                    value={this.state.fullname}
	                />
	            </View>
	            <View style={styles.inputContainer}>
	                <Image style={styles.inputEmail} source={require('../images/icons/email.png')}/>
	                <TextInput 
	                    style={[styles.input, styles.whiteFont]}
	                    placeholder="Email"
	                    placeholderTextColor="#FFF"
	                    value={this.state.email}
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
	    	</View>
	    	<TouchableHighlight
              style={styles.button}
              onPress={this.handleSignup}>
	            <View style={styles.signup}>
	                <Text style={styles.whiteFont}>Done</Text>
	            </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={this.goBack}>
              <View style={styles.signin}>
                  <Text style={styles.greyFont}>Already signed up?<Text style={styles.whiteFont}>  Sign In</Text></Text>
              </View>
            </TouchableHighlight>

	    </View>

    )
}
});
var styles = require('../styles/signup');
module.exports = SignUp;