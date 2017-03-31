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
    messageContainer: {
        margin: 10,
        alignItems: 'center',
        padding: 20,
        backgroundColor: common.color.lightGrey,
        borderRadius: 5,
        width: windowSize.width * 0.9
    },
    message: {
        fontSize: 18,
    },
    bold: {
        fontWeight: "400"
    },
    actionsContainer: {
    	flex: 1,
    	alignItems: 'center'
    }
})