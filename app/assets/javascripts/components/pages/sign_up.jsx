var SignUpPage = React.createClass({

    propTypes: {
        handleSignUp: React.PropTypes.func.isRequired,
    },

    handleNameChange: function(event) {

    },

    handlePhoneNumberChange: function(event) {

    },

    handleEmailAddressChange: function(event) {

    },

    handlePasswordChange: function(event) {

    },

    handleConfirmPasswordChange: function(event) {

    },

    handleTosAccept: function(event) {

    },

    handleSignUp: function(event) {
        this.props.handleSignUp({
            firstName:    this.refs.firstName.value,
            lastName:     this.refs.lastName.value,
            phoneNumber:  this.refs.phoneNumber.value,
            emailAddress: this.refs.emailAddress.value,
            newPassword:  this.refs.password.value ,
            tosAccept:    this.refs.tosAccept.value
        });
    },

    render: function() {
        return (
            <div className="sign-up-page">
                <h1>Sign-Up</h1>

                <div>First Name: <input type="text" ref="firstName" onChange={this.handleNameChange} /></div>
                <div>Last Name: <input type="text" ref="lastName" onChange={this.handleNameChange} /></div>
                <div>Phone Numbere: <input type="text" ref="phoneNumber" onChange={this.handlePhoneNumberChange} /></div>
                <div>Email Address: <input type="text" ref="emailAddress" onChange={this.handleEmailAddressChange} /></div>
                <div>Password: <input type="password" ref="password" onChange={this.handlePasswordChange} /></div>
                <div>Confirm Password: <input type="password" ref="confirmPassword" onChange={this.handleConfirmPasswordChange} /></div>
                <div>By checking, you acknowledge that you have read and accept the terms of service: <input type="checkbox" ref="tosAccept" onChange={this.handleTosAccept} /></div>
                <button onClick={this.handleSignUp}>Create Account</button>
            </div>
        );
    }
});