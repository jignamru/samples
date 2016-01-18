// TODO forgot password

var LoginPage = React.createClass({

    propTypes: {
        handleLogin: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <div className='login-page'>
                <BabySitterLogin handleLogin={this.props.handleLogin} />
            </div>
        );
    }
});

// TODO the form will still have a value in the email field after a page refresh, but this isn't finding it's way into state
var BabySitterLogin = React.createClass({

    propTypes: {
        handleLogin: React.PropTypes.func.isRequired
    },

    handleEmailChange: function(event) {
        // TODO use this for validation
    },

    handlePasswordChange: function(event) {
        // TODO use this for validation
    },

    handleLogin: function() {
        this.props.handleLogin(this.refs.emailAddress.value, this.refs.password.value);
    },

    render: function() {
        return (
            <div className="user-login-wrapper">
                <div>Email: <input type="text" ref="emailAddress" onChange={this.handleEmailChange} /></div>
                <div>Password: <input type="password" ref="password" onChange={this.handlePasswordChange} /></div>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
});