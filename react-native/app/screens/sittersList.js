'use strict';
import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, View, Text, SectionList,TouchableHighlight, Navigator, Image} from 'react-native';
import _ from 'lodash';
import CustomText from '../components/customText';
import NavigationBar from 'react-native-navbar';
import GLOBAL from '../common/globals';
import User from '../common/user';
import SitterDetailsScreen from './sitterDetails';
import IconTitle from '../components/navbarIconTitle';
import BackArrow from '../components/navbarLeftButton';
import BottomIconBar from '../components/bottomIconBar';
import CustomButton from '../components/customButton';
import TopBannerBox from '../components/topBannerBox';
import Icon from 'react-native-vector-icons/FontAwesome';

var styles = require('../styles/sittersList');
var AddSitterOptionsScreen = require('./addSitterOptions');


class SittersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections : []
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
        this.filterData(responseJson);
      })
    }).done();
  }

  filterData(data){
    var sections = {};


    for (var i = 0; i < data.length; i++) {
      var type = data[i].type;
      var item = { data: data[i] , key: type + i};

      if( sections[type] ){
        sections[type].data.push(item);
      } else {
        sections[type] = { key: type, data: [item]};
      }
    };

    this.setState({
        sections : _.toArray(sections)
    });
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
    var unverifiedText = '';
    var rowLabel = rowData.firstName + ' ' + rowData.lastName;

    if( rowData.isVerified ){
      unverifiedText = (
        <CustomText style={styles.unverified}>(waiting for verification)</CustomText>
      );
    }

  	return (
      <TouchableHighlight 
        underlayColor="#ededed"
        onPress={() => this.goToSitterDetails(rowData)}>
          <View style={styles.row}>
          	<CustomText style={styles.rowText}>{rowLabel} {unverifiedText}</CustomText>
            <Icon name="angle-right" style={styles.iconRight} color="#ccc" />          
          </View>
      </TouchableHighlight>
      )
  }

  renderSectionHeader(section) {
    return (
      <CustomText style={styles.sectionHeader}>{_.capitalize(section.key)} sitter</CustomText>
    );
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

          <TopBannerBox
            imageSource={require('../images/bg/dogOnPier.jpg')}
            title="Your sitters"
          /> 
          {this.state.sections.length < 1 ? zeroSittersMessage : <View/>} 

          <SectionList
            renderItem={({item}) => this.renderRow(item.data)}
            renderSectionHeader={({section}) => this.renderSectionHeader(section)}
            sections={this.state.sections}
          />


         <BottomIconBar navigator={this.props.navigator} hideSittersListIcon={true}/>
      </View>
    )
  }
}

module.exports = SittersList;
