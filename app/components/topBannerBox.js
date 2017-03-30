import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomText from '../components/customText';

var styles = require('../styles/topBannerBox');


export default class CustomModal extends Component {
  render() {
    return (
      <View style={styles.introContainer}>
        <Image style={styles.introBg} resizeMode={Image.resizeMode.cover} source={this.props.imageSource} />
        <CustomText isHeading={true} style={styles.title}>{this.props.title}</CustomText>
      </View>
    );
  }
}