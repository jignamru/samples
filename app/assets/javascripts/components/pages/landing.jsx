var LandingPage = React.createClass({

    propTypes: {
        userData:      React.PropTypes.object.isRequired,
        sitterData:    React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    handleManageSitters: function() {
        window.location.hash = 'manage_sitters';
    },

    handleScheduleSitter: function() {
        window.location.hash = 'schedule_sitter';
    },

    handleBuyTokens: function() {
        window.location.hash = 'buy_tokens';
    },

    handleAddSitter: function() {
        window.location.hash = 'add_sitter';
    },

    render: function() {
        return (
            <div className='landing-page'>
                <BabySitterAppHeader forward='account_settings' forwardLabel='Account' />
                <h1>SitterDone</h1>
                <div>Welcome back, {this.props.userData.firstName} {this.props.userData.lastName}!</div>
                <hr />
                <button onClick={this.handleScheduleSitter}>Schedule a Sitter</button>
                <hr />
                <div>You Have</div>
                <div>{this.props.userData.tokens ? this.props.userData.tokens.length : 0} tokens</div>
                <button onClick={this.handleBuyTokens}>Buy More Tokens</button>
                <hr />
                <div>You Have</div>
                <div>{this.props.sitterData ? this.props.sitterData.length : 0} sitters</div>
                <button onClick={this.handleManageSitters}>Manage Sitters</button> <button onClick={this.handleAddSitter}>Add a Sitter</button>
            </div>
        );
    }
});
