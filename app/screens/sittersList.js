'use strict';
import React, { 
  Component, 
  AppRegistry,
  AsyncStorage,
  View, 
  Text,
  ListView,
  TouchableHighlight,
  Navigator,
  Image
} from 'react-native';

var styles = require('../styles/sittersList');

import CustomText from '../components/customText';
import NavigationBar from 'react-native-navbar';
import GLOBAL from '../common/globals';
import User from '../common/user';
import SitterDetailsScreen from './sitterDetails';
import IconTitle from '../components/navbarIconTitle';


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
      <View style={styles.container}>
        <NavigationBar
          title={<IconTitle/>}
          leftButton={leftButtonConfig} />
          <View style={styles.introContainer}>
            <Image style={styles.introBg} source={require('../images/bg-top-welcome.png')} />
            <CustomText style={styles.title}>Your sitters</CustomText>
          </View>
        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this.renderRow } />
      </View>
    )
  }
}

module.exports = SittersList;
