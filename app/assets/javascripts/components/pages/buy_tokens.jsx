var BuyTokensPage = React.createClass({
    render: function() {
        return (
            <div className="buy-tokens-page">
                <BabySitterAppHeader back='landing' />
                Buy Tokens Placeholder

                <form action="/charge" method="POST">
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
        );
    }
});
