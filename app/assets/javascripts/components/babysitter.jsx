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

    handleLogout: function() {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/logout',
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log("logout successful. Result: ", result);
                this.gotoPage('login');
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
        var page;
        if (this.state.page === 'login')
            page = <LoginPage handleLogin={this.handleLogin} />;
        else if (this.state.page === 'landing')
            page = <LandingPage gotoPage={this.gotoPage} />
        else if (this.state.page === 'account_settings')
            page = <AccountSettingsPage gotoPage={this.gotoPage} handleLogout={this.handleLogout} />
        else if (this.state.page === 'add_sitter')
            page = <AddSitterPage gotoPage={this.gotoPage} />

        return (
            <div className="babysitter-app-wrapper">
                <div className='error-message'>{this.state.errorMessage}</div>
                {page}
            </div>
        );
    }
});

var BabySitterAppHeader = React.createClass({

    propTypes: {
        back: React.PropTypes.string,
        forward: React.PropTypes.string,
        forwardLabel: React.PropTypes.string,
        gotoPage: React.PropTypes.func
    },

    goBack: function() {
        this.props.gotoPage(this.props.back);
    },

    goForward: function() {
        this.props.gotoPage(this.props.forward);
    },

    render: function() {
        var backButton = this.props.back ? <button onClick={this.goBack}>Back</button> : null;
        var forwardButton = this.props.forward ? <button onClick={this.goForward}>{this.props.forwardLabel}</button> : null;
        return (
            <div className="babysitter-app-header">
                <div>{backButton} - SitterDone Header - {forwardButton}</div>
            </div>
        );
    }
});
