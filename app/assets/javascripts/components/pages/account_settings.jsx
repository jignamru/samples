var AccountSettingsPage = React.createClass({

    propTypes: {
        handleLogout: React.PropTypes.func,
        gotoPage:     React.PropTypes.func
    },

    handleDocumentation: function() {
        this.props.gotoPage('documentation');
    },

    handleContactSupport: function() {
        this.props.gotoPage('contact_support');
    },

    handleAboutUs: function() {
        this.props.gotoPage('about_us');
    },

    render: function() {
        return (
            <div className="account-settings-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
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
