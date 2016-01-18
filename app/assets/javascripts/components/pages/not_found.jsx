var NotFoundPage = React.createClass({

    propTypes: {
        comingFrom: React.PropTypes.string,
        gotoPage: React.PropTypes.func
    },

    render: function() {
        return (
            <div className="not-found-page">
                <BabySitterAppHeader back={this.props.comingFrom} gotoPage={this.props.gotoPage} />
                Oops! We couldn't find that page. Please contact support if the problem persists.
            </div>
        );
    }
});