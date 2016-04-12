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
  ToastAndroid,
  ListView,
  View
} from 'react-native';
var _navigator;
var routes;
var drawer;
var REQUEST_LIST = 'http://news-at.zhihu.com/api/4/themes';

class Drawer extends Component{
    constructor(props){
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          
      };
      _navigator = this.props.navigator;
      drawer = this.props.drawer;
       //ToastAndroid.show(drawer ? '有dede' : '空的dede');
  }
  
    render(){
       return (<View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerFont}>知乎日报</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.renderRow}/>
                </View>);
    }
    
    componentDidMount(){
      this.loadDrawer();
    }
    renderRow(other){
        return(
        <View style={styles.row}>
            <TouchableNativeFeedback onPress={
                () => {
                 routes = _navigator.getCurrentRoutes();
                 if(routes[routes.length-1].name === 'MainStory'){
                     drawer.closeDrawer();
                     _navigator.push({
                    description: other.description,
                    title: other.name,
                    name: 'ThemeStory',
                    id: other.id,
                    thumbnail: other.thumbnail,
                    });
                 }else{
                 _navigator.replace({
                    description: other.description,
                    title: other.name,
                    name: 'ThemeStory',
                    id: other.id,
                    thumbnail: other.thumbnail,
          });
                 }
            }}
    
                                    background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.row}>
            <Text style={styles.themeText}>{other.name}</Text>
            </View>
            </TouchableNativeFeedback>
        </View>
        );
    }
  
    loadDrawer(){
        fetch(REQUEST_LIST)
            .then((response) => response.json())
            .catch((error) => {
                ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
            })
            .then((responseData) => {
               this.setState({
                  dataSource:this.state.dataSource.cloneWithRows(responseData.others), 
               }); 
            })
            .done();
    }
    
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#666666',
    },
    header: { 
        justifyContent:'center',
        alignItems: 'center',
        height:120,
        backgroundColor: '#434343'
    },
    row: {
      flex: 1,  
      justifyContent:'center',
      height:60,
    },
    themeText: {
      fontSize: 19,
      textAlign: 'left',
      color: '#FFFFFF',
      flexWrap: 'wrap',
      marginLeft: 20,  
    },
    headerFont: {
      fontSize: 25,
      textAlign: 'left',
      color: '#FFFFFF',
      flexWrap: 'wrap',
    }
});
module.exports = Drawer;