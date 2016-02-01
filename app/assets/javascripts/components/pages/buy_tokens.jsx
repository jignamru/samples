var BuyTokensPage = React.createClass({

// TODO look up types
//    propTypes: {
//        paymentPlans: React.PropTypes.object.isRequired
//    },

    handleProceedToPayment: function() {
        console.log("Loading the stripe form...");
        $.ajax({
            context: this,
            type: 'GET',
            url: '/payment',
            data: {
                page: page
            },
            contentType: 'application/json',
            dataType: 'json',
            success: function(result)
            {
                console.log(result);
            }
        });
    },

    render: function() {
        var rows = [];
        var options= [];
        this.props.paymentPlans.forEach(function(paymentPlan) {
            rows.push(<PaymentPlanRow paymentPlan={paymentPlan} key={'ppr-' + paymentPlan.plan} />);
            options.push(<option value={paymentPlan.plan} key={'ppo-' + paymentPlan.plan}>{paymentPlan.numberOfTokens}</option>);
        });

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
                            <th>Select</th>
                            <th># of tokens</th>
                            <th>Total cost</th>
                            <th>Cost per token</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <div>How many tokens would you like to purchase?</div>
                <select>
                    {options}
                </select>

                <button onClick={this.handleProceedToPayment}>Buy Tokens</button>

                <div className="stripe-form-wrapper"></div>

            </div>
        );
    }
});

var PaymentPlanRow = React.createClass({

    propTypes: {
        paymentPlan: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <tr>
                <td></td>
                <td>{this.props.paymentPlan.numberOfTokens}</td>
                <td>{this.props.paymentPlan.costInDollars}</td>
                <td>{this.props.paymentPlan.costInDollars / this.props.paymentPlan.numberOfTokens}</td>
            </tr>
        );
    }
});
