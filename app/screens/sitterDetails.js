'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Navigator, Image} from 'react-native';

import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import CustomText from '../components/customText';

var styles = require('../styles/sitterDetails');
var GLOBAL = require('../common/globals');


class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    
    return (
      // todo: style, add "request sitter", "delete sitter" and "edit sitter"
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
          />

            <View style={styles.introContainer}>
                <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/ladybug.png')} />
                <CustomText isHeading={true} style={styles.title}>{this.props.sitter.firstName} {this.props.sitter.lastName}</CustomText>
            </View>

          <CustomText style={styles.sitterInfo}>
             Email: {this.props.sitter.emailAddress}
          </CustomText>
          <CustomText style={styles.sitterInfo}>
             phone: {this.props.sitter.phoneNumber}
          </CustomText>

          <View style={styles.iconsContainer}>
          <Image style={styles.icon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/bell-circle.png')} />
          <Image style={styles.icon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/edit-circle.png')} />
          <Image style={styles.icon} resizeMode={Image.resizeMode.contain} source={require('../images/icons/delete-circle.png')} />
          </View>
      </View>
    )
  }
}


module.exports = SitterDetails;
