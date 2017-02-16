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
        alignItems: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth:1, 
        borderBottomColor: '#ddd'
    },
    sitterInfoText: {
        // fontSize: 16
    },
    icon: {
        alignSelf: 'center',
        color: common.color.darkPurple
    },
    buttonsRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
    },
    iconButton: {
        borderRadius: 60,
        width: 60
    }
})