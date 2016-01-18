var DocumentationPage = React.createClass({

    propTypes: {
        gotoPage: React.PropTypes.func
    },

    render: function() {
        return (
            <div className="documentation-page">
                <BabySitterAppHeader back='account_settings' gotoPage={this.props.gotoPage} />
                Documentation Placeholder
            </div>
        );
    }
});
