import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomText from '../components/customText';

var styles = require('../styles/topBannerBox');


export default class CustomModal extends Component {
  render() {
  	var introContainerStyle = styles.introContainer;
  	var introBgStyle = styles.introBg;
  	var titleStyle = styles.title;

  	if(this.props.isTallBanner){
		introContainerStyle = [introContainerStyle, styles.tallBannerHeight];
		introBgStyle = [introBgStyle, styles.tallBannerHeight];
		titleStyle = styles.largeTitle;
  	} 

    return (
      <View style={introContainerStyle}>
        <Image style={introBgStyle} resizeMode={Image.resizeMode.cover} source={this.props.imageSource} />
        <CustomText isHeading={true} style={titleStyle}>{this.props.title}</CustomText>
      </View>
    );
  }
}