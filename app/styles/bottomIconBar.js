'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
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
    }
})