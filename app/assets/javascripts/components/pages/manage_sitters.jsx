var ManageSittersPage = React.createClass({

    propTypes: {
        sitterData:  React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        return (
            <div className="manage-sitters-page">
                <BabySitterAppHeader back='landing' />
                Your Sitters
                <SitterTable sitterData={this.props.sitterData} />
            </div>
        );
    }
});