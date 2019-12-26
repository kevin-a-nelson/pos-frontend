import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Client from './client';
import Logger from './logger';


import RegisterNewReader from './Forms/RegisterNewReader.jsx'


import Cart from './components/Cart/Cart.jsx';

import Products from './static/Products';
import Purchase from './components/Purchase/Purchase.jsx';
import EventSelector from './components/EventSelector/EventSelector';
import Success from './components/Success/Success.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'requires_initializing', // requires_connecting || reader_registration || workflows
      backendURL: null,
      discoveredReaders: [],
      connectionStatus: 'not_connected',
      reader: null,
      registrationCode: '',
      cancelablePayment: false,
      chargeAmount: 0,
      taxAmount: 0,
      currency: 'usd',
      workFlowInProgress: null,
      cart: Products,
      showEvents: false,
      selectedEvent: "",
      lineItems: [],
      loadingNewRegister: false,
      unableToConnect: false,
    };
  }

  isWorkflowDisabled = () => this.state.cancelablePayment || this.state.workFlowInProgress;

  runWorkflow = async (workflowFn, args) => {
    this.setState({
      workFlowInProgress: true
    });
    try {
      await workflowFn(args);
    } finally {
      this.setState({
        workFlowInProgress: null
      });
    }
  };

  componentWillMount() {
    this.initializeBackendClientAndTerminal("https://prepnetwork-stripe.herokuapp.com/")
  }

  // 1. Stripe Terminal Initialization
  initializeBackendClientAndTerminal(url) {
    // 1a. Initialize Client class, which communicates with the example terminal backend
    this.client = new Client(url);

    // 1b. Initialize the StripeTerminal object
    this.terminal = window.StripeTerminal.create({
      // 1c. Create a callback that retrieves a new ConnectionToken from the example backend
      onFetchConnectionToken: async () => {
        let connectionTokenResult = await this.client.createConnectionToken();
        return connectionTokenResult.secret;
      },
      // 1c. (Optional) Create a callback that will be called if the reader unexpectedly disconnects.
      // You can use this callback to alert your user that the reader is no longer connected and will need to be reconnected.
      onUnexpectedReaderDisconnect: Logger.tracedFn(
        'onUnexpectedReaderDisconnect',
        'https://stripe.com/docs/terminal/js-api-reference#stripeterminal-create',
        () => {
          alert('Unexpected disconnect from the reader');
          this.setState({
            connectionStatus: 'not_connected',
            reader: null
          });
        }
      ),
      // 1c. (Optional) Create a callback that will be called when the reader's connection status changes.
      // You can use this callback to update your UI with the reader's connection status.
      onConnectionStatusChange: Logger.tracedFn(
        'onConnectionStatusChange',
        'https://stripe.com/docs/terminal/js-api-reference#stripeterminal-create',
        ev => {
          this.setState({ connectionStatus: ev.status, reader: null });
        }
      )
    });
    Logger.watchObject(this.client, 'backend', {
      createConnectionToken: {
        docsUrl: 'https://stripe.com/docs/terminal/sdk/js#connection-token'
      },
      registerDevice: {
        docsUrl: 'https://stripe.com/docs/terminal/readers/connecting/verifone-p400#register-reader'
      },
      createPaymentIntent: {
        docsUrl: 'https://stripe.com/docs/terminal/payments#create'
      },
      capturePaymentIntent: {
        docsUrl: 'https://stripe.com/docs/terminal/payments#capture'
      },
      savePaymentMethodToCustomer: {
        docsUrl: 'https://stripe.com/docs/terminal/payments/saving-cards'
      }
    });
    Logger.watchObject(this.terminal, 'terminal', {
      discoverReaders: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#discover-readers'
      },
      connectReader: {
        docsUrl: 'docs/terminal/js-api-reference#connect-reader'
      },
      disconnectReader: {
        docsUrl: 'docs/terminal/js-api-reference#disconnect'
      },
      setReaderDisplay: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#set-reader-display'
      },
      collectPaymentMethod: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#collect-payment-method'
      },
      cancelCollectPaymentMethod: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#cancel-collect-payment-method'
      },
      processPayment: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#process-payment'
      },
      readReusableCard: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#read-reusable-card'
      },
      cancelReadReusableCard: {
        docsUrl: 'https://stripe.com/docs/terminal/js-api-reference#cancel-read-reusable-card'
      }
    });
  }

  // 2. Discover and connect to a reader.
  discoverReaders = async () => {
    // 2a. Discover registered readers to connect to.
    const discoverResult = await this.terminal.discoverReaders();
    this.setState({ unableToConnect: false })
    this.setState({ loadingNewRegister: true })
    if (discoverResult.error) {
      console.log('Failed to discover: ', discoverResult.error);
      this.setState({ unableToConnect: true })
      this.setState({ loadingNewRegister: false })
      return discoverResult.error;
    } else {
      this.setState({
        discoveredReaders: discoverResult.discoveredReaders
      });
      this.setState({ loadingNewRegister: false })
      return discoverResult.discoveredReaders;
    }
  };

  connectToReader = async selectedReader => {
    console.log("Connecting to reader")
    // 2b. Connect to a discovered reader.
    const connectResult = await this.terminal.connectReader(selectedReader);
    if (connectResult.error) {
      console.log('Failed to connect:', connectResult.error);
    } else {
      this.setState({
        status: 'workflows',
        discoveredReaders: [],
        reader: connectResult.reader,
        showEvents: true
      });
      return connectResult;
    }
  };

  disconnectReader = async () => {
    // 2c. Disconnect from the reader, in case the user wants to switch readers.
    this.setState({ showEvents: false })
    await this.terminal.disconnectReader();
    this.setState({
      reader: null,
      cart: Products
    });
  };

  registerAndConnectNewReader = async (registrationCode) => {
    try {
      let reader = await this.client.registerDevice({
        registrationCode
      });
      // After registering a new reader, we can connect immediately using the reader object returned from the server.
      await this.connectToReader(reader);
    } catch (e) {
      console.log(e)
      console.log("Unable to Register and Connect");
      // Suppress backend errors since they will be shown in logs
    }
  };

  // 3. Terminal Workflows (Once connected to a reader)
  updateLineItems = async () => {

    // set lineItems to label, price and quantity of items in cart
    let lineItems = []
    this.state.cart.forEach((item) => {
      if (item.quantity > 0) {
        let displayItem = {
          "description": item.label,
          "amount": item.price * 100,
          "quantity": item.quantity
        }
        lineItems.push(displayItem)
      }
    })

    this.setState({
      lineItems,
      showFinish: true
    })

    // 3a. Update the reader display to show cart contents to the customer
    await this.terminal.setReaderDisplay({
      type: 'cart',
      cart: {
        line_items: lineItems,
        tax: this.state.taxAmount,
        total: this.state.chargeAmount * 100 + this.state.taxAmount,
        currency: this.state.currency
      }
    });
    console.log('Reader Display Updated!');
    return;
  };

  // 3b. Collect a card present payment
  collectCardPayment = async () => {
    // We want to reuse the same PaymentIntent object in the case of declined charges, so we
    // store the pending PaymentIntent's secret until the payment is complete.

    const { selectedEvent, lineItems } = this.state

    let lineItemsStr = ""

    lineItems.forEach((lineItem) => {
      lineItemsStr += `${lineItem.description} (${lineItem.quantity}), `
    })

    let description = `${selectedEvent.title} - ${lineItemsStr}`
    if (!this.pendingPaymentIntentSecret) {
      try {
        let createIntentResponse = await this.client.createPaymentIntent({
          amount: this.state.chargeAmount * 100 + this.state.taxAmount,
          currency: this.state.currency,
          description: description,
        });
        this.pendingPaymentIntentSecret = createIntentResponse.secret;
      } catch (e) {
        // Suppress backend errors since they will be shown in logs
        return;
      }
    }
    // Read a card from the customer
    const paymentMethodPromise = this.terminal.collectPaymentMethod(this.pendingPaymentIntentSecret);
    this.setState({ cancelablePayment: true });
    console.log(this.state.cancelablePayment)
    const result = await paymentMethodPromise;
    if (result.error) {
      console.log('Collect payment method failed:', result.error.message);
    } else {
      const confirmResult = await this.terminal.processPayment(result.paymentIntent);
      console.log(confirmResult)
      // At this stage, the payment can no longer be canceled because we've sent the request to the network.
      this.setState({ cancelablePayment: false });
      if (confirmResult.error) {
        alert(`Confirm failed: ${confirmResult.error.message}`);
      } else if (confirmResult.paymentIntent) {
        try {
          // Capture the PaymentIntent from your backend client and mark the payment as complete
          let captureResult = await this.client.capturePaymentIntent({
            paymentIntentId: confirmResult.paymentIntent.id
          });
          this.pendingPaymentIntentSecret = null;
          // Reset all quantity of items to 0
          const cart = this.state.cart
          cart.forEach((item) => item.quantity = 0)
          this.setState({ cart })
          console.log('Payment Successful!');
          this.setState({ success: true, chargeAmount: 0 });
          setTimeout(
            function () {
              this.setState({ success: false });
              this.setState({ showFinish: false });
            }.bind(this),
            2000
          );
          return captureResult;
        } catch (e) {
          // Suppress backend errors since they will be shown in logs
          return;
        }
      }
    }
  };

  // 3c. Cancel a pending payment.
  // Note this can only be done before calling `processPayment`.
  cancelPendingPayment = async () => {
    await this.terminal.cancelCollectPaymentMethod();
    this.pendingPaymentIntentSecret = null;
    this.setState({ cancelablePayment: false });
  };

  updateChargeAmount = amount => this.setState({ chargeAmount: parseInt(amount, 10) });
  updateItemDescription = description => this.setState({ itemDescription: description });
  updateTaxAmount = amount => this.setState({ taxAmount: parseInt(amount, 10) });
  updateCurrency = currency => this.setState({ currency: currency });
  updateSelectedEvent = event => this.setState({ selectedEvent: event });
  updateShowEvents = bool => this.setState({ showEvents: bool });
  updateCart = cart => this.setState({ cart: cart })
  updateShowFinish = bool => this.setState({ showFinish: bool })
  updateSuccess = bool => this.setState({ success: bool })

  updateLineItemsHelper = async () => {
    this.runWorkflow(this.updateLineItems);
  };

  collectCardPaymentHelper = async () => {
    this.runWorkflow(this.collectCardPayment)
  }

  registerAndConnectNewReaderHelper = async (registrationCode) => {
    this.runWorkflow(
      this.registerAndConnectNewReader,
      [registrationCode]
    )
  }

  render() {
    const { cart, chargeAmount, workFlowInProgress } = this.state;

    return (
      <div className="main-page" >
        <Router>
          <Switch>
            <Route path="/events">
              <EventSelector
                updateSelectedEvent={this.updateSelectedEvent}
                workFlowInProgress={workFlowInProgress}
              />
            </Route>
            <Route path="/checkout">
              <Cart
                cart={cart}
                updateCart={this.updateCart}
                chargeAmount={chargeAmount}
                updateChargeAmount={this.updateChargeAmount}
                updateLineItems={this.updateLineItemsHelper}
                workFlowInProgress={workFlowInProgress}
              />
            </Route>
            <Route path="/purchase">
              <Purchase
                collectCardPayment={this.collectCardPaymentHelper}
                workFlowInProgress={workFlowInProgress}
              />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/">
              <RegisterNewReader
                onSubmitRegister={this.registerAndConnectNewReaderHelper}
                workFlowInProgress={workFlowInProgress}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;