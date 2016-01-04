var BabysitterUser = React.createClass({

  userUrl: 'http://localhost:8080/babysitter/users/',
  uuidRegEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  getInitialState: function() {
    return {
      value: this.props.requestedUserId,
      id: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      tokens: [],
      sitters: []
    };
  },

  handleChange: function(event) {
    var userId = event.target.value;
    console.log('Requested User ID: ', userId);

    // the default is that the state is wiped clean
    var state = {};

    if (this.uuidRegEx.test(userId))
    {
        console.log("Value matched UUID format. Requesting data from API.");
        $.get(this.userUrl + userId, function(result)
        {
            console.log("Successfully fetched user data.", result);
            // onsuccess, set the state to the result
            state = result;
            state.value = userId;
            console.log("Setting state to: ", state);
            this.setState(state);
        }.bind(this));
    }
    else
    {
        state.value = userId;
        console.log("Setting state to: ", state);
        this.setState(state);
    }

  },

  // Once the component is mounted, populate the state with data from the service
  componentDidMount: function() {
      console.log("Componment mounted. Initial load from service...");
      $.get(this.userUrl + this.props.requestedUserId, function(result)
      {
          if (this.isMounted()) {
              result['requestedUserId'] = this.props.requestedUserId;
              this.setState(result);
          }
      }.bind(this));
  },

  render: function() {
    return (
      <div>
          <div>Get  user with ID: <input type="text" value={this.state.value} onChange={this.handleChange} /></div>
          <p/><p/>
          <div>
            User {this.state.id}: {this.state.firstName} {this.state.lastName} ({this.state.emailAddress})
          </div>

          <TokenTable tokens={this.state.tokens} />
          <SitterTable sitters={this.state.sitters} />
      </div>
    );
  }
});

//var ParentView = React.createClass({
//
//});
//



// ParentSearchBar
// -SearchBar

// ParentView
// -SitterTable
// --SitterRow
// -TokenTable
// --TokenRow
