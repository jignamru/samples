var SitterTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.sitters.forEach(function(sitter) {
            console.log(sitter);
            rows.push(<SitterRow data={sitter} key={sitter.id} />);
        });

        return (
            <div className="sitter-table-wrapper">
                <div>User's Sitters</div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});

var SitterRow = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.data
        };
    },

    render: function() {
        return (
            <tr>
                <td>{this.state.data.id}</td>
                <td>{this.state.data.firstName} {this.state.data.lastName}</td>
                <td>{this.state.data.emailAddress}</td>
                <td>{this.state.data.phoneNumber}</td>
            </tr>
        );
    }
});
