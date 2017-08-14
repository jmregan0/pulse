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

    this.state = {
      latitude: 'unknown',
      longitude: 'unknown'
    }
  }

  componentDidMount(){
   navigator.geolocation.getCurrentPosition((position) => {
     let lat = parseFloat(position.coords.latitude);
     let long = parseFloat(position.coords.longitude);
     let initialRegion = {
       latitude: lat,
       longitude: long
     }
     this.setState({latitude: lat, longitude: long})
   })
  }

  render (){
    return (
    <Text style={{alignItems: 'center', paddingTop: 40}}>
      current latitude: {this.state.latitude}
      current longitude: {this.state.longitude}
    </Text>
    )
  }
}
