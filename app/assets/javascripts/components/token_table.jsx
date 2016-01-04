var TokenRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.status}</td>
                <td>{this.props.purchaseDate}</td>
                <td>{this.props.redemptionDate}</td>
            </tr>
        );
    }
});

var TokenTable = React.createClass({

    render: function() {
        var rows = [];
        this.props.tokens.forEach(function(token) {
            rows.push(<TokenRow id={token.id} key={token.id} status={token.status} purchaseDate={token.purchaseDate} redemptionDate={token.redemptionDate} />);
        });

        return (
            <div className="token-table-wrapper">
                <div>User's Sitter Tokens</div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Purchase Date</th>
                            <th>Redeemed Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
});
