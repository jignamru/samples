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
        color: common.color.darkPurple
    },
    sitterInfo: { 
        height:40,
        fontSize: 16,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingLeft: 30,
        paddingTop: 10
    },
    iconsContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 80,
        paddingTop: 10,
        marginLeft: 20
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    }
})