var BabysitterUser = React.createClass({

  userUrl: 'http://localhost:8080/babysitter/users/',
  uuidRegEx: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  getInitialState: function() {
    return {
      value: this.props.requestedUserId,
      data: this.props.data
    };
  },

  handleChange: function(event) {
    var userId = event.target.value;
    console.log('Requested User ID: ', userId);
    var state = {
       value: userId
    };

    if (this.uuidRegEx.test(userId))
    {
        console.log("Value matched UUID format. Requesting data from API.");
        $.get(this.userUrl + userId, function(result)
        {
            console.log("Successfully fetched user data.", result);
            state.data = result;


        }.bind(this));
    }

    console.log("Setting state to: ", state);
    this.setState(state);

  },

  render: function() {
    return (
      <div>
          <div>Get  user with ID: <input type="text" value={this.state.value} onChange={this.handleChange} /></div>
          <p/><p/>
          <div>
            User {this.state.data.id}: {this.state.data.firstName} {this.state.data.lastName} ({this.state.data.emailAddress})
          </div>

          <TokenTable tokens={this.state.data.tokens} />
          <SitterTable sitters={this.state.data.sitters} />
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
