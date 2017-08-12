import React, { Component } from 'react';
// import { TabNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';
import Me from './Me'
import { Text, View, StyleSheet, TabBarIOS } from 'react-native';

class Tabs extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'home'
    }
  }
  render (){
    return (
      <TabBarIOS style={styles.container}>

        <TabBarIOS.Item
          title="Home"
          selected={this.state.selectedTab == 'home'}
          icon={require('/Users/jacobregan/Documents/Dev/Pulse/ios/Icons.xcassets/ic_layers_36pt.imageset/ic_layers_36pt.png')}
          onPress={ () => {this.setState({selectedTab: 'home'})}}>
            <Text style={styles.welcome}>Home View</Text>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Map"
          selected={this.state.selectedTab == 'map'}
          icon={require('/Users/jacobregan/Documents/Dev/Pulse/ios/Icons.xcassets/ic_map_36pt.imageset/ic_map_36pt.png')}
          onPress={ () => {this.setState({selectedTab: 'map'})}}>
            <Text style={styles.welcome}>Maps View</Text>
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  }
}

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
    margin: 10
  }
});

module.exports = Tabs;
