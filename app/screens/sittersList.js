'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, View, Text, ListView, TouchableHighlight, Navigator, Image} from 'react-native';

var styles = require('../styles/sittersList');
var AddSitterOptionsScreen = require('./addSitterOptions');

import CustomText from '../components/customText';
import NavigationBar from 'react-native-navbar';
import GLOBAL from '../common/globals';
import User from '../common/user';
import SitterDetailsScreen from './sitterDetails';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import CustomButton from '../components/customButton';


class SittersList extends Component {
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
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters", {
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

  goToScreen(component){
      this.props.navigator.push({
      component: component
    })
  }

  
  renderRow(rowData) {
    console.log('rowData', rowData);
  	return (
      <TouchableHighlight 
             underlayColor="#ededed" 
             style={styles.row}
             onPress={() => this.goToSitterDetails(rowData)}>
      	<CustomText style={{ fontSize:18 }}>{rowData.firstName} {rowData.lastName}</CustomText>
      </TouchableHighlight>
      )
  }
  
  render() {
    var zeroSittersMessage = (
      <View>
        <CustomText style={styles.message}>Let us start by adding new sitters.</CustomText>
        <CustomButton
          type="small"
          label="ADD NEW SITTER"
          onPress={() => this.goToScreen(AddSitterOptionsScreen)}
        />
      </View>
    );
      
    return (
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={<BackArrow onPress={() => this.props.navigator.pop()}/>}
           />
          <View style={styles.introContainer}>
            <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={require('../images/bg/butterfly.png')} />
            <CustomText isHeading={true} style={styles.title}>Your sitters</CustomText>
          </View>
          {this.state.dataSource.getRowCount() < 1 ? zeroSittersMessage : <View/>}           

          <ListView
           enableEmptySections={true}
        	 dataSource={this.state.dataSource}
        	 renderRow={ this.renderRow } />


         <BottomIconBar navigator={this.props.navigator} />
      </View>
    )
  }
}

module.exports = SittersList;
