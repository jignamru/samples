var AddSitterPage = React.createClass({

    propTypes: {
        loadSitterData: React.PropTypes.func.isRequired
    },

    handleAddSitter: function() {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/add_sitter',
            contentType: 'application/json',
            dataType: 'json',
            data: {
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                emailAddress: this.refs.emailAddress.value,
                phoneNumber: this.refs.phoneNumber.value
            },
            success: function(result)
            {
                window.location.hash = 'manage_sitters';
                this.props.loadSitterData();
            }
        });
    },

    render: function() {
        return (
            <div className="add-sitter-page">
                <BabySitterAppHeader back='landing' />
                Add Sitter Placeholder
                <div className="add-sitter-wrapper">
                    <div>First Name: <input type="text" ref="firstName" /></div>
                    <div>Last Name: <input type="text" ref="lastName" /></div>
                    <div>Email Address: <input type="text" ref="emailAddress" /></div>
                    <div>Phone Number: <input type="text" ref="phoneNumber" /></div>
                    <div>By checking, you acknowledge that you know this person and have permission to contact this person through SitterDone: <input type="checkbox" ref="acknowledgement" onChange={this.handleAcknowledgement} /></div>
                    <button onClick={this.handleAddSitter}>Add New Sitter</button>
                </div>
            </div>
        );
    }
});
