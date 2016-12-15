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
    submit: {
        marginTop: 20,
        backgroundColor:  common.color.orange,
        padding: 20,
        alignItems: 'center'
    },
    inputIcon: {
        marginLeft: 20,
        alignSelf:'center',
        width: 20,
        height: 20
    },
    input: {
        fontSize: 14
    },
    errors: {
        color: 'red'
    },
    greyFont: {
      color: common.color.grey
    },
    whiteFont: {
      color: '#fff'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400',
    }

})