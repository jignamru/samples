var NotFoundPage = React.createClass({

    propTypes: {
        comingFrom: React.PropTypes.string
    },

    render: function() {
        return (
            <div className="not-found-page">
                <BabySitterAppHeader back='landing' />
                Oops! We couldn't find that page. Please contact support if the problem persists.
            </div>
        );
    }
});