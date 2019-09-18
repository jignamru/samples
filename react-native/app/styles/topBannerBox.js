'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    introContainer: {
        backgroundColor: 'transparent',
        width: windowSize.width,
        justifyContent: 'center',
        height: windowSize.height * 0.2
    },
    introBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height * 0.2
    },
    tallBannerHeight: {
        height: windowSize.height * 0.4
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: "white",
    },
    largeTitle: { // had to dupe from title as fontSize was getting lost in the nested styles approach :\
        fontSize: 40,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: "white",    }

})