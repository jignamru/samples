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
        var backButton = this.props.back ? <a className="back" onClick={this.goBack}>&lt;&lt;Back</a> : null;
        var forwardButton = this.props.forward ? <a className="forward" onClick={this.goForward}>{this.props.forwardLabel}&gt;&gt;</a> : null;
        return (
            <div className="babysitter-app-header">
                <table>
                    <tr>
                        <td className="button-wrapper-left">{backButton}</td>
                        <td className="title-wrapper">SitterDone</td>
                        <td className="button-wrapper-right">{forwardButton}</td>
                    </tr>
                </table>
            </div>
        );
    }
});
