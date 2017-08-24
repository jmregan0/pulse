'use strict';

const React = require('react');
const { Component } = React
const ReactNative = require('react-native');
const buffer = require('buffer');
const {
      AppRegistry,
      StyleSheet,
      Text,
      View,
      Image,
      TextInput,
      TouchableHighlight,
      ActivityIndicator
      } = ReactNative;


class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: undefined,
      showProgress: false
    }
  }
  render (){
    var errorCtrl = <View />;

    if (!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>We experienced an unexpected issue
        </Text>
    }
    if (!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>That username and password combination did not work
        </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./Octocat.png')} />
          <Text style={styles.heading}>
          Pulse
          </Text>

        <TextInput
          onChangeText={(text)=> this.setState({userName: text})}
          style={styles.input}
          placeholder="username"/>

        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}/>

          <TouchableHighlight
            style={styles.button}
            onPress={this.onLoginPress.bind(this)}>
              <Text style={styles.buttonText}>Log in with Google</Text>
          </TouchableHighlight>

          {errorCtrl}

           <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}
            />
      </View>
    );
  }

  onLoginPress(){
    this.setState({showProgress: true})

    let authService = require('./AuthService');
    authService.login({
      userName: this.state.userName,
      password: this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress: false
      }, results))
      if (results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });


  }

}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: "#FFF",
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})

module.exports = Login
