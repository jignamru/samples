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
    inputIcon: {
        marginLeft: 20,
        alignSelf:'center',
        width: 20,
        height: 20
    },
    errors: {
        color: 'red'
    },

})