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


export default class Me extends Component{
  constructor(props){
    super(props);

    this.state = {}
  }
  render (){
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.881832,
          longitude: -87.623177,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true} />
    )
  }
}

const styles = StyleSheet.create({
    map: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute'
    }
})
