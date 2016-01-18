var SitterTable = React.createClass({

    propTypes: {
        sitterData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var rows = [];
        this.props.sitterData.forEach(function(sitter) {
            rows.push(<SitterRow sitter={sitter} key={sitter.id} />);
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

    propTypes: {
        sitter: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <tr>
                <td>{this.props.sitter.firstName} {this.props.sitter.lastName}</td>
                <td>{this.props.sitter.emailAddress}</td>
                <td>{this.props.sitter.phoneNumber}</td>
            </tr>
        );
    }
});
