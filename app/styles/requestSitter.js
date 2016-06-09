'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var GLOBAL = require('../common/globals');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
//      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#B0D2C2'
    },
    introContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowSize.width,
        height: windowSize.height * 0.4,
    },
    introBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height * 0.4
    },
    datePicker: {
      borderTopWidth: 1, 
//      position: 'absolute', 
    },
    startDatePicker: {
//       bottom: 0, 
//       right: 0, 
//       left: 0, 
      height: 220, 
      borderColor: '#CCC', 
      backgroundColor: 'blue',    
    },
    endDatePicker: {
//       bottom: 0, 
//       right: 0, 
//       left: 0, 
      height: 220, 
      borderColor: '#CCC', 
      backgroundColor: 'yellow',    
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
//        flex: .25,
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
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: GLOBAL.COLOR.DARK_PURPLE,
        width: windowSize.width / 1.5,
        alignItems: 'center',
//        marginBottom: 50
    },
    button: {
//        fontSize: 20,
        color: '#fff'
    }
})