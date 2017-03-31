'use strict';
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Navigator, Image, Alert, AsyncStorage, ScrollView} from 'react-native';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import StatusMessages from '../common/statusMessages';
import DateFunctions from '../common/dateFunctions';
import ActivityIndicatorModal from '../components/activityIndicatorModal';
import TopBannerBox from '../components/topBannerBox';


var styles = require('../styles/requestDetails');
var GLOBAL = require('../common/globals');


class SitterDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      showSpinner: false
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
        sitters: details.requestSitters,
        requestId: details.id,
      }

      if(details.bookedSitter){
        data.sitterFullname = details.bookedSitter.firstName + ' ' + details.bookedSitter.lastName;
      }

      this.setState({details : data});
    }
  }

  confirmCancel(){
    this.setState( { showSpinner: true } );
    Alert.alert(
                'Please Confirm',
                'Are you sure you want to cancel this request?',
                [
                  { 
                    text: 'Yes', 
                    onPress: () => { this.handleCancelRequest() }
                  },
                  {
                    text: 'No', 
                    onPress: () => { this.setState( { showSpinner: false } ); }
                  }
                ]
              )
  }

  handleCancelRequest(){
    var data = JSON.stringify({
      cancellationReason: '' // todo: at a reason text field at some point?
    });

    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters/schedule/" + this.state.details.requestId + "/cancel", {
          method: "POST",
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('Response:',responseJson);
          if(responseJson.errorCode) {
            Alert.alert('Uh oh!', "Something went wrong. Try again later?");
            console.warn(responseJson.message);
          } else {
            var OpenRequestsListScreen = require('./openRequestsList'); // need this here for lazy loading
            Alert.alert(
              'All done!',
              "This request has been canceled.",
              [
                {
                  text: 'OK', 
                  onPress: () => this.props.navigator.push({ component: OpenRequestsListScreen })
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

  getStatusMessage(){
    var status = this.state.details.status;
    var message = StatusMessages.request.status[status];
    var statusStyles = [styles.textShort];

    if(status == 'BOOKED'){
      message += ' ' + this.state.details.sitterFullname + " has got you covered!";
      statusStyles.push(styles.success);
    } 

    return (
      <CustomText style={statusStyles}>{message}</CustomText>
    );
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

          <TopBannerBox
            imageSource={require('../images/bg/wine.jpg')}
            title="Request details"
          />

            <ScrollView>
              <View style={[styles.section,styles.row]}>
                <CustomText style={styles.label}>Status:</CustomText>
                {this.getStatusMessage()}
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
              <CustomButton
                type="small"
                onPress={() => this.confirmCancel()}
                showSpinner={this.state.showSpinner}
                label="CANCEL REQUEST"/>
              </ScrollView>

            <BottomIconBar navigator={this.props.navigator}/>
      </View>
    )
  }
}


module.exports = SitterDetails;
