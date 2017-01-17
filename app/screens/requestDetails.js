'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Navigator, Image, Alert, AsyncStorage} from 'react-native';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import StatusMessages from '../common/statusMessages';
import DateFunctions from '../common/dateFunctions';

var styles = require('../styles/requestDetails');
var GLOBAL = require('../common/globals');


class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {}
    }
  }

  componentWillMount() {
    var details = this.props.requestDetails;
    if(details){
      var data = {
        startDateTime: moment(details.startDatetime),
        endDateTime: moment(details.endDatetime),
        parentNotes: details.parentUserNotes,
        status: details.status,
        type: details.type,
        sitters: details.requestSitters
      }
      this.setState({details : data});
      console.log(data);
    }
  }

  confirmDelete(){
    Alert.alert(
                'Please Confirm',
                'Are you sure you want to delete ' + this.props.sitter.firstName + ' ' + this.props.sitter.lastName + '?',
                [
                  { 
                    text: 'Yes', 
                    onPress: () => this.handleDeleteRequest()
                  },
                  {
                    text: 'No'
                  }
                ]
              );
  }

  handleDeleteRequest(){
    // AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
    //   fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/" + this.props.sitter.id, {
    //       method: "DELETE",
    //       headers: {
    //         'Accept': 'application/json',
    //       }
    //     })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       console.log('Response:',responseJson);
    //       if(responseJson.errorCode) {
    //         Alert.alert('Uh oh!', "Something went wrong. Try again later?");
    //         console.warn(responseJson.message);
    //       } else {
    //         var SittersListScreen = require('./sittersList'); // need this here for lazy loading
    //         Alert.alert(
    //           'All done!',
    //           this.props.sitter.firstName + ' ' + this.props.sitter.lastName + " has been deleted",
    //           [
    //             {
    //               text: 'OK', 
    //               onPress: () => this.props.navigator.push({ component: SittersListScreen })
    //             }
    //           ]
    //         )
    //       }
    //     })
    //     .catch((error) => {
    //       console.warn(error);
    //     });
    //   }).done();
  }


  render() {
    var parentNotes = (
      <View style={styles.section}>
        <CustomText style={styles.label}>Note for sitter:</CustomText>
        <CustomText style={styles.textLong}>{this.state.details.parentNotes}</CustomText>
      </View>
    );

    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
          />

            <View style={styles.introContainer}>
                <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/ladybug.png')} />
                <CustomText isHeading={true} style={styles.title}>Request details</CustomText>
            </View>

          <View style={[styles.section,styles.row]}>
            <CustomText style={styles.label}>Status:</CustomText>
            <CustomText style={styles.textShort}>{StatusMessages.request.status[this.state.details.status]}</CustomText>
          </View>
          <View style={[styles.section,styles.row]}>
            <CustomText style={styles.label}>Start date and time:</CustomText>
            <CustomText style={styles.textShort}>{DateFunctions.formatDate(this.state.details.startDateTime)}</CustomText>
          </View>
          <View style={[styles.section,styles.row]}>
            <CustomText style={styles.label}>End date and time:</CustomText>
            <CustomText style={styles.textShort}>{DateFunctions.formatDate(this.state.details.endDateTime)}</CustomText>
          </View>
          {this.state.details.parentNotes ? parentNotes : <View/>}
          <View style={styles.section}>
            <CustomText style={styles.label}>Request type:</CustomText>
            <CustomText style={styles.textLong}>{StatusMessages.request.type[this.state.details.type]}</CustomText>
          </View>
      </View>
    )
  }
}


module.exports = SitterDetails;
