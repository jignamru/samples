'use strict';
var React = require('react-native');
var { StyleSheet } = React;
var common = require('../common/styles');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

module.exports = StyleSheet.create({
	button: {
        padding:20, 
        alignItems: 'center',
        marginTop: 20
	},
	small: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        overflow:'hidden', 
        borderRadius:4, 
        alignSelf: 'center',
        width: windowSize.width / 1.5,
    },
    buttonActive: {
        backgroundColor:  common.color.orange,
    },
    buttonDisabled: {
        backgroundColor: common.color.lightGrey,
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
    }
})