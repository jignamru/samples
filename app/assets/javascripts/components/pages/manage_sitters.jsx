var ManageSittersPage = React.createClass({

    render: function() {
        return (
            <div className="manage-sitters-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
                Your Sitters
                <SitterTable sitters={this.props.sitters} />
            </div>
        );
    }
});