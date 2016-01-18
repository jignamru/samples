var ContactSupportPage = React.createClass({

    propTypes: {
        gotoPage: React.PropTypes.func
    },

    render: function() {
        return (
            <div className="contact-support-page">
                <BabySitterAppHeader back='account_settings' gotoPage={this.props.gotoPage} />
                Contact Support Placeholder

            </div>
        );
    }
});
