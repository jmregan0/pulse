'use strict';

const React = require('react');
const { Component } = React
const ReactNative = require('react-native');
const {
      View
      } = ReactNative;


export default class Me extends Component{
  constructor(props){
    super(props);

    this.state = {}
  }
  render (){
    return (
      <View> It'sa me! Mario!</View>
    )
  }
}
