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
      backgroundColor: 'transparent'
    },
    introContainer: {
		backgroundColor: 'transparent',
    	justifyContent: 'center',
        alignItems: 'center',
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
	    letterSpacing: 1,
        color: common.color.grey
    },
    actionsContainer: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center'
    },
    box: {
        flex: 1,
    	width: windowSize.width,
    	paddingTop: 40,
    	paddingBottom: 60
    },
    buttonContainer: {
        padding:20, 
        height:65, 
        overflow:'hidden', 
        borderRadius:4, 
        width: windowSize.width / 1.5,
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        fontSize: 20,
        color: '#fff'
    },
    addSitterButtonContainer: {
        backgroundColor: common.color.darkPurple
    },
    requestSitterButtonContainer: {
        backgroundColor: common.color.teal
    },
    boxLabel: {
    	fontSize: 25,
    	textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: common.color.orange,
        height: 80,
        paddingTop: 30
    },
    footerItem: {
        width: windowSize.width / 3,
        alignItems: 'center',
    },
    whiteFont: {
      color: '#fff'
    }
})