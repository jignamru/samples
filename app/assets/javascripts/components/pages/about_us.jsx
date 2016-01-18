var AboutUsPage = React.createClass({

    propTypes: {
        gotoPage: React.PropTypes.func
    },

    render: function() {
        return (
            <div className="about-us-page">
                <BabySitterAppHeader back='account_settings' gotoPage={this.props.gotoPage} />
                About Us Placeholder
            </div>
        );
    }
});
