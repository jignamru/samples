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
                this.loadUserAndSitterData();
                window.location.hash = 'landing';
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
                window.location.hash = 'login';
            }
        });
    },

    gotoPage: function(page) {
        // update the state of the component as well as the session
        this.setState(Object.assign(this.state, { page: page, previousPage: this.state.page }));
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
                // hacky, but force a reload of the page if we have gone to the buy tokens page to make the stripe button appear
                if (page === 'buy_tokens') {
                    location.reload();
                }
            }
        });
    },

    navigate: function() {
        // parse the page out of the hash
        var pageHash = window.location.hash;
        var pageMatch = pageHash.match(/#(\w+)/);
        var page = pageMatch[1];

        console.log("Navigating to page: ", page);
        console.log("Previous page: ", this.state.page);

        // goto the page we parsed
        this.gotoPage(page);
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
        // start loading the user data
        this.loadUserAndSitterData();

        // add a window listener to detect hash changes; this is how we navigate
        window.addEventListener('hashchange', this.navigate, false);

        // make sure the browser knows which page we're on when we're starting out
        window.location.hash = this.state.page;
    },

    componentWillUnmount: function() {
        // unregister the hash change listener
        window.removeEventListener('hashchange', this.navigate);
    },

    render: function() {
        var page;
        if (this.state.page === 'login')
            page = <LoginPage handleLogin={this.handleLogin} />;
        else if (this.state.page === 'landing')
            page = <LandingPage userData={this.state.userData} sitterData={this.state.sitterData} />
        else if (this.state.page === 'account_settings')
            page = <AccountSettingsPage handleLogout={this.handleLogout} />
        else if (this.state.page === 'add_sitter')
            page = <AddSitterPage />
        else if (this.state.page === 'manage_sitters')
            page = <ManageSittersPage sitterData={this.state.sitterData} />
        else if (this.state.page === 'schedule_sitter')
            page = <ScheduleSitterPage />
        else if (this.state.page === 'about_us')
            page = <AboutUsPage />
        else if (this.state.page === 'contact_support')
            page = <ContactSupportPage />
        else if (this.state.page === 'documentation')
            page = <DocumentationPage />
        else if (this.state.page === 'buy_tokens')
            page = <BuyTokensPage authenticityToken={this.props.authenticityToken} />
        else if (this.state.page === 'purchase_confirmation')
            page = <PurchaseConfirmationPage />
        else
            page = <NotFoundPage comingFrom={this.state.previousPage} />;

        return (
            <div className="babysitter-app-wrapper">
                <div className='error-message'>{this.state.errorMessage}</div>
                {page}
            </div>
        );
    }
});
