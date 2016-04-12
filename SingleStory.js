/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Linking,
  ToolbarAndroid,
  ToastAndroid,
  WebView,
  ScrollView,
  Image,
  Text,
  View
} from 'react-native';

var HTMLView = require('react-native-htmlview')
var title;
var id;
var REQUEST_URL = 'http://news-at.zhihu.com/api/4/news/';
var AutoHeight;
var script = 'window.location.hash = 1;document.title = document.height;'

class SingleStory extends Component {
   constructor(props){
      super(props);
      title = this.props.title;
      id = this.props.id;
      this.state = {
          body: '',
          url: null,
          loaded:false,
          webviewHeight:1000,
      }
   }
   
  
   render() {
       if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    var tempUrl = this.state.url;
    var tempBody = this.state.body;
    //ToastAndroid.show(tempBody,ToastAndroid.SHORT);
       return (  
      <ScrollView>       
      <View style={styles.column}>
      <ToolbarAndroid title={title}
                      style={styles.toolBar}
                      titleColor='#FFFFFF'/>
        <Image resizeMode='cover'
               style={styles.image}
               source={{uri:tempUrl}}/>
        <View style={styles.webview}>
        <HTMLView 
                 value={tempBody}
                 stylesheet={webstyle}
                 onLinkPress={(url) => {Linking.canOpenURL(url).then(supported => {
                                            if (!supported) {
                                                console.log('Can\'t handle url: ' + url);
                                            } else {
                                                return Linking.openURL(url);
                                            }
                                            }).catch(err => console.error('An error occurred', err));}}/> 
               </View>   
      </View>   
      </ScrollView>
    );
   }
   
   renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载数据……
        </Text>
      </View>
    );
  }
  
   componentDidMount(){
      this.loadStory(id);
  }
  
//   //called when HTML was loaded and injected JS executed
//    _updateWebViewHeight(event) {
//         //jsEvaluationValue contains result of injected JS
//         ToastAndroid.show(Number(event.title)+'',ToastAndroid.SHORT);
//         this.setState({webviewHeight: event.title});
//     }
    
  loadStory(id){
      fetch(REQUEST_URL+id)
      .then((response) => response.json())
      .catch((error) => {
        ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
      })
      .then((responseData) => {
          this.setState({
              body : responseData.body,
              url : responseData.image,
              loaded: true,
          });
          //ToastAndroid.show(this.state.url+'',ToastAndroid.SHORT);
      })
      .done();
  }
}

var webstyle = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
})
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
  },
  contentContainer: {
    flex:1,
    padding: 0,
  },
  column: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#666666',
  },
  toolBar: {
      backgroundColor:'#434343',
      height: 56,
  },
  image: {
    height: 300,
  },
  webview:{
    flex:1,
    marginRight:15,
    marginLeft:15, 
    backgroundColor: '#666666',
  },
});

module.exports = SingleStory;