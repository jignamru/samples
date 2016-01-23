var IndexPage = React.createClass({

    gotoLogin: function() {
        window.location.hash = 'login';
    },

    gotoSignUp: function() {
        window.location.hash = 'sign_up';
    },

    render: function() {
        return (
            <div className="index-page">
                <div>Sitter Done!</div>
                <button onClick={this.gotoLogin}>Login</button>
                <button onClick={this.gotoSignUp}>Sign Up</button>
            </div>
        );
    }
});