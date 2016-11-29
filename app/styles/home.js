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
        paddingTop:20, 
        paddingBottom:20, 
        height:60, 
        overflow:'hidden', 
        borderRadius:4, 
        width: windowSize.width / 1.5,
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: common.color.orange
    },
    button: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    },
    boxLabel: {
    	fontSize: 25,
    	textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: common.color.blue,
        height: 60,
        paddingTop: 10
    },
    footerItem: {
        width: windowSize.width / 3,
        alignItems: 'center',
    },
    footerIcon: {
        width: 40,
        height: 40
    },
    whiteFont: {
      color: '#fff'
    }
})