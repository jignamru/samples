var LandingPage = React.createClass({

    propTypes: {
        gotoPage:      React.PropTypes.func.isRequired,
        userData:      React.PropTypes.object.isRequired,
        sitterData:    React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    handleManageSitters: function() {
        this.props.gotoPage('manage_sitters');
    },

    handleScheduleSitter: function() {
        this.props.gotoPage('schedule_sitter');
    },

    handleBuyTokens: function() {
        this.props.gotoPage('buy_tokens');
    },

    handleAddSitter: function() {
        this.props.gotoPage('add_sitter');
    },

    render: function() {
        return (
            <div className='landing-page'>
                <BabySitterAppHeader forward='account_settings' forwardLabel='Account' gotoPage={this.props.gotoPage} />
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
