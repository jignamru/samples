'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var GLOBAL = require('../common/globals');
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
    // menu: {
    // 	height: 50,
    // 	width: 50
    // },
    title: {
	    fontSize: 40,
	    fontWeight: 'bold',
	    letterSpacing: 1,
        color: GLOBAL.COLOR.GREY
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
    requestSitterBox: {
        backgroundColor: GLOBAL.COLOR.TEAL
    },
    addSitterBox: {
    	backgroundColor: GLOBAL.COLOR.DARK_PURPLE
    },
    boxLabel: {
    	fontSize: 25,
    	textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: GLOBAL.COLOR.LIGHT_GREEN,
        height: 40,
        paddingTop: 10
    },
    footerItem: {
        width: windowSize.width / 2,
        alignItems: 'center',
    },
    whiteFont: {
      color: '#fff'
    }
})