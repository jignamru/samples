var AccountSettingsPage = React.createClass({

    handleBuyTokens: function() {

    },

    handleDocumentation: function() {

    },

    handleContactSupport: function() {

    },

    handleAboutUs: function() {

    },

    handleLogout: function() {
        this.props.handleLogout();
    },

    render: function() {
        return (
            <div className="account-settings-page">
                <div>Your Account</div>
                <hr />
                <button onClick={this.handleBuyTokens}>Buy Tokens</button>
                <button onClick={this.handleDocumentation}>Documentation</button>
                <button onClick={this.handleContactSupport}>Contact Support</button>
                <button onClick={this.handleAboutUs}>About Us</button>
                <hr />
                <button onClick={this.handleLogout}>Log Out</button>
            </div>
        );
    }
});
