'use strict';

const React = require('react');
const { Component } = React
const ReactNative = require('react-native');
import MapView from 'react-native-maps'
const {
      View,
      Text,
      StyleSheet,
      Button
      } = ReactNative;


export default class Map extends Component{
  constructor(props){
    super(props);

    this.state = {
      region: {
        latitude: 'unknown',
        longitude: 'unknown',
        latitudeDelta: 'unknown',
        longitudeDelta: 'unknown'
      },
      events: {
        latitude: 41.9214,
        longitude: 87.6513,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
    }

  }

  // getDeltaFromCoords (points){
  //   let minX = points.latitude,
  //       maxX = points.latitude,
  //       minY = points.longitude,
  //       maxY = points.longitude;

  //   minX = Math.min(minX, points.latitude);
  //   maxX = Math.max(maxX, points.latitude);
  //   minY = Math.min(minY, points.longitude);
  //   maxY = Math.max(maxY, points.longitude);

  //   return {
  //     latitude: (minX + maxX) / 2,
  //     longitude: (minY + maxY) / 2,
  //     latitudeDelta: maxX - minX,
  //     longitudeDelta: maxY - minY
  //   }

  // }

  whereAmI(){
    navigator.geolocation.getCurrentPosition((position) => {

      let rawCoords = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
      console.log('raw coords', rawCoords)
      this.setState({region: rawCoords})
    })
  }

  componentWillMount (){
    this.whereAmI();
  }


  render (){
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={ (newView) => this.setState({region: newView})}
          showsUserLocation={true} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    map: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute'
    }
})

