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

var GLOBAL = require('../common/globals');
var User = require('../common/user');

class SittersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData(){
    var sitters = [];
    AsyncStorage.getItem(GLOBAL.STORAGE_KEY).then((userId) => {
      fetch( GLOBAL.BABYSITTER_API_URL + "users/"+ userId + "/sitters", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          sitters.push(responseJson[i].firstName + ' ' + responseJson[i].lastName);
        }
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(sitters),
        });
      })
    }).done();
  }
  
  
  renderRow(rowData) {
  	return <TouchableHighlight underlayColor="#ededed" style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
      	<Text style={{ fontSize:18 }}>{rowData}</Text>
      </TouchableHighlight>
  }
  
  render() {
    return (
      <View>
        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this.renderRow } />
      </View>
    )
  }
}

module.exports = SittersList;
