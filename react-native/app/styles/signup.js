'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
    },
    signup: {
        padding: 20,
        alignItems: 'center',
        marginTop: 20
    },
    signupActive: {
        backgroundColor:  common.color.orange,
    },
    signupDisabled: {
        backgroundColor: common.color.lightGrey,
    },
    signupText: {
        fontSize: 18,
        fontWeight: '400',
    },
    signupTextActive: {
        color: '#fff'
    },
    signupTextDisabled: {
        color: '#DCD'
    },
    signin: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    inputIcon: {
        marginLeft: 15,
        width: 20,
        height: 20,
        alignSelf:'center'
    },
    input: {
        // fontSize: 14
    },
    errors: {
        color: 'red'
    },
    terms: {
        // fontSize: 14
    },
    greyFont: {
      color: common.color.grey
    },
    bold: {
        fontWeight: '500'
    }
})