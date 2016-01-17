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
                <button onClick={this.handleScheduleSitter}>Schedule a Sitter</button>
                <hr />
                <div>You Have</div>
                <div>{this.state.data.tokens ? this.state.data.tokens.length : 0} tokens</div>
                <button>Buy More Tokens</button>
                <hr />
                <div>You Have</div>
                <div>{this.state.sitters ? this.state.sitters.length : 0} sitters</div>
                <button>Add a Sitter</button>
            </div>
        );
    }
});
