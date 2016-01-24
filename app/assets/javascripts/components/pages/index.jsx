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

    render: function() {
        return (
            <div className="index-page">
                <h1>SitterDone</h1>
                <div>The easiest way to schedule one of your trusted babysitters.</div>
                <div className="user-login-wrapper">
                    <div>Email: <input type="text" ref="emailAddress" onChange={this.handleEmailChange} /></div>
                    <div>Password: <input type="password" ref="password" onChange={this.handlePasswordChange} /></div>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
                <hr />
                <div>Don't have an account yet? No problem! Sign-up is quick and easy</div>
                <button onClick={this.gotoSignUp}>Sign Up</button>
            </div>
        );
    }
});