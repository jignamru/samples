import React from 'react';
import ReactNative from 'react-native';

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
  
  goToScreen(component){
      this.props.navigator.push({
      component: component
    })
  }
    
  handleLogout(){
    User._logout().done();

    var LoginScreen = require('../screens/login'); // this line is needed here for lazy loading!
    this.goToScreen(LoginScreen);
  }

  render() {
    return (
              <View style={styles.footer}>
                <TouchableHighlight
                  onPress={this.goToSettings}>
                    <View style={[styles.logout, styles.footerItem]}>
                      <Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/settings.png')} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => this.goToScreen(SittersListScreen)}>
                    <View style={[styles.logout, styles.footerItem]}>
                        <Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/people.png')} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.handleLogout}>
                      <View style={[styles.logout, styles.footerItem]}>
                          <Image style={styles.footerIcon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/logout.png')} />
                    </View>
                </TouchableHighlight>
                  
              </View>
    );
  }
}