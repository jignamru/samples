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
    message: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 30,
        alignSelf: 'center'
    },
    sectionHeader: {
        padding: 10,
        backgroundColor: common.color.lightGrey
    },
    row: { 
        padding: 10,
        paddingLeft: 30,
        borderBottomWidth:1, 
        borderBottomColor: common.color.lightGrey, 
        flexDirection:'row', 
        flex: 1,
        justifyContent: 'space-between'
    },
    rowText: {
        paddingTop: 5
    },
    unverified: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    iconRight: {
        fontSize: 30
    }
})