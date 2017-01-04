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
    message: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 30,
        alignSelf: 'center'
    },
    row: { 
        height:60, 
        borderBottomWidth:1, 
        borderBottomColor: '#ddd', 
        flexDirection:'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop:20, 
        paddingBottom:20, 
        height:60, 
        overflow:'hidden', 
        borderRadius:4, 
        width: windowSize.width / 1.5,
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: common.color.orange,
        alignSelf: 'center'
    },
    button: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    },
})