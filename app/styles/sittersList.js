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
    message: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 30,
        alignSelf: 'center'
    },
    row: { 
        height:60, 
        borderBottomWidth:1, 
        borderBottomColor: '#ddd', 
        flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    unverified: {
        fontSize: 14,
        fontStyle: 'italic'
    }
})