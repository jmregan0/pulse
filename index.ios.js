/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
const Login = require('./Login');
const Tabs = require('./app/components/Tabs')
const AuthService = require('./AuthService');

const Pulse = React.createClass({

  componentDidMount: function(){
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !== null
      })
    })
  },
  render: function() {
    if (this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    }
    if (this.state.isLoggedIn) {
      return (
        <Tabs />
        // <Text style={{marginTop: 40}}>Hey there</Text>
      )
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );
    }
  },
  onLogin: function(){
     this.setState({isLoggedIn: true})
  },
  getInitialState: function(){
    return {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Pulse
AppRegistry.registerComponent('Pulse', () => Pulse);
