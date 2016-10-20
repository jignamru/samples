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

    inputs: {
        marginTop: 10,
        marginBottom: 10,
    },
    inputContainer: {
        padding: 10,
        marginTop: 20,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
      height: 40, 
      justifyContent: 'center', 
      padding: 5, 
      borderColor: 'gray', 
      borderWidth: 1,
      marginVertical: 10,
    },
    buttonRow: {
        alignItems: 'center'
    },
    buttonContainer: {
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: common.color.darkPurple,
        width: windowSize.width / 1.5,
        alignItems: 'center',
    },
    button: {
        color: '#fff'
    },
    checkbox: {
        fontFamily: common.fontFamily.base
    },
    modal: {
        flex: 1,
        backgroundColor: '#f5fcff',
        justifyContent: 'center',
        padding: 20
    }
})