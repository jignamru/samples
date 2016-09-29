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
      backgroundColor: common.color.lightestBrown
    },
    back: {
        marginTop: 40,
        marginLeft: 20,
    },
    backIcon: {
        height: 21,
        width: 21
    },
    title: {
        fontSize: 40,
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 25,
        color: common.color.darkPurple
    },
    signup: {
        backgroundColor:  common.color.darkPurple,
        padding: 20,
        alignItems: 'center'
    },
    signin: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputIcon: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
    inputContainer: {
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: common.color.grey
    },
    checkbox: {
        fontFamily: common.fontFamily.base
    },
    whiteFont: {
      color: '#fff'
    }
})