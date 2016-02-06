var BabySitterAppHeader = React.createClass({

    propTypes: {
        back: React.PropTypes.string,
        forward: React.PropTypes.string,
        forwardLabel: React.PropTypes.string
    },

    goBack: function() {
        window.location.hash = this.props.back;
    },

    goForward: function() {
        window.location.hash = this.props.forward;
    },

    render: function() {
        var backButton = this.props.back ? <button className="back" onClick={this.goBack}>Back</button> : null;
        var forwardButton = this.props.forward ? <button className="forward" onClick={this.goForward}>{this.props.forwardLabel}</button> : null;
        return (
            <div className="babysitter-app-header">
                <div className="button-wrapper-left">{backButton}</div>
                <div className="title">SitterDone</div>
                <div className="button-wrapper-right">{forwardButton}</div>
            </div>
        );
    }
});
