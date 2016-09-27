'use strict';
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

var GLOBAL = require('../common/globals');
var User = require('../common/user');
var styles = require('../styles/home');
var AddSitterScreen = require('./addSitter');
var SittersListScreen = require('./sittersList');
var RequestSitterScreen = require('./requestSitter');
var LoginScreen = require('./login');

import CustomButton from '../components/customButton';
import CustomText from '../components/customText';



class Home extends Component {
    constructor(props) {
      super(props);
      this.goToSettings = this.goToSettings.bind(this);
      this.goToScreen = this.goToScreen.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.state = {};
    }
  
	componentWillMount() {
		//TODO get user info?
	}
  
    goToScreen(component){
      this.props.navigator.push({
			component: component
		})
	}
    
	handleLogout(){
		User._logout().done();
		this.props.navigator.push({
			component: LoginScreen
		})
	}
	goToSettings(){
		// todo
	}
  
    render() {
	    return (
	        <View style={styles.container}>
	        	<View style={styles.introContainer}>
		            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
		            <CustomText style={styles.title}>Welcome!</CustomText>
		        </View>
		        <View style={styles.actionsContainer}>
		        	  <CustomButton
	    		      	containerStyle={[styles.buttonContainer, styles.requestSitterButtonContainer]}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={() => this.goToScreen(RequestSitterScreen)}
				      >
				        REQUEST A SITTER
				      </CustomButton>
		        	<CustomButton
	    		      	containerStyle={[styles.buttonContainer, styles.addSitterButtonContainer]}
				        style={styles.button}
				        styleDisabled={{color: 'red'}}
				        onPress={() => this.goToScreen(AddSitterScreen)}
				      >
				        ADD NEW SITTER
				      </CustomButton>
            	</View>
            	<View style={styles.footer}>
            		<TouchableHighlight
		              onPress={this.goToSettings}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <CustomText>SETTINGS</CustomText>
		              </View>
	            	</TouchableHighlight>
	            	<TouchableHighlight
//                     activeOpacity={75 / 100}
//                     underlayColor={"rgb(210,210,210)"}
		              onPress={() => this.goToScreen(SittersListScreen)}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <CustomText>SITTERS</CustomText>
		              </View>
	            	</TouchableHighlight>
            		<TouchableHighlight
		              onPress={this.handleLogout}>
		              <View style={[styles.logout, styles.footerItem]}>
		                  <CustomText>LOG OUT</CustomText>
		              </View>
	            	</TouchableHighlight>
                  
            	</View>
            </View>
	    )
	}
}


module.exports = Home;