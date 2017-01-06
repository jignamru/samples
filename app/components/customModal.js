import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, View } from 'react-native';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';

var styles = require('../styles/customModal');


export default class CustomModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalVisible: true
      }
  }

  setModalVisible(visible) {
    console.log("modalVisible", this.state.modalVisible);
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}>
        <View style={styles.bg}>
          <View style={styles.container}>
            <CustomText style={styles.title}>{this.props.modalTitle}</CustomText>
            
            {this.props.children}

            <CustomButton
              onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
              type="small"
              label="OK"/>
          </View>
        </View>
    </Modal>

    );
  }
}