'use strict';
import React, { 
  Component, 
  AppRegistry,
  AsyncStorage,
  View, 
  Text,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import GLOBAL from '../common/globals';
import User from '../common/user';
import SitterDetailsScreen from './sitterDetails';

class SittersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
    this.goToSitterDetails = this.goToSitterDetails.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData(){
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(responseJson),
        });
      })
    }).done();
  }
  
  goToSitterDetails(sitterData){
    this.props.navigator.push({
      component: SitterDetailsScreen, 
      passProps: {
      	sitter: sitterData
      }
    })
  }
  
  renderRow(rowData) {
    
  	return (
      <TouchableHighlight 
             underlayColor="#ededed" 
             style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}
               onPress={() => this.goToSitterDetails(rowData)}>
      	<Text style={{ fontSize:18 }}>{rowData.firstName} {rowData.lastName}</Text>
      </TouchableHighlight>
      )
  }
  
  render() {
    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.props.navigator.pop()
    };
      
    return (
      <View>
        <NavigationBar
          title={{ title: 'Your Sitters', }}
          leftButton={leftButtonConfig} />
        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this.renderRow } />
      </View>
    )
  }
}

module.exports = SittersList;
