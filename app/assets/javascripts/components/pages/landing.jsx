var LandingPage = React.createClass({

    userUrl: 'http://localhost:8080/babysitter/users/',

    getInitialState: function() {
        return {
            data: {},
            sitters: []
        };
    },

    componentDidMount: function() {

        // fetch user data
        $.get(this.userUrl + this.props.userId, function(result) {
            console.log("Successfully fetched user data. Result: ", result);
            this.setState(Object.assign(this.state, { data: result }));
        }.bind(this));

        // fetch sitters for this user
        $.get(this.userUrl + this.props.userId + '/sitters', function(result) {
            console.log("Successfully fetched user sitter data. Result: ", result);
            this.setState(Object.assign(this.state, { sitters: result }));
        }.bind(this));
    },

    render: function() {
        return (
            <div className='landing-page'>
                <div>Welcome back, {this.state.data.firstName} {this.state.data.lastName}!</div>
                <hr />
                <div>Your user ID is: {this.state.data.id}</div>
                <div>Your email address is: {this.state.data.emailAddress}</div>
                <div>You have {this.state.data.tokens ? this.state.data.tokens.length : 0} tokens</div>
                <div>You have {this.state.sitters.length} sitters</div>
            </div>
        );
    }
});
