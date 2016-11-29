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
    buttonsBox: {
        marginTop: 100
    },
    buttonRow: {
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop:20,
        paddingBottom:20, 
        height:60, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: common.color.orange,
        width: windowSize.width / 1.3,
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    }
})