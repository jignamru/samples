import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, View } from 'react-native';
import CustomText from '../components/customText';

var styles = require('../styles/customModal');


export default class CustomModal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal transparent={true}>
        <View style={styles.bg}>
          <View style={styles.container}>
            <CustomText style={styles.title}>{this.props.modalTitle}</CustomText>
            
            {this.props.children}

            <TouchableHighlight
              onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
              <CustomText style={styles.close}>Close</CustomText>
            </TouchableHighlight>
          </View>
        </View>
    </Modal>

    );
  }
}