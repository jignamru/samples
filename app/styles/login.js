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
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 180
    },
    signin: {
        backgroundColor: common.color.orange,
        padding: 20,
        alignItems: 'center'
    },
    signinText: {
        fontSize: 18,
        fontWeight: '400',
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15,
      padding: 20
    },
    iconPassword: {
        marginLeft: 20,
        alignSelf:'center',
        width: 20,
        height: 21
    },
    iconUsername: {
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
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: common.color.grey
    },
    bold: {
        fontWeight: '500'
    },
    whiteFont: {
      color: '#fff'
    }
})