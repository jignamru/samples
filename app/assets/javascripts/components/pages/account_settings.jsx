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
                <h1>Your Account</h1>
                <ul>
                    <li><button onClick={this.handleDocumentation}>Documentation</button></li>
                    <li><button onClick={this.handleContactSupport}>Contact Support</button></li>
                    <li><button onClick={this.handleAboutUs}>About Us</button></li>
                    <li><hr /></li>
                    <li><button onClick={this.props.handleLogout}>Log Out</button></li>
                </ul>
            </div>
        );
    }
});
