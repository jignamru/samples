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
    introText: {
        padding: 30,
        alignSelf:'center'
    },
    buttonsBox: {
        marginTop: 10
    },
    buttonRow: {
        alignItems: 'center'
    }
})