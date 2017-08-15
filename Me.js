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

    this.state = {
      initialRegion: {
        latitude: 'unknown',
        longitude: 'unknown',
        latitudeDelta: 'unknown',
        longitudeDelta: 'unknown'
      }
    }

  this.getDeltaFromCoords = function (points){
    let minX = points.latitude,
        maxX = points.latitude,
        minY = points.longitude,
        maxY = points.longitude;

    minX = Math.min(minX, points.latitude);
    maxX = Math.max(maxX, points.latitude);
    minY = Math.min(minY, points.longitude);
    maxY = Math.max(maxY, points.longitude);

    return {
      latitude: (minX + maxX) / 2,
      longitude: (minY + maxY) / 2,
      latitudeDelta: maxX - minX,
      longitudeDelta: maxY - minY
    }

  }

  }

  componentDidMount (){
    navigator.geolocation.getCurrentPosition((position) => {

      let rawCoords = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude)
      }

      let updatedPositionWithDelta = this.getDeltaFromCoords(rawCoords)

      this.setState({initialRegion: updatedPositionWithDelta})
    })
  }

  render (){
    return (
      // <Text>{console.log(this.state.initialRegion)}</Text>
      <MapView
        style={styles.map}
        initialRegion={this.state.initialRegion}
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
