import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../components/customText';

var User = require('../common/user');
var styles = require('../styles/bottomIconBar');
var SittersListScreen = require('../screens/sittersList');

export default class BottomIconBar extends Component {
    
  handleLogout(){
    User._logout().done();

    var LoginScreen = require('../screens/login'); // this line is needed here for lazy loading!
    
    this.goToScreen(LoginScreen);
  }  

  goHome(){
    var HomeScreen = require('../screens/home'); // this line is needed here for lazy loading!
    this.goToScreen(HomeScreen);
  }

  goToScreen(component){
      this.props.navigator.push({
      component: component
    })
  }

  render() {
    var homeIcon = (
      <TouchableHighlight
        style={styles.footerItem}
        onPress={this.goHome.bind(this)}>
          <View>
            <Icon style={styles.footerIcon} name='home' size={30} />
            <CustomText style={styles.footerIconText}>HOME</CustomText>
          </View>
      </TouchableHighlight>
    );

    var sittersListIcon = (
      <TouchableHighlight
        style={styles.footerItem}
        onPress={() => this.goToScreen(SittersListScreen)}>
          <View>
            <Icon style={[styles.footerIcon, styles.footerIconSitters]} name='users' size={25} />
            <CustomText style={styles.footerIconText}>SITTERS</CustomText>
          </View>
      </TouchableHighlight>
    );

    return (
              <View style={styles.footer}>
                { this.props.hideHomeIcon ? <View/> : homeIcon }                
                { this.props.hideSittersListIcon ? <View/> : sittersListIcon } 
                <TouchableHighlight
                  style={styles.footerItem}
                  onPress={this.handleLogout.bind(this)}>
                      <View>
                      <Icon style={styles.footerIcon} name='sign-out' size={30} />
                      <CustomText style={styles.footerIconText}>SIGN OUT</CustomText>
                    </View>
                </TouchableHighlight>
                  
              </View>
    );
  }
}