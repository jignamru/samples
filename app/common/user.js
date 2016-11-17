'use strict';
import React from 'react';
import {AsyncStorage} from 'react-native';
var GLOBAL = require('../common/globals');

module.exports = {
  /**
   * Asynchronously store the a user ID to disk.
   */
  async _setUserId(userId) {
     try {
       await AsyncStorage.setItem(GLOBAL.STORAGE_KEY, userId);
     } catch (error) {
       console.log('AsyncStorage error: ', error.message);
     }
  },

  /**
   * Asynchronously delete the user ID from disk + redirect to login screen
   */
  async _logout() {
    try {
      await AsyncStorage.removeItem(GLOBAL.STORAGE_KEY);
      console.log('User logged out.');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
};