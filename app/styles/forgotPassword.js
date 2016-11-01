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
      backgroundColor: common.color.lightestBrown
    },
    back: {
        marginTop: 40,
        marginLeft: 20,
    },
    backIcon: {
        height: 21,
        width: 21
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: common.color.darkPurple
    },
    submit: {
        backgroundColor:  common.color.darkPurple,
        padding: 20,
        alignItems: 'center'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputIcon: {
        marginLeft: 15,
        width: 20,
        height: 20
    },
    inputContainer: {
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    submit: {
        backgroundColor: common.color.darkPurple,
        padding: 20,
        alignItems: 'center'
    },
    greyFont: {
      color: common.color.grey
    },
    whiteFont: {
      color: '#fff'
    }
})