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
  DrawerLayoutAndroid,
  Image,
  ListView,
  Text,
  View
} from 'react-native';
var Drawer = require('./Drawer');
var StoryCell = require('./StoryCell');
var REQUEST_URL = 'http://news-at.zhihu.com/api/4/theme/';
var _navigator;

class ThemeStory extends Component {
   constructor(props){
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          imageUrl: null,
    }
    _navigator = this.props.navigator;
   }
   
  
   render() {
       return (     
           <DrawerLayoutAndroid
                    ref={'DRAWER_REF'}
                    drawerLockMode='unlocked'
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => {return (<Drawer navigator={this.props.navigator}/>)}}>
      <View style={styles.column}>
      <ToolbarAndroid title={this.props.title}
                      style={styles.toolBar}
                      navIcon={require('./mipmap/ic_menu_black_24dp.png')}
                      onIconClicked={() => this.refs['DRAWER_REF'].openDrawer()}
                      titleColor='#FFFFFF'/>
               <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                          renderHeader={() => {
                              return(
                                <Image source={{uri:this.state.imageUrl}}
                                    resizeMode='cover'
                                    style={styles.headIamge}/>
                            );   
                          }}/>
               </View>   
               </DrawerLayoutAndroid>
      
    );
   }
  
   componentDidMount(){
      this.loadStory(this.props.id);
  }
   
   renderRow(story){
       return (
      <StoryCell onPress={() => {
          _navigator.push({
            title: story.title,
            name: 'SingleStory',
            id: story.id,
          });
      }}
                 story={story}
      />
    );
   }
    loadStory(id){
        fetch(REQUEST_URL+id)
        .then((response) => response.json())
        .catch((error) => {
            ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
        })
        .then((responseData) => {
            this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.stories),
               imageUrl: responseData.image,
            });
        })
        .done();
    }
}

const styles = StyleSheet.create({
  column: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#434343',
  },
  toolBar: {
      backgroundColor:'#333333',
      height: 56,
  },
  headIamge: {
    height: 180,
    marginBottom:20,  
  },
});

module.exports = ThemeStory;