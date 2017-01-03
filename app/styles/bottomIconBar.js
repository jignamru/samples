'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    footer: {
        flex: 0.18,
        flexDirection: 'row',
        backgroundColor: common.color.blue,
    },
    footerItem: {
        flex: 1,
        alignSelf:'center',
    },
    footerIcon: {
        color: 'white',
        alignSelf:'center',
    }
})