var AccountSettingsPage = React.createClass({

    propTypes: {
        handleLogout: React.PropTypes.func
    },

    handleDocumentation: function() {
        window.location.hash = 'documentation';
    },

    handleContactSupport: function() {
        window.location.hash = 'contact_support';
    },

    handleAboutUs: function() {
        window.location.hash = 'about_us';
    },

    render: function() {
        return (
            <div className="account-settings-page">
                <BabySitterAppHeader back='landing' />
                <div>Your Account</div>
                <hr />
                <button onClick={this.handleDocumentation}>Documentation</button>
                <button onClick={this.handleContactSupport}>Contact Support</button>
                <button onClick={this.handleAboutUs}>About Us</button>
                <hr />
                <button onClick={this.props.handleLogout}>Log Out</button>
            </div>
        );
    }
});
