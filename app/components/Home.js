'use strict';

const React = require('react');
const { Component } = React
const ReactNative = require('react-native');
import MapView from 'react-native-maps'
const {
      View,
      Text,
      StyleSheet
      } = ReactNative;



export default class Home extends Component{
  constructor(props){
    super(props);

    this.state = {}

  }

  render (){
    return (
    <Text style={{alignItems: 'center', paddingTop: 40}}>
      Hello, this is your home base.
    </Text>
    )
  }
}
