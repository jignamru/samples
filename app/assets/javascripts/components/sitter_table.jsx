var SitterTable = React.createClass({

    render: function() {
        var rows = [];
        this.props.sitters.forEach(function(sitter) {
            rows.push(<SitterRow data={sitter} key={sitter.id} />);
        });

        return (
            <div className="sitter-table-wrapper">
                <div>User's Sitters</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
});

var SitterRow = React.createClass({

    render: function() {
        return (
            <tr>
                <td>{this.props.data.firstName} {this.props.data.lastName}</td>
                <td>{this.props.data.emailAddress}</td>
                <td>{this.props.data.phoneNumber}</td>
            </tr>
        );
    }
});
