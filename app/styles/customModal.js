'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var common = require('../common/styles');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    bg: {
        padding:20, 
        flex:1, 
        justifyContent:'center', 
        backgroundColor:'rgba(43, 48, 62, 0.57)'
    },
    container: {
        backgroundColor:'white',
        borderRadius: 8,
        flexDirection:'column',

    },
    title: {
        textAlign: 'center',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        fontSize:18
    },
    closeContainer: {
        flex:1,
        alignItems:'center'
    },
    close: {
        fontSize:19,
        padding:15
    }

})