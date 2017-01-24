import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableHighlight, View } from 'react-native';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';

var styles = require('../styles/customModal');


export default class CustomModal extends Component {
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

  componentWillReceiveProps(nextProps) { // used from the Terms & Condition modal
    if( (nextProps.visible == false) ||
        (nextProps.visible == true) ){
      this.setState({ modalVisible: nextProps.visible });
    }
  }

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    var button = (
      <CustomButton
        onPress={this.setModalVisible.bind(this)}
        type="small"
        label="OK"/>
    );

    return (
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}>
        <View style={styles.bg}>
          <View style={styles.container}>
            <CustomText style={styles.title}>{this.props.modalTitle}</CustomText>
            
            {this.props.children}

            {this.props.hideButton ? <View/> : button}

          </View>
        </View>
    </Modal>

    );
  }
}