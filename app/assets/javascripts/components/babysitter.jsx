// BabysitterApp
// -Header
// --Manage Sitters Button - Manage Sitters Page
// --Account Settings Button -> Account Settings Page
// -Page (see below)

// Pages ----
//   ---error message / notification
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
            previousPage: this.props.initialPage,
            page:         this.props.initialPage,
            userData:     {},
            sitterData:   []
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
                $('meta[name="csrf-token"]').attr('content', result['newCSRFToken']);
                this.gotoPage('landing');
                this.loadUserAndSitterData();
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
                $('meta[name="csrf-token"]').attr('content', result['newCSRFToken']);
                this.replaceState(this.getInitialState());
                this.gotoPage('login');
            }
        });
    },

    gotoPage: function(page) {
        console.log("Navigating to page: ", page);
        console.log("Previous page: ", this.state.page);
        this.setState(Object.assign(this.state, { page: page, previousPage: this.state.page }));
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

    loadUserAndSitterData: function() {
        // fetch user data
        $.get('/user', function(result) {
            this.setState(Object.assign(this.state, { userData: result }));
        }.bind(this));

        // fetch sitters for this user
        $.get('/sitters', function(result) {
            this.setState(Object.assign(this.state, { sitterData: result }));
        }.bind(this));
    },

    componentDidMount: function() {
        // make sure the browser knows which page we're on when we're starting out
        history.pushState(this.state, this.state.page, '#' + this.state.page);
        this.loadUserAndSitterData();
    },

    render: function() {
        var page;
        if (this.state.page === 'login')
            page = <LoginPage handleLogin={this.handleLogin} />;
        else if (this.state.page === 'landing')
            page = <LandingPage gotoPage={this.gotoPage} userData={this.state.userData} sitterData={this.state.sitterData} />
        else if (this.state.page === 'account_settings')
            page = <AccountSettingsPage gotoPage={this.gotoPage} handleLogout={this.handleLogout} />
        else if (this.state.page === 'add_sitter')
            page = <AddSitterPage gotoPage={this.gotoPage} />
        else if (this.state.page === 'manage_sitters')
            page = <ManageSittersPage gotoPage={this.gotoPage} sitterData={this.state.sitterData} />
        else if (this.state.page === 'about_us')
            page = <AboutUsPage gotoPage={this.gotoPage} />
        else if (this.state.page === 'contact_support')
            page = <ContactSupportPage gotoPage={this.gotoPage} />
        else if (this.state.page === 'documentation')
            page = <DocumentationPage gotoPage={this.gotoPage} />
        else
            page = <NotFoundPage comingFrom={this.state.previousPage} gotoPage={this.gotoPage} />;

        return (
            <div className="babysitter-app-wrapper">
                <div className='error-message'>{this.state.errorMessage}</div>
                {page}
            </div>
        );
    }
});
