'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1
    },
    introContainer: {
        backgroundColor: 'transparent',
        width: windowSize.width,
        height: windowSize.height * 0.2,
        justifyContent: 'center'
    },
    introBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height * 0.2
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: common.color.darkPurple
    },
    inputIcon: {
        marginLeft: 15,
        width: 20,
        height: 20,
        alignSelf: 'center',
        color: common.color.darkPurple
    },
    input: {
        fontSize: 14
    },
    iconRight: {
        position: 'absolute',
        right: 0,
        top: 10,
        color: common.color.grey
    },
    button: {
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
        width: windowSize.width
    },
    buttonActive: {
        backgroundColor:  common.color.orange,
    },
    buttonDisabled: {
        backgroundColor:  common.color.lightGrey,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400',
    },
    buttonTextActive: {
        color: '#fff'
    },
    buttonTextDisabled: {
        color: '#DCD'
    },
    pickerFieldValue: {
        fontFamily: common.fontFamily.base,
        color: 'black'        
    },
    pickerFieldOptions: {
        
    },
    errors: {
        color: 'red'
    },

})