var AddSitterPage = React.createClass({
    render: function() {
        return (
            <div className="add-sitter-page">
                <BabySitterAppHeader back='landing' gotoPage={this.props.gotoPage} />
                Add Sitter Placeholder
                <div className="add-sitter-wrapper">
                    <div>First Name: <input type="text" name="firstName" /></div>
                    <div>Last Name: <input type="text" name="lastName" /></div>
                    <div>Email Address: <input type="text" name="emailAddress" /></div>
                    <div>Phone Number: <input type="text" name="phoneNumber" /></div>
                </div>
            </div>
        );
    }
});