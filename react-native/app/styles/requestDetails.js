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
    section: {
        padding:20,
        borderBottomWidth:1, 
        borderBottomColor: '#ddd'
    },
    row: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        // fontSize: 16,
        fontWeight: '400',
    },
    textShort: {
        justifyContent: 'flex-end',
    },
    textLong: {
        paddingTop: 10
    },
    success: {
        color: 'green',
        fontWeight: '600',
    }
})