var IndexPage = React.createClass({

    propTypes: {
        handleLogin: React.PropTypes.func.isRequired
    },

    handleLogin: function() {
        this.props.handleLogin(this.refs.emailAddress.value, this.refs.password.value);
    },

    gotoSignUp: function() {
        window.location.hash = 'sign_up';
    },

    componentDidMount: function() {
        // TODO add a key press even listener to password for 'ENTER/RETURN'

    },

    componentWillUnmount: function() {
        // TODO remove key press listener

    },


    render: function() {
        return (
            <div className="index-page">
                <h1 className="title">SitterDone</h1>
                <div className="sub-title">The easiest way to schedule one of your trusted babysitters.</div>
                <div className="user-login-wrapper">
                    <table>
                        <tr className="input-wrapper">
                            <td><label>Email:</label></td>
                            <td><input type="text" ref="emailAddress" onChange={this.handleEmailChange} /></td>
                        </tr>
                        <tr className="input-wrapper">
                            <td><label>Password: </label></td>
                            <td><input type="password" ref="password" onChange={this.handlePasswordChange} /></td>
                        </tr>
                    </table>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
                <hr />
                <div><em>Don't have an account yet? No problem! Sign-up is quick and easy</em></div>
                <button onClick={this.gotoSignUp}>Sign Up</button>
            </div>
        );
    }
});