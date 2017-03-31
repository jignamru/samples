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