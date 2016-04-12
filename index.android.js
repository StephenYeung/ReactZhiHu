/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  BackAndroid,
  Navigator,
  View
} from 'react-native';
    
var MainStory = require('./MainStory');
var SingleStory = require('./SingleStory');
var ThemeStory = require('./ThemeStory');
var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function (route, navigator) {
    _navigator = navigator;
    if(route.name === 'MainStory'){
        return(
          <MainStory navigator={navigator}/>
        );
    }else if(route.name === 'SingleStory'){
        return(
          <SingleStory navigator={navigator}
                       title={route.title}
                       id={route.id}/>
        );
    }else if(route.name === 'ThemeStory'){
        return(
          <ThemeStory navigator={navigator}
                       title={route.title}
                       description={route.description}
                       id={route.id}
                       thumbnail={route.thumbnail}/>
        );
    }
}

class AwesomeApp extends Component {
    
  constructor(props){
      super(props);
  }
  
  render() {
    return (
        <Navigator 
        initialRoute={{name:'MainStory'}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}/>
    );
  }
  
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('AwesomeApp', () => AwesomeApp);
module.exports = AwesomeApp;