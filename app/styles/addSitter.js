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
    buttonRow: {
        alignItems: 'center'
    },
    buttonContainer: {
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: common.color.orange,
        width: windowSize.width / 1.5,
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    }
})