/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  ListView,
  View
} from 'react-native';

var REQUEST_URL = 'http://news-at.zhihu.com/api/4/news/latest';

class AwesomeApp extends Component {
    
  constructor(props){
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          date: null,
          loaded: false,
      };
  }
  
  render() {
     if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
        <View style={styles.column}>
        <Text style={styles.date}>{this.state.date}</Text>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStory}/>
        </View>
    );
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
    );
  }
  renderStory(story){
      return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text style={styles.title}>{story.title}</Text>
            <Image source={{uri:story.images[0]}}
                   style={styles.image} />
         </View>      
      </View>
    );
  }
  componentDidMount(){
      this.loadData();
  }
  
  loadData(){
      fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              dataSource : this.state.dataSource.cloneWithRows(responseData.stories),
              date : responseData.date,
              loaded : true,
          });
      })
      .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#434343', 
  },
  wrapper: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    margin: 5,
    backgroundColor: '#666666',
  },
  date: {
    fontSize: 14,
    color: '#FFFFFF',
    justifyContent: 'flex-start',
    margin: 5,  
  },
  title: {
    flex: 3,
    fontSize: 19,
    textAlign: 'left',
    color: '#FFFFFF',
    flexWrap: 'wrap',
    marginTop: 16,
    marginLeft: 16,
  },
  image: {
    flex: 1,
    width: 100,
    height: 80,
    alignSelf: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('AwesomeApp', () => AwesomeApp);
