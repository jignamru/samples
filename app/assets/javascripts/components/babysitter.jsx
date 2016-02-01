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

    handleSignUp: function(data) {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/sign_up',
            data: data,
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
                console.log("Login successful. Redirecting to landing page.");
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
                window.location = '/';
            }
        });
    },

    gotoPage: function(page) {
        // update the state of the component as well as the session
        console.log("Navigating to page: ", page);
        console.log("Old state: ", this.state);
        this.setState(Object.assign(this.state, { page: page, previousPage: this.state.page }));
        console.log("New state: ", this.state);
        $.ajax({
            context: this,
            type: 'POST',
            url: '/goto_page',
            data: {
                page: page
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result) {}
        });
    },

    // Do not modify the page hash in this method otherwise an infinite loop could occur
    navigate: function() {
        console.log("'navigate' was triggered.");

        // parse the page out of the hash
        var pageHash = window.location.hash;
        console.log('navigate - page hash: ', pageHash);

        if (null != pageHash)
        {
            var pageMatch = pageHash.match(/#(\w+)/);
            var page = pageMatch[1];

            console.log("Navigating to page: ", page);

            // goto the page we parsed
            this.gotoPage(page);
        }
    },

    loadUserAndSitterData: function() {
        // fetch user data
        console.log("Loading user data...")
        $.get('/user', function(result) {
            this.setState(Object.assign(this.state, { userData: result }));
        }.bind(this));

        this.loadSitterData();
    },

    loadSitterData: function() {
        // fetch sitters for this user
        console.log("Loading sitter data...");
        $.get('/sitters', function(result) {
            this.setState(Object.assign(this.state, { sitterData: result }));
        }.bind(this));
    },

    componentDidMount: function() {
        console.log("componentDidMount - page location: ", window.location.pathname);
        console.log("componentDidMount - page hash: ", window.location.hash);

        // start loading the user data
        if (null != this.state.page) {
            this.loadUserAndSitterData();
        }

        // add a window listener to detect hash changes; this is how we navigate
        window.addEventListener('hashchange', this.navigate, false);

        // make sure the browser knows which page we're on when we're starting out
        if (null != this.state.page)
        {
            console.log("componentDidMount - setting window location hash to: ", this.state.page);
            window.location.hash = this.state.page;
        }
    },

    componentWillUnmount: function() {
        // unregister the hash change listener
        window.removeEventListener('hashchange', this.navigate);
    },

    render: function() {
        var page;
        console.log("render - state.page: ", this.state.page);
        if (this.state.page === 'landing')
            page = <LandingPage userData={this.state.userData} sitterData={this.state.sitterData} />
        else if (this.state.page === 'account_settings')
            page = <AccountSettingsPage handleLogout={this.handleLogout} />
        else if (this.state.page === 'add_sitter')
            page = <AddSitterPage loadSitterData={this.loadSitterData} />
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
            page = <BuyTokensPage paymentPlans={this.props.paymentPlans} />
        else if (this.state.page === 'purchase_confirmation')
            page = <PurchaseConfirmationPage />
        else if (this.state.page === 'sign_up')
            page = <SignUpPage handleSignUp={this.handleSignUp} />
        else if (null == this.state.pate || this.state.page === '')
            page = <IndexPage handleLogin={this.handleLogin} />
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
