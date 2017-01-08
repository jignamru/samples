'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Navigator, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';

var styles = require('../styles/sitterDetails');
var GLOBAL = require('../common/globals');


class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  getPriorityLabel(order){
    var label;

    switch(order){
      case 10:
        label = 'High priority';
        break;
      case 5: 
        label = 'Medium priority';
        break;
      case 1:
        label = 'Low priority';
        break;
    }

    return label;
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

          <View style={styles.sitterInfo}>
             <CustomText style={styles.sitterInfoText}><Icon name="at" size={15} style={styles.icon} />   {this.props.sitter.emailAddress}</CustomText>
          </View>
          <View style={styles.sitterInfo}>
             <CustomText style={styles.sitterInfoText}><Icon name="mobile" size={25} style={styles.icon} />   {this.props.sitter.phoneNumber}</CustomText>
          </View>
          <View style={styles.sitterInfo}>
             <CustomText style={styles.sitterInfoText}><Icon name="heart-o" size={15} style={styles.icon} />   {this.getPriorityLabel(this.props.sitter.priorityOrder)}</CustomText>
          </View>

          <View style={styles.buttonsRow}>
            <CustomButton
              type="small"
              buttonStyle={styles.iconButton}
              containerStyle={styles.iconButtonContainer}
              // onPress={this.goToEditSitter.bind(this)}
              label={<Icon name="pencil" size={20} color="white"/>}/>

            <CustomButton
              type="small"
              buttonStyle={styles.iconButton}
              containerStyle={styles.iconButtonContainer}
              // onPress={this.handleDeleteSitter.bind(this)}
              label={<Icon name="trash" size={20} color="white"/>}/>
          </View>
      </View>
    )
  }
}


module.exports = SitterDetails;
