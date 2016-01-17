var AddSitterPage = React.createClass({

    handleAddSitter: function() {
        $.ajax({
            context: this,
            type: 'POST',
            url: '/add_sitter',
            contentType: 'application/json',
            dataType: 'json',
            data: {
                firstName: this.refs.firstName.getDOMNode().value,
                lastName: this.refs.lastName.getDOMNode().value,
                emailAddress: this.refs.emailAddress.getDOMNode().value,
                phoneNumber: this.refs.phoneNumber.getDOMNode().value
            },
            success: function(result)
            {
                console.log("Successfully added sitter. Result: ", result);
                this.props.gotoPage('add_sitter_success');
            }
        });
    },

    render: function() {
        return (
            <div className="add-sitter-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
                Add Sitter Placeholder
                <div className="add-sitter-wrapper">
                    <div>First Name: <input type="text" ref="firstName" /></div>
                    <div>Last Name: <input type="text" ref="lastName" /></div>
                    <div>Email Address: <input type="text" ref="emailAddress" /></div>
                    <div>Phone Number: <input type="text" ref="phoneNumber" /></div>
                    <button onClick={this.handleAddSitter}>Add New Sitter</button>
                </div>
            </div>
        );
    }
});