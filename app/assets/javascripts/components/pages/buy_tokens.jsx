var BuyTokensPage = React.createClass({

    handleProceedToPayment: function() {
        window.location.hash = 'payment';
    },

    render: function() {
        return (
            <div className="buy-tokens-page">
                <BabySitterAppHeader back='landing' />
                <h1>Buy Tokens</h1>
                <div>
                    What are tokens? Tokens are a way to schedule sitters. For each token, we'll automatically contact up to 5 of your sitters to see if they're available when you need them. We handle all the back and forth for you.
                </div>
                
                <div>
                    Why tokens? Because we don't want you to have to subscribe to yet another service - we'd rather let you pay for what you need and nothing more. We hope you love SitterDone, but we're genuinely looking to make your life easier. Another subscription isn't a good way to do that.
                </div>

                <div>The more tokens you buy, the cheaper each token is.</div>

                <table>
                    <thead>
                        <tr>
                            <th># of tokens</th>
                            <th>Total cost</th>
                            <th>Cost per token</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>$1.00</td>
                            <td>$1.00</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>$3.50</td>
                            <td>$0.70</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>$6.00</td>
                            <td>$0.60</td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td>$10</td>
                            <td>$0.50</td>
                        </tr>
                        <tr>
                            <td>50</td>
                            <td>$20</td>
                            <td>$0.40 (best value!)</td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={this.handleProceedToPayment}>Proceed to payment</button>
            </div>
        );
    }
});
