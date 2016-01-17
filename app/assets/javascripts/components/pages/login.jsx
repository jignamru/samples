var LoginPage = React.createClass({
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
    getInitialState: function() {
        return {
            email: '',
            password: ''
        };
    },

    handleEmailChange: function(event) {
        this.setState(Object.assign(this.state, { email: event.target.value }));
    },

    handlePasswordChange: function(event) {
        this.setState(Object.assign(this.state, { password: event.target.value }));
    },

    handleLogin: function() {
        this.props.handleLogin(this.state.email, this.state.password);
    },

    render: function() {
        return (
            <div className="user-login-wrapper">
                <div>Email: <input type="text" onChange={this.handleEmailChange} onLoad={this.handleEmailChange} value={this.state.email} /></div>
                <div>Password: <input type="password" onChange={this.handlePasswordChange} value={this.state.password} /></div>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
});