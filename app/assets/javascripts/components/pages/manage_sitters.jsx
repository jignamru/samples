var ManageSittersPage = React.createClass({

    propTypes: {
        gotoPage: React.PropTypes.func.isRequired,
        sitterData:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        return (
            <div className="manage-sitters-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
                Your Sitters
                <SitterTable sitterData={this.props.sitterData} />
            </div>
        );
    }
});