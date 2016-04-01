'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    title: {
    	justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
	    fontSize: 20,
	    fontWeight: 'bold'
    },
    whiteFont: {
      color: '#fff'
    }
})