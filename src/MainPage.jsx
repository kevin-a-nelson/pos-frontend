import React, { Component } from 'react';

import Client from './client';
import Logger from './logger';

import BackendURLForm from './Forms/BackendURLForm.jsx';
import CommonWorkflows from './Forms/CommonWorkflows.jsx';
import CartForm from './Forms/CartForm.jsx';
import ConnectionInfo from './ConnectionInfo/ConnectionInfo.jsx';
import Readers from './Forms/Readers.jsx';

import Button from './components/Button/Button.jsx';
import Group from './components/Group/Group.jsx';
import Icon from './components/Icon/Icon.jsx';
import Section from './components/Section/Section.jsx';
import Text from './components/Text/Text.jsx';
import Products from './static/Products';

import { css } from 'emotion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'requires_initializing', // requires_connecting || reader_registration || workflows
      backendURL: null,
      discoveredReaders: [],
      connectionStatus: 'not_connected',
      reader: null,
      readerLabel: '',
      registrationCode: '',
      cancelablePayment: false,
      chargeAmount: 0,
      itemDescription: 'Red t-shirt',
      itemQuantitys: {},
      taxAmount: 0,
      currency: 'usd',
      workFlowInProgress: null,
      showFinish: false,
      success: false,
      cart: Products
    };
  }

  isWorkflowDisabled = () => this.state.cancelablePayment || this.state.workFlowInProgress;

  runWorkflow = async (workflowName, workflowFn) => {
    console.log(workflowName, workflowFn);
    this.setState({
      workFlowInProgress: workflowName
    });
    try {
      await workflowFn();
    } finally {
      this.setState({
        workFlowInProgress: null
      });
    }
  };

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

    if (discoverResult.error) {
      console.log('Failed to discover: ', discoverResult.error);
      return discoverResult.error;
    } else {
      this.setState({
        discoveredReaders: discoverResult.discoveredReaders
      });
      return discoverResult.discoveredReaders;
    }
  };

  connectToSimulator = async () => {
    const simulatedResult = await this.terminal.discoverReaders({
      simulated: true
    });
    await this.connectToReader(simulatedResult.discoveredReaders[0]);
  };

  connectToReader = async selectedReader => {
    // 2b. Connect to a discovered reader.
    const connectResult = await this.terminal.connectReader(selectedReader);
    if (connectResult.error) {
      console.log('Failed to connect:', connectResult.error);
    } else {
      this.setState({
        status: 'workflows',
        discoveredReaders: [],
        reader: connectResult.reader
      });
      return connectResult;
    }
  };

  disconnectReader = async () => {
    // 2c. Disconnect from the reader, in case the user wants to switch readers.
    await this.terminal.disconnectReader();
    this.setState({
      reader: null
    });
  };

  registerAndConnectNewReader = async (label, registrationCode) => {
    try {
      let reader = await this.client.registerDevice({
        label,
        registrationCode
      });
      // After registering a new reader, we can connect immediately using the reader object returned from the server.
      await this.connectToReader(reader);
      console.log('Registered and Connected Successfully!');
    } catch (e) {
      // Suppress backend errors since they will be shown in logs
    }
  };

  getSiteData = async (label, registrationCode) => {
    try {
      let reader = await this.client.registerDevice({
        label,
        registrationCode
      });
      // After registering a new reader, we can connect immediately using the reader object returned from the server.
      await this.connectToReader(reader);
      console.log('Registered and Connected Successfully!');
    } catch (e) {
      // Suppress backend errors since they will be shown in logs
    }
  };

  // 3. Terminal Workflows (Once connected to a reader)
  updateLineItems = async () => {
    // 3a. Update the reader display to show cart contents to the customer
    await this.terminal.setReaderDisplay({
      type: 'cart',
      cart: {
        line_items: [
          {
            description: this.state.itemDescription,
            amount: this.state.chargeAmount,
            quantity: 1
          }
        ],
        tax: this.state.taxAmount,
        total: this.state.chargeAmount + this.state.taxAmount,
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
    if (!this.pendingPaymentIntentSecret) {
      try {
        let createIntentResponse = await this.client.createPaymentIntent({
          amount: this.state.chargeAmount + this.state.taxAmount,
          currency: this.state.currency,
          description: 'Test Charge'
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
    const result = await paymentMethodPromise;
    if (result.error) {
      console.log('Collect payment method failed:', result.error.message);
    } else {
      const confirmResult = await this.terminal.processPayment(result.paymentIntent);
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
          console.table(cart);
          console.log('Payment Successful!');
          this.setState({ success: true, chargeAmount: 0 });
          setTimeout(
            function () {
              this.setState({ success: false });
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

  // 3d. Save a card for re-use online.
  saveCardForFutureUse = async () => {
    // First, read a card without charging it using `readReusableCard`
    const readResult = await this.terminal.readReusableCard();
    if (readResult.error) {
      alert(`readReusableCard failed: ${readResult.error.message}`);
    } else {
      try {
        // Then, pass the payment method to your backend client to save it to a customer
        let customer = await this.client.savePaymentMethodToCustomer({
          paymentMethodId: readResult.payment_method.id
        });
        console.log('Payment method saved to customer!', customer);
        return customer;
      } catch (e) {
        // Suppress backend errors since they will be shown in logs
        return;
      }
    }
  };

  /* Functions used for products */
  addItemToCart = async item => {
    console.log(item);
    const cart = this.state.cart;
    cart.push(item);
    this.setState({ cart });
    this.calculateTotal(cart)
  };

  addQuantity = (index) => {
    const cart = this.state.cart;
    cart[index].quantity = cart[index].quantity + 1;
    this.setState({ cart })
    this.calculateTotal(cart)
  }

  removeQuantity = (index) => {
    const cart = this.state.cart;
    if (cart[index].quantity - 1 >= 0) {
      cart[index].quantity = cart[index].quantity - 1;
    }
    this.setState({ cart })
    this.calculateTotal(cart)
  }

  calculateTotal(items) {
    let chargeAmount = 0;
    items.forEach((item) => {
      chargeAmount += item.price * item.quantity
    })
    this.setState({ chargeAmount })
  }

  // 4. UI Methods
  onSetBackendURL = url => {
    if (url !== null) {
      window.localStorage.setItem('terminal.backendUrl', url);
    } else {
      window.localStorage.removeItem('terminal.backendUrl');
    }
    this.initializeBackendClientAndTerminal(url);
    this.setState({ backendURL: url });
  };
  updateChargeAmount = amount => this.setState({ chargeAmount: parseInt(amount, 10) });
  updateItemDescription = description => this.setState({ itemDescription: description });
  updateTaxAmount = amount => this.setState({ taxAmount: parseInt(amount, 10) });
  updateCurrency = currency => this.setState({ currency: currency });

  updateCart = async () => {
    this.runWorkflow('updateLineItems', this.updateLineItems);
    this.setState({ showFinish: true });
  };

  renderForm() {
    const { cart } = this.state
    let ProductGrid;
    if (cart && cart.length > 0) {
      ProductGrid = cart.map((item, index) => (
        <div
          className={`item-option ${cart.find(cartItem => cartItem.id === item.id) ? 'added' : ''}`}
          key={item.id}
        >
          <div className="item-option-img-container item-option-elem">
            <img className="item-option-img" src={item.image} alt={item.label} />
          </div>
          <div className="item-option-label item-option-elem">
            <p>{item.label}</p>
          </div>
          <div className="item-option-quantity-selector item-option-elem">
            <Button onClick={() => this.addQuantity(index)}>+</Button>
            <span className="item-option-quantity-selector-amount">{item.quantity}</span>
            <Button onClick={() => this.removeQuantity(index)}>-</Button>
          </div>
          <div className="item-option-price item-option-elem">
            <p>${item.price}</p>
          </div>
        </div>
      ));
    }
    const { backendURL, cancelablePayment, reader, discoveredReaders } = this.state;
    if (backendURL === null && reader === null) {
      return <BackendURLForm onSetBackendURL={this.onSetBackendURL} />;
    } else if (reader === null) {
      return (
        <Readers
          onClickDiscover={() => this.discoverReaders(false)}
          onSubmitRegister={this.registerAndConnectNewReader}
          readers={discoveredReaders}
          onConnectToReader={this.connectToReader}
          handleUseSimulator={this.connectToSimulator}
        />
      );
    } else {
      let buttonArea;
      if (!this.state.success) {
        if (this.state.showFinish) {
          buttonArea = (
            <Button
              color="white"
              onClick={() => this.runWorkflow('collectPayment', this.collectCardPayment)}
              disabled={this.isWorkflowDisabled()}
              justifyContent="left"
            >
              <Group direction="row">
                <Icon icon="payments" />
                <Text color="blue" size={14}>
                  Collect card payment
                </Text>
              </Group>
            </Button>
          );
        } else {
          buttonArea = (
            <Group>
              <Group
                direction="row"
                alignment={{
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text size={12} color="dark">
                  Charge amount
                </Text>
                <Text size={18} color="dark">
                  {this.state.chargeAmount}
                </Text>
              </Group>

              <Button
                color="white"
                onClick={this.updateCart}
                disabled={this.isWorkflowDisabled()}
                justifyContent="left"
              >
                <Group direction="row">
                  <Icon icon="list" />
                  <Text color="blue" size={14}>
                    Update Totals
                  </Text>
                </Group>
              </Button>
              <Button
                color="white"
                onClick={this.cancelPendingPayment}
                disabled={!cancelablePayment}
                justifyContent="left"
              >
                <Group direction="row">
                  <Icon icon="cancel" />
                  <Text color="blue" size={14}>
                    Cancel payment
                  </Text>
                </Group>
              </Button>
            </Group>
          );
        }
      } else {
        buttonArea = <div>SUCCESS</div>;
      }
      return (
        <>
          {buttonArea}
          <div className="grid product-grid">{ProductGrid}</div>
        </>
      );
    }
  }

  render() {
    const { backendURL, reader } = this.state;
    return (
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 24px;
          @media (max-width: 800px) {
            height: auto;
            padding: 24px;
          }
        `}
      >
        <Group direction="column" spacing={30}>
          <Group direction="row" spacing={30} responsive>
            <Group direction="column" spacing={16} responsive>
              {backendURL && (
                <ConnectionInfo
                  backendURL={backendURL}
                  reader={reader}
                  onSetBackendURL={this.onSetBackendURL}
                  onClickDisconnect={this.disconnectReader}
                />
              )}

              {this.renderForm()}
            </Group>
          </Group>
        </Group>
      </div>
    );
  }
}

export default App;
