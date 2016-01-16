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

    getInitialState: function() {
        return {
            errorMessage: null,
            page: 'login'
        };
    },

    handleLogin: function(emailAddress, password) {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/authenticate',
            data: {
                emailAddress: emailAddress,
                password: password
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log("Login successful. Result: ", result);
                this.gotoPage('landing');
            }
        });
    },

    gotoPage: function(page) {
        this.setState(Object.assign(this.state, { page: page }));
        history.pushState(this.state, page, '#' + page);
    },

    componentDidMount: function() {
        // make sure the browser knows which page we're on when we're starting out
        history.pushState(this.state, this.state.page, '#' + this.state.page);
    },

    render: function() {

        var header = this.state.userId ? <BabySitterAppHeader gotoPage={this.gotoPage} /> : null;

        var page;
        if (this.state.page === 'login')
            page = <LoginPage handleLogin={this.handleLogin} />;
        else if (this.state.page === 'landing')
            page = <LandingPage gotoPage={this.gotoPage} />
        else if (this.state.page === 'account_settings')
            page = <AccountSettingsPage gotoPage={this.gotoPage} />

        return (
            <div className="babysitter-app-wrapper">
                {header}
                <div className='error-message'>{this.state.errorMessage}</div>
                {page}
            </div>
        );
    }
});

var BabySitterAppHeader = React.createClass({

    gotoPage: function() {
        this.props.gotoPage('account_settings');
    },

    render: function() {
        return (
            <div className="babysitter-app-header-wrapper">
                <div>SitterDone Header - <button onClick={this.gotoPage}>Account Settings</button></div>
            </div>
        );
    }
});
