import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
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
        <CustomModal modalTitle='Terms & Conditions ("Terms")' hideButton={true} visible={this.state.modalVisible}>
          <ScrollView>
              <CustomText style={styles.container}>
Last updated: Jan 24th, 2017
{'\n\n'}
Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Sitter Done mobile application (the "Service") operated by Karmagiri LLC ("us", "we", or “our").
{'\n\n'}
Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
{'\n\n'}
By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
{'\n\n'}
Subscriptions
{'\n\n'}
Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in
advance on a recurring ...
{'\n\n'}
Content
{'\n\n'}
Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …
{'\n\n'}
Links To Other Web Sites
{'\n\n'}
Our Service may contain links to third-party web sites or services that are not owned or controlled by Karmagiri LLC.
{'\n\n'}
Karmagiri LLC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Karmagiri LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
{'\n\n'}
Changes
{'\n\n'}
We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
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