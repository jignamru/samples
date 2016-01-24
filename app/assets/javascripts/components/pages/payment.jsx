var PaymentPage = React.createClass({

    propTypes: {
        authenticityToken: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <div className="buy-tokens-page">
                <BabySitterAppHeader back='buy_tokens' />
                <h1>Buy Tokens</h1>
                <div>
                    We use Stripe IO to handle your payment. Your credit card is not sent or stored on our servers, and your information is transmitted to Stripe over HTTPS. We are committed to your privacy and protection.
                </div>
                <div>
                    <form action="/charge" method="POST">
                      <input type="hidden" name="authenticity_token" value={this.props.authenticityToken} />
                      <script
                        src="https://checkout.stripe.com/checkout.js" className="stripe-button"
                        data-key="pk_test_DFBtMYDJOssZa2Aq9tTRkLxm"
                        data-image="/img/documentation/checkout/marketplace.png"
                        data-name="Demo Site"
                        data-description="2 widgets"
                        data-amount="2000"
                        data-locale="auto">
                      </script>
                    </form>
                </div>
            </div>
        );
    }
});