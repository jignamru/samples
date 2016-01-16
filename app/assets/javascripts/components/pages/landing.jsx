var LandingPage = React.createClass({

    getInitialState: function() {
        return {
            data: {},
            sitters: []
        };
    },

    componentDidMount: function() {

        // fetch user data
        $.get('/user', function(result) {
            console.log("Successfully fetched user data. Result: ", result);
            this.setState(Object.assign(this.state, { data: result }));
        }.bind(this));

        // fetch sitters for this user
        $.get('/sitters', function(result) {
            console.log("Successfully fetched user sitter data. Result: ", result);
            this.setState(Object.assign(this.state, { sitters: result }));
        }.bind(this));
    },

    render: function() {
        return (
            <div className='landing-page'>
                <div>Welcome back, {this.state.data.firstName} {this.state.data.lastName}!</div>
                <hr />
                <div>Your email address is: {this.state.data.emailAddress}</div>
                <div>You have {this.state.data.tokens ? this.state.data.tokens.length : 0} tokens</div>
                <div>You have {this.state.sitters.length} sitters</div>

                <hr />
                // TODO Conditionally - button to buy more tokens -->
                // TODO Conditionally - button to add a sitter -->

                <button onClick={this.handleScheduleSitter}>Schedule a Sitter</button>
            </div>
        );
    }
});
