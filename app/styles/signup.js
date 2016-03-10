'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
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
        fontSize: 40,
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 25,
    },
    signup: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signin: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputEmail: {
        marginLeft: 15,
        width: 24,
        height: 21
    },    
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputName: {
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
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#fff'
    }
})