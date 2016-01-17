var AccountSettingsPage = React.createClass({

    handleDocumentation: function() {

    },

    handleContactSupport: function() {

    },

    handleAboutUs: function() {

    },

    handleLogout: function() {
        this.props.handleLogout();
    },

    gotoPage: function() {
        this.props.gotoPage('landing');
    },

    render: function() {
        return (
            <div className="account-settings-page">
                <BabySitterAppHeader back='landing' gotoPage={this.gotoPage} />
                <div>Your Account</div>
                <hr />
                <button onClick={this.handleDocumentation}>Documentation</button>
                <button onClick={this.handleContactSupport}>Contact Support</button>
                <button onClick={this.handleAboutUs}>About Us</button>
                <hr />
                <button onClick={this.handleLogout}>Log Out</button>
            </div>
        );
    }
});
