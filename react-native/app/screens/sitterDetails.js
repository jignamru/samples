'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Navigator, Image, Alert, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import EditSitterScreen from './editSitter';
import TopBannerBox from '../components/topBannerBox';

var styles = require('../styles/sitterDetails');
var GLOBAL = require('../common/globals');


class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
    }
  }

  confirmDelete(){
    this.setState( { showSpinner: true } );  
    Alert.alert(
                'Please Confirm',
                'Are you sure you want to delete ' + this.props.sitter.firstName + ' ' + this.props.sitter.lastName + '?',
                [
                  { 
                    text: 'Yes', 
                    onPress: () => this.handleDeleteSitter()
                  },
                  {
                    text: 'No', 
                    onPress: () => this.setState( { showSpinner: false } )
                  }
                ]
              );
  }

  handleDeleteSitter(){
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/" + this.props.sitter.id, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.errorCode) {
            this.setState( { showSpinner: false } ); 
            Alert.alert('Uh oh!', "Something went wrong. Try again later?");
            console.warn(responseJson.message);
          } else {
            var SittersListScreen = require('./sittersList'); // need this here for lazy loading
            Alert.alert(
              'All done!',
              this.props.sitter.firstName + ' ' + this.props.sitter.lastName + " has been deleted",
              [
                {
                  text: 'OK', 
                  onPress: () => this.props.navigator.push({ component: SittersListScreen })
                }
              ]
            )
          }
        })
        .catch((error) => {
          console.warn(error);
        });
      }).done();
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

  goToEditSitter(sitterData){
    this.props.navigator.push({
      component: EditSitterScreen, 
      passProps: {
        sitter: sitterData
      }
    })
  }

  getSitterTypeLabel(){
    var sitterType = this.props.sitter.type.toLowerCase();

    if(sitterType == 'other') {
      sitterType = this.props.sitter.typeDescription ? this.props.sitter.typeDescription : "sitter";
    } else {
      sitterType += " sitter";
    }
    
    return sitterType;    
  }

  render() {
    var userNotes = (
      <View style={styles.sitterInfo}>
        <CustomText style={styles.sitterInfoText}><Icon name="pencil-square-o" size={15} style={styles.icon} />   {this.props.sitter.userNotes}</CustomText>
      </View>
    );

    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
          />

        <TopBannerBox
          imageSource={require('../images/bg/kidWriting.jpg')}
          title={this.props.sitter.firstName + ' ' + this.props.sitter.lastName}
        />

        <View style={styles.sitterInfo}>
           <CustomText style={styles.sitterInfoText}><Icon name="handshake-o" size={15} style={styles.icon} />   {this.getSitterTypeLabel()}</CustomText>
        </View>
        
        { this.props.sitter.userNotes ? userNotes : <View/> }

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
            onPress={() => this.goToEditSitter(this.props.sitter)}
            label={<Icon name="pencil" size={20} color="white"/>}/>

          <CustomButton
            type="small"
            buttonStyle={styles.iconButton}
            containerStyle={styles.iconButtonContainer}
            showSpinner={this.state.showSpinner}
            onPress={this.confirmDelete.bind(this)}
            label={<Icon name="trash" size={20} color="white"/>}/>
        </View>

        <BottomIconBar navigator={this.props.navigator}/>
      </View>
    )
  }
}


module.exports = SitterDetails;
