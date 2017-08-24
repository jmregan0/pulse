/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/store'
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
// import Login from './Login';
import Login from './newLogin';
import Tabs from './app/components/Tabs';
import AuthService from './AuthService';


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
    // if (this.state.checkingAuth){
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator
    //         animating={true}
    //         size="large"
    //         style={styles.loader} />
    //     </View>
    //   )
    // }
    // if (this.state.isLoggedIn) {
    //   return (
    //     <Provider store={store}>
    //       <Tabs />
    //     </Provider>
    //   )
    // } else {
      return (
        <Login />
      );
    // }
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
