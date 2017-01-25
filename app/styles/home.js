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
    introContainer: {
		backgroundColor: 'transparent',
    	justifyContent: 'center',
        width: windowSize.width,
        height: windowSize.height * 0.4,
    },
    introBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height * 0.4
    },
    title: {
	    fontSize: 40,
	    fontWeight: 'bold',
        color: common.color.darkPurple,
        marginLeft: 30
    },
    messageContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    message: {
        fontSize: 25,
        marginBottom: 40
    },
    actionsContainer: {
    	flex: 1,
    	alignItems: 'center'
    }
})