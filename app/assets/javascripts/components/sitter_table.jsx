var SitterRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.id}</td>
            </tr>
        );
    }
});

var SitterTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.sitters.forEach(function(sitter) {
            rows.push(<SitterRow id={sitter.id} key={sitter.id} />);
        });

        return (
            <div className="sitter-table-wrapper">
                <div>User's Sitters</div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});
