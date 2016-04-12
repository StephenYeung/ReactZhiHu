/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  Image,
  View
} from 'react-native';

var StoryCell = React.createClass({
   render : function() {
       if(!this.props.story.images){
         return (    
      <View style={styles.container}>
      <TouchableNativeFeedback onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.wrapperNone}>
            <Text style={styles.titleNone}>{this.props.story.title}</Text>
         </View>
          </TouchableNativeFeedback>      
      </View>   
    );  
       }
       return (    
      <View style={styles.container}>
      <TouchableNativeFeedback onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>{this.props.story.title}</Text>
            <Image source={{uri:this.props.story.images[0]}}
                   style={styles.image} />
         </View>
          </TouchableNativeFeedback>      
      </View>   
    );
   } 
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    borderRadius:3,
    borderColor:'#666666',
    marginLeft: 10,
    marginRight: 10,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#666666',
  },
  wrapperNone: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    borderRadius:3,
    height:80,
    borderColor:'#666666',
    marginLeft: 10,
    marginRight: 10,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#666666',
  },

  title: {
    flex: 9,
    fontSize: 19,
    textAlign: 'left',
    color: '#FFFFFF',
    flexWrap: 'wrap',
    marginTop: 16,
    marginLeft: 16,
  },
  titleNone: {
    flex: 1,
    fontSize: 19,
    textAlign: 'left',
    color: '#FFFFFF',
    flexWrap: 'wrap',
    marginTop: 16,
    marginLeft: 16,
    marginRight:18,
  },
  image: {
    flex: 4,
    width: 120,
    height: 80,
    alignSelf: 'center',
    margin: 10,
  },
});

module.exports = StoryCell;