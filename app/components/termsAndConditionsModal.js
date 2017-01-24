import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import CustomText from '../components/customText';
import CustomButton from '../components/customButton';
import CustomModal from '../components/customModal';

var styles = require('../styles/termsAndConditionModal');


export default class TermsAndConditions extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalVisible: true
      }
  }

  toggleModal(){
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render() {
    return (
        <CustomModal modalTitle="Terms & Conditions" hideButton={true} visible={this.state.modalVisible}>
          <ScrollView>
              <CustomText style={styles.container}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur quis sem nec tincidunt. Vestibulum porttitor libero nec ipsum porta molestie. Maecenas purus augue, eleifend luctus nisi ut, auctor congue purus. Pellentesque quis arcu quis libero bibendum placerat. Etiam pharetra viverra risus, eget sodales mi ornare ac. Nunc eu nibh tellus. Nullam id faucibus erat. Nulla magna mauris, varius et maximus vitae, venenatis sit amet justo. Pellentesque a nisi tempor, commodo magna et, interdum nibh. Quisque non varius neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

      Quisque sodales eleifend massa, non dignissim justo condimentum sit amet. Cras quis gravida dolor. Fusce id consequat felis. Proin condimentum ligula eros. Donec eu posuere turpis. In eget urna et mi pretium mattis nec vel tortor. Integer sagittis ac libero nec cursus. Cras dapibus congue tortor, sit amet volutpat lorem efficitur id. Praesent condimentum egestas magna a egestas. Nunc commodo pellentesque quam, in ultricies massa varius eu. Mauris vel mauris ac neque commodo mollis.

      Duis cursus leo ante, nec scelerisque ante euismod id. Cras fermentum ultricies orci at venenatis. Morbi consequat ultrices urna sed congue. Suspendisse potenti. Nunc in lacus eu libero gravida porta nec vitae nunc. Nam ut tincidunt augue. Aenean lacinia erat sit amet orci scelerisque dictum. Sed vel arcu id purus consectetur sagittis. Duis aliquam laoreet neque ut pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tempor quis arcu blandit varius. Duis ac erat varius, elementum eros scelerisque, lacinia erat. Nullam et velit venenatis risus finibus scelerisque sit amet in turpis.

      Praesent tincidunt sed dolor at iaculis. Aenean elementum, dolor nec varius pulvinar, nibh risus semper magna, sit amet faucibus mi massa eu eros. Nam mollis sem magna, id ornare sem congue sed. Curabitur vel odio justo. Fusce porttitor iaculis diam ut ornare. Mauris ut dui ligula. Sed pulvinar mattis cursus. Curabitur volutpat convallis magna, eget hendrerit sapien imperdiet sit amet. Maecenas vestibulum ante at urna scelerisque, nec pharetra orci bibendum. Duis aliquet ante eu euismod condimentum.

              </CustomText>
              <CustomButton
                onPress={this.toggleModal.bind(this)}
                type="small"
                label="OK"/>
          </ScrollView>
        </CustomModal>
    );
  }
}