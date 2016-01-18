var BabySitterAppHeader = React.createClass({

    propTypes: {
        back: React.PropTypes.string,
        forward: React.PropTypes.string,
        forwardLabel: React.PropTypes.string,
        gotoPage: React.PropTypes.func
    },

    goBack: function() {
        this.props.gotoPage(this.props.back);
    },

    goForward: function() {
        this.props.gotoPage(this.props.forward);
    },

    render: function() {
        var backButton = this.props.back ? <button onClick={this.goBack}>Back</button> : null;
        var forwardButton = this.props.forward ? <button onClick={this.goForward}>{this.props.forwardLabel}</button> : null;
        return (
            <div className="babysitter-app-header">
                <div>{backButton} - SitterDone Header - {forwardButton}</div>
            </div>
        );
    }
});
