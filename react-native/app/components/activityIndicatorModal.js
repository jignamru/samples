import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import CustomText from '../components/customText';

var styles = require('../styles/activityIndicatorModal');

export default class activityIndicatorModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalVisible: ''
      }
  }

  componentWillMount(){
    var visible = this.props.visible ? this.props.visible : true;
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal
          visible={this.state.modalVisible}>
          <View style={styles.container}>
            <ActivityIndicator 
              style={styles.activityIndicator} 
              size="large"
              color="#50D2C2"/>
            <CustomText style={styles.activityLabel}>working on it...</CustomText>
        </View>
    </Modal>
    );
  }
}