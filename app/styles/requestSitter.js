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
    introContainer: {
        backgroundColor: 'transparent',
        width: windowSize.width,
        height: windowSize.height * 0.2,
        justifyContent: 'center'
    },
    introBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height * 0.2
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: 'white'
    },
    placeholderStyle: {
        alignSelf: 'center',
        fontFamily: common.fontFamily.base
    },
    valueStyle: {
        color: 'black',
        alignSelf: 'center',
        fontFamily: common.fontFamily.base
    },
    urgent: {
        fontWeight: "300"
    },
    urgentHelpText: {
        fontSize: 13,
        fontStyle: 'italic',
        margin: 10,
        color: common.color.grey
    },
    error: {
        color: 'red',
        margin: 20
    }
})