// BabysitterApp
// -Header
// --Manage Sitters Button - Manage Sitters Page
// --Account Settings Button -> Account Settings Page
// -Page (see below)

// Pages ----
//   ---error message / notification
// 1. Login Page
//   ---emailInput
//   ---passwordInput
//   ---login button
//   ---forgot password button
// 2. Landing Page
// 3. Request Sitter Details
// 4. Request Status Page
// 5. Account Settings Page
//   ---Log Out
//   ---Buy Tokens
//   ---Documentation
//   ---Support/Contact
// 6. Request History

var BabySitterApp = React.createClass({

    authenticationUrl: 'http://localhost:8080/babysitter/users/authenticate',

    getInitialState: function() {
        return {
            errorMessage: null,
            userId: null,
            page: 'login'
        };
    },

    handleLogin: function(emailAddress, password) {
        $.ajax({
            context: this,
            type: 'POST',
            url: this.authenticationUrl,
            data: {
                emailAddress: emailAddress,
                password: password,
                deviceId: 'a device id'
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log("Login successful. Result: ", result);
                var newState = Object.assign(this.state, { page: 'landing', userId: result.userId });
                this.setState(newState);
            }
        });
    },

    render: function() {

        var page;
        if (this.state.page === 'login')
            page = <LoginPage handleLogin={this.handleLogin} />;
        else if (this.state.page === 'landing')
            page = <LandingPage userId={this.state.userId} />

        return (
            <div className="babysitter-app-wrapper">
                <BabySitterAppHeader />
                <div className='error-message'>{this.state.errorMessage}</div>
                {page}
            </div>
        );
    }
});

var BabySitterAppHeader = React.createClass({
    render: function() {
        return (
            <div className="babysitter-app-header-wrapper">
                <div>SitterDone Header</div>
            </div>
        );
    }
});


