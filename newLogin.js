'use strict';

import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js';
import SafariView from 'react-native-safari-view';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      user: undefined
    }

  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL()
    .then((url) => {
      if (url){
        this.handleOpenURL({ url })
      }
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL({ url }){
    // extract stringified user string out of the url
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // decode user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    })
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  }

  loginWithFacebook() {
    this.openURL('http://localhost:3000/auth/facebook');
  }

  loginWithGoogle() {
    this.openURL('http://localhost:3000/auth/google');
  }

  openURL (url){
    if (Platform.OS === 'ios'){
      SafariView.show({
        url: url,
        fromBottom: true
      })
    } else {
      Linking.openURL(url)
    }
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        {
          user ?

          <View style={styles.container}>
            <Text style={styles.header}>
              Welcome {user.name}!
            </Text>
            <View style={styles.avatar}>
              <Image source={{uri: user.avatar}} style={styles.avatarImage} />
            </View>
          </View>

          :

          <View style={styles.content}>
            <Text style={styles.header}>
              Welcome Stranger!
            </Text>
            <View style={styles.avatar}>
              <Icon name="user-circle" size={100} color="rgba(0,0,0,.09" />
            </View>
            <Text style={styles.text}>
              Please log in to continue {'\n'}
              to the app
            </Text>
          </View>
        }
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
          Login with facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
          Or with Google
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    margin: 20
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30
  }
});

module.exports = Login
