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
            page: this.props.initialPage
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
        $.ajax({
            context: this,
            type: 'POST',
            url: '/goto_page',
            data: {
                page: page
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log("Page saved to session.");
            }
        });
    },

    componentDidMount: function() {
        // make sure the browser knows which page we're on when we're starting out
        history.pushState(this.state, this.state.page, '#' + this.state.page);
    },

    render: function() {

        var header = this.state.page && this.state.page !== 'login' ? <BabySitterAppHeader page={this.state.page} gotoPage={this.gotoPage} /> : null;

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

    gotoLanding: function() {
        this.props.gotoPage('landing');
    },

    gotoAccountSettings: function() {
        this.props.gotoPage('account_settings');
    },

    render: function() {
        var homeButton = this.props.page !== 'landing' ? <button onClick={this.gotoLanding}>Home</button> : null;
        var accountButton = this.props.page !== 'account_settings' ? <button onClick={this.gotoAccountSettings}>Account</button> : null;
        return (
            <div className="babysitter-app-header-wrapper">
                <div>{homeButton} - SitterDone Header - {accountButton}</div>
            </div>
        );
    }
});
