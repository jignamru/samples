'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, View, Text, ListView, TouchableHighlight, Navigator, Image} from 'react-native';

var styles = require('../styles/sittersList');

import CustomText from '../components/customText';
import NavigationBar from 'react-native-navbar';
import GLOBAL from '../common/globals';
import User from '../common/user';
import SitterDetailsScreen from './sitterDetails';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';

class OpenRequestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
    this.goToSitterDetails = this.goToSitterDetails.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData(){
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/openRequests", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(responseJson),
        });
      })
    }).done();
  }
  
  goToSitterDetails(sitterData){
    this.props.navigator.push({
      component: SitterDetailsScreen, 
      passProps: {
      	sitter: sitterData
      }
    })
  }
  
  renderRow(rowData) {
  	return (
      <TouchableHighlight 
             underlayColor="#ededed" 
             style={styles.row}
             onPress={() => this.goToSitterDetails(rowData)}>
      	<CustomText style={{ fontSize:16 }}>{rowData.formattedDate} at {rowData.formattedStartTime} 
          <CustomText style={{ fontSize:12 }}> (status: {rowData.status})</CustomText>
        </CustomText>
        
      </TouchableHighlight>
      )
  }
  
  render() {      
    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
           />
          <View style={styles.introContainer}>
            <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/butterfly.png')} />
            <CustomText isHeading={true} style={styles.title}>Your Open Requests</CustomText>
          </View>
        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this.renderRow } />
         
        <BottomIconBar navigator={this.props.navigator} />
      </View>

    )
  }
}

module.exports = OpenRequestsList;
