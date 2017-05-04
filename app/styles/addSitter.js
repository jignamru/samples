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
    inputIcon: {
        marginLeft: 15,
        width: 20,
        height: 20,
        alignSelf: 'center',
        color: common.color.darkPurple
    },
    iconRight: {
        position: 'absolute',
        right: 0,
        top: 10,
        color: common.color.grey
    },
    pickerFieldValue: {
        fontFamily: common.fontFamily.base,
        color: 'black'        
    },
    errors: {
        color: 'red'
    },
    disclaimer: {
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        color: common.color.grey
    },
    typeDescriptionLabel: {
        alignSelf: 'center',
        fontStyle: 'italic',
        fontWeight: '400'
    }

})