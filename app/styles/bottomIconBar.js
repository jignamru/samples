'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    footer: {
        width: windowSize.width,
        height: 60,
        flexDirection: 'row',
        backgroundColor: common.color.blue,
        position: 'absolute',
        bottom: 0,
        left: 0,
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