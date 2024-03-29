'use strict';
var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityIndicator: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scale: 1.5 }]
    },
    activityLabel: {
    	marginTop: 20
    }
})
