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
  ToastAndroid,
  ProgressBarAndroid,
  ToolbarAndroid,
  RefreshControl,
  DrawerLayoutAndroid,
  View
} from 'react-native';

var REQUEST_URL = 'http://news-at.zhihu.com/api/4/news/latest';
var REQUEST_BEFORE = 'http://news.at.zhihu.com/api/4/news/before/';
var StoryCell = require('./StoryCell');
var SingleStory = require('./SingleStory');
var Drawer = require('./Drawer');
var sectionIDs = [];
var rowIDs = [];
var dataStory = {};    
var getSectionData = (dataStory, sectionID) => {
      return dataStory[sectionID];
    };
var getRowData = (dataStory, sectionID, rowID) => {
      return dataStory[rowID];
    };
 var _navigator;   
 var loadCount = 0;
 var currentDate = 0;
 var loadedDate = 0;
 var loadedOnce = true;
  
class MainStory extends Component {
    
  constructor(props){
      super(props);
      this.state = {
          dataSource: new ListView.DataSource({
              getRowData: getRowData,
              getSectionHeaderData: getSectionData,
              rowHasChanged: (row1, row2) => row1 !== row2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          }),
          loaded: false,
          isRefreshing: false,
      };
      _navigator = this.props.navigator;
  }
  
  render() {
     if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
        <DrawerLayoutAndroid
                    ref={'DRAWER_REF'}
                    drawerLockMode='unlocked'
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => {return (<Drawer navigator={this.props.navigator}/>)}}>
        <View style={styles.column}>
        <ToolbarAndroid title='知乎日报'
                        style={styles.toolBar}
                        navIcon={require('./mipmap/ic_menu_black_24dp.png')}
                        onIconClicked={() => this.refs['DRAWER_REF'].openDrawer()}
                        titleColor='#FFFFFF'/>
        <ListView
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderStory}
            renderFooter={this.renderFooter}
            refreshControl={
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {  this.setState({isRefreshing: true});
                                    this.loadData(0);}}
                colors={['#434343']}
                progressBackgroundColor="#FFFFFF"
            />
            }
            onEndReached={() => {
                if(!loadedOnce){
                    loadedOnce = true;
                    this.loadData(currentDate);
                                }    
                                    }
                            }
            onEndReachedThreshold={5}/>
        </View>
        </DrawerLayoutAndroid>
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
  
  renderStory(story: Object, sectionID: string, rowID: string){
      //ToastAndroid.show(story.toString,ToastAndroid.SHORT);
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
  
  renderFooter(){
      return (
        <View  style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
  }
  
  renderSectionHeader(sectionData: string, sectionID: string) {
    return (
      <View style={{flex:1,height:26,backgroundColor:'#434343'}}>
        <Text style={styles.date}>
          {sectionData}
        </Text>
      </View>
    );
  }
  
  componentDidMount(){
      this.loadData(0);
  }
 
  loadData(present){
      if(present){
          //ToastAndroid.show(REQUEST_BEFORE+present,ToastAndroid.SHORT);
                fetch(REQUEST_BEFORE+present)
            .then((response) => response.json())
            .catch((error) => {
                ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
            })
            .then((responseData) => {
                var date = responseData.date;
                //ToastAndroid.show(date+'',ToastAndroid.SHORT);
                if(!currentDate || currentDate>Number(date)){currentDate = Number(date);}
                sectionIDs.push(date);
                dataStory[date] = date;
                rowIDs[loadCount] = [];
                for (var i in responseData.stories) {
                    var rowName = date+responseData.stories[i].id.toString();
                    rowIDs[loadCount].push(rowName);
                    dataStory[rowName] = responseData.stories[i];
                }
                this.setState({
                    //dataSource : this.state.dataSource.cloneWithRows(responseData.stories),
                    dataSource : this.state.dataSource.cloneWithRowsAndSections(dataStory, sectionIDs, rowIDs),
                    loaded : true,
                    //currentDate :Number(responseData.date),
                });
                loadCount++;
                loadedOnce = false;
            })
            .done();
      }else{
            //clean all the data
                sectionIDs = null;
                rowIDs = null;
                dataStory = null;
                sectionIDs = [];
                rowIDs = [];
                dataStory = {};  
                loadCount = 0;
                currentDate = 0;
                loadedOnce = false;
                
                fetch(REQUEST_URL)
            .then((response) => response.json())
            .catch((error) => {
                ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
            })
            .then((responseData) => {
                var date = responseData.date;
                if(!currentDate || currentDate > Number(date)){currentDate = Number(date);}
                //ToastAndroid.show(currentDate+'',ToastAndroid.SHORT);
                sectionIDs.push(date);
                dataStory[date] = date;
                rowIDs[loadCount] = [];
                for (var i in responseData.stories) {
                    var rowName = date+responseData.stories[i].id.toString();
                    rowIDs[loadCount].push(rowName);
                    dataStory[rowName] = responseData.stories[i];
                }
                this.setState({
                    //dataSource : this.state.dataSource.cloneWithRows(responseData.stories),
                    dataSource : this.state.dataSource.cloneWithRowsAndSections(dataStory, sectionIDs, rowIDs),
                    loaded : true,
                    isRefreshing: false,
                    //currentDate :Number(responseData.date),
                });
                loadCount++;
                loadedOnce = false;
                //ToastAndroid.show(loadCount+'',ToastAndroid.SHORT);
            })
            .done();
      }
      
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
    marginLeft:13,
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
  image: {
    flex: 4,
    width: 120,
    height: 80,
    alignSelf: 'center',
    margin: 10,
  },
  toolBar: {
      backgroundColor:'#333333',
      height: 56,
  }
});

module.exports = MainStory;