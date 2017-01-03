import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var User = require('../common/user');
var styles = require('../styles/bottomIconBar');
var SittersListScreen = require('../screens/sittersList');

const {
  Component,
} = React;

const {
  Image,
  TouchableHighlight,
  View
} = ReactNative;

export default class BottomIconBar extends Component {
    
  handleLogout(){
    User._logout().done();

    var LoginScreen = require('../screens/login'); // this line is needed here for lazy loading!
    
    this.props.navigator.push({
      component: LoginScreen
    });
  }  
 
  goToScreen(component){
      this.props.navigator.push({
      component: component
    })
  }

  render() {
    return (
              <View style={styles.footer}>
                <TouchableHighlight
                  onPress={this.goToSettings}>
                    <View style={[styles.logout, styles.footerItem]}>
                      <Icon style={styles.footerIcon} name='home' size={30} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => this.goToScreen(SittersListScreen)}>
                    <View style={[styles.logout, styles.footerItem]}>
                      <Icon style={styles.footerIcon} name='users' size={25} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.handleLogout}>
                      <View style={[styles.logout, styles.footerItem]}>
                      <Icon style={styles.footerIcon} name='sign-out' size={30} />
                    </View>
                </TouchableHighlight>
                  
              </View>
    );
  }
}