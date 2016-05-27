'use strict';
import React, { 
  Component, 
  AppRegistry,
  View, 
  Text,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var sitters = [
                  {
                    "id": "1c18d89d-3753-4776-8b09-7636579dfe2a",
                    "firstName": "Laura",
                    "lastName": "W",
                    "phoneNumber": "+12061234567",
                    "role": "SITTER",
                    "emailAddress": "Jigna.patel+lw@gmail.com",
                    "sitters": [],
                    "schedulingRequests": [],
                    "tokens": [],
                    "createdTime": "2016-05-24T21:36:19.570+0000",
                    "updatedTime": "2016-05-24T21:36:19.570+0000"
                  },
    {
    "id": "1c18d89d-3753-4776-8b09-7636579dfe2a",
    "firstName": "Laura2",
    "lastName": "W2",
    "phoneNumber": "+12061234567",
    "role": "SITTER",
    "emailAddress": "Jigna.patel+lw@gmail.com",
    "sitters": [],
    "schedulingRequests": [],
    "tokens": [],
    "createdTime": "2016-05-24T21:36:19.570+0000",
    "updatedTime": "2016-05-24T21:36:19.570+0000"
  }
];


class SittersList extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props)
    this.state = {
      dataSource : ds.cloneWithRows(this._sitters())
    }
  }
  
  _sitters(){
    var dataBlob = []
    for (var ii = 0; ii < sitters.length; ii++) {
      dataBlob.push(sitters[ii].firstName + sitters[ii].lastName);
    }
    return dataBlob;
  }
  
  _renderRow(rowData) {
  	return <TouchableHighlight underlayColor="ededed" style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
      	<Text style={{ fontSize:18 }}>{rowData}</Text>
      </TouchableHighlight>
  }
  
  render() {
    return (
      <View>
        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this._renderRow } />
      </View>
    )
  }
}

module.exports = SittersList;
