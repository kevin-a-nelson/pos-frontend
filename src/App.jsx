import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

import Button from "react-bootstrap/Button"

import Client from './client';

import Home from './components/Home/Home.jsx'
import Checkout from './components/Checkout/Checkout.jsx';
import CollectPayment from './components/CollectPayment/CollectPayment.jsx';
import EventSelector from './components/EventSelector/EventSelector';
import Success from './components/Success/Success.jsx';
import RegisterReader from './components/RegisterReader/RegisterReader.jsx'
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Loader from './components/Loader/Loader.jsx'
import AskCustomer from "./components/AskCustomer/AskCustomer.jsx"

import Instruction from "./components/Instruction/Instruction"
import InputForm from "./components/InputForm/InputForm"

import ReaderImg from "./assets/reader-large.png"

import Products from './static/Products';
import BackendUrl from './static/BackendUrl';
import ErrorSnippets from './static/ErrorSnippets'

import 'bootstrap/dist/css/bootstrap.min.css';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chargeAmount: 0,
      taxAmount: 0,
      isLoading: false,
      event: "",
      errorOccured: false,
      errorMsg: null,
      cart: Products,
      readerRegistered: false,
      currency: "usd"
    }
    this.client = new Client(BackendUrl)
    this.terminal = this.client.initTerminal()
  }

  setChargeAmount(chargeAmount) { this.setState({ chargeAmount }) }
  setTaxAmount(taxAmount) { this.setState({ taxAmount }) }
  setIsLoading(isLoading) { this.setState({ isLoading }) }
  setEvent(event) { this.setState({ event }) }
  setErrorOccured(errorOccured) { this.setState({ errorOccured }) }
  setErrorMsg(errorMsg) { this.setState({ errorMsg }) }
  setCart(cart) { this.setState({ cart }) }
  // setState(readerRegistered) { this.setState({ readerRegistered }) }

  withLoadingAndErrors = async (fn, args) => {
    this.setIsLoading(true)
    this.setErrorMsg(null)
    try {
      await fn(args);
    } catch (error) {
      this.setErrorMsg(`${error}`)
      this.props.history.push("/register")
    } finally {
      this.setIsLoading(false)
    }
  };

  registerAndConnectReader = async (registrationCode) => {
    const reader = await this.client.registerReader({ registrationCode });
    await this.terminal.connectReader(reader);
  };

  render() {

    const {
      chargeAmount,
      taxAmount,
      isLoading,
      event,
      errorOccured,
      errorMsg,
      cart,
      readerRegistered,
      currency
    } = this.state

    const { history } = this.props;

    //////////////////////////////////////////////////
    // Landing Page Props for Instruction Component //
    //////////////////////////////////////////////////
    const landing = {
      className: "landing",
      header: null,
      img: ReaderImg,
      lines: [
        { text: "Enter" },
        { text: "0 7 1 3 9" },
        { text: "Into the reader" },
      ],
      btns: [
        { text: "Next", variant: "primary", onClick: () => history.push("/register"), block: true },
      ]
    }

    ////////////////////////////////////////////////
    // Registration Props for InputForm Component //
    ////////////////////////////////////////////////
    const onRegister = (registrationCode) => {
      this.withLoadingAndErrors(this.registerAndConnectReader, registrationCode)
      history.push("/checkout")
    }

    const Registration = {
      placeholder: "Ex. Sepia-cerulean-orynx",
      label: "Registration Code",
      btns: [
        { text: "Submit", variant: "primary", onClick: onRegister },
        { text: "Back", variant: "outline-primary", onClick: () => history.push("/") },
      ]
    }

    //////////////////
    // CHECKOUT Fns //
    //////////////////
    const collectLineItems = () => {
      let lineItems = []
      cart.forEach((item) => {
        if (item.quantity > 0) {
          let displayItem = {
            "description": item.label,
            "amount": item.price * 100,
            "quantity": item.quantity
          }
          lineItems.push(displayItem)
        }
      })
      return lineItems
    }

    const createReaderDisplay = () => {
      const lineItems = collectLineItems()
      const readerDisplay = {
        type: 'cart',
        cart: {
          line_items: lineItems,
          tax: taxAmount,
          total: chargeAmount * 100 + taxAmount,
          currency: currency,
        },
      }
      return readerDisplay
    }

    const setReaderDisplay = async () => {
      const readerDisplay = createReaderDisplay()
      await this.terminal.setReaderDisplay(readerDisplay);
    };

    if (isLoading) {
      return <Loader loading={isLoading} />
    }

    return (
      <div>
        <ErrorMessage
          errorMsg={errorMsg}
          onClose={() => this.setErrorMsg(null)}
        />
        <Switch>
          <Route path="/register">
            <InputForm
              label={Registration.label}
              placeholder={Registration.placeholder}
              btns={Registration.btns}
            />
          </Route>
          <Route path="/checkout">
            <Checkout
              cart={Products}
              setCart={this.setCart}
              chargeAmount={chargeAmount}
              updateChargeAmount={this.setChargeAmount.bind(this)}
              setReaderDisplay={() => this.withLoadingAndErrors(setReaderDisplay)}
              errorOccured={errorMsg}
            />
          </Route>
          <Route path="/">
            <Instruction
              className={landing.className}
              header={landing.header}
              img={landing.img}
              lines={landing.lines}
              btns={landing.btns}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

const App = ({ client, terminal }) => {

  const [chargeAmount, setChargeAmount] = useState(0)
  const [taxAmount] = useState(0)
  const [currency] = useState('usd')
  const [workFlowInProgress, setWorkFlowInProgress] = useState(false)
  const [event, setEvent] = useState("")
  const [errorOccured, setErrorOccured] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [cart, setCart] = useState(Products)
  const [readerRegistered, setReaderRegistered] = useState(false)

  const setFriendlyErrorMessage = (errorMsg) => {
    ErrorSnippets.forEach((errorSnippet) => {
      if (errorMsg.includes(errorSnippet)) {
        return setErrorMsg(errorSnippet)
      }
      return setErrorMsg(errorMsg)
    })
  }

  const runWorkflow = async (workflowFn, args) => {
    let catchOccured = false
    setWorkFlowInProgress(true)
    setErrorOccured(true)
    setErrorMsg(null)
    try {
      await workflowFn(args);
    } catch (error) {
      catchOccured = true
      setFriendlyErrorMessage(`${error}`)
    } finally {
      setWorkFlowInProgress(false)
      setErrorOccured(catchOccured)
    }
  };

  ////////////////////////////////////
  // RegisterReader Component Funcs //
  ////////////////////////////////////

  const registerAndConnectReader = async (registrationCode) => {
    const reader = await client.registerReader({ registrationCode });
    await terminal.connectReader(reader);
  };

  /*
  Loading Screen While Registering and Connecting to Reader
  **/
  const registerAndConnectReaderWorkFlow = async (registrationCode) => {
    runWorkflow(registerAndConnectReader, registrationCode)
  }

  //////////////////////////////
  // Checkout Component Funcs //
  //////////////////////////////

  const collectLineItems = () => {
    let lineItems = []
    cart.forEach((item) => {
      if (item.quantity > 0) {
        let displayItem = {
          "description": item.label,
          "amount": item.price * 100,
          "quantity": item.quantity
        }
        lineItems.push(displayItem)
      }
    })
    return lineItems
  }

  /*
  Create Hash that the Reader will consume
  **/
  const createReaderDisplay = () => {
    const lineItems = collectLineItems()
    const readerDisplay = {
      type: 'cart',
      cart: {
        line_items: lineItems,
        tax: taxAmount,
        total: chargeAmount * 100 + taxAmount,
        currency: currency,
      },
    }
    return readerDisplay
  }

  /*
  Display Items Costomer Checked out on Reader
  **/
  const setReaderDisplay = async () => {
    const readerDisplay = createReaderDisplay()
    await terminal.setReaderDisplay(readerDisplay);
  };

  /*
  Loading Screen while setReaderDisplay is running
  **/
  const setReaderDisplayWorkFlow = async () => { runWorkflow(setReaderDisplay); };

  ////////////////////////////////////
  // CollectPayment Component Funcs //
  ////////////////////////////////////

  const createPaymentIntentDescription = () => {

    let lineItemsStr = ""
    cart.forEach((lineItem) => { lineItemsStr += `${lineItem.description} (${lineItem.quantity}), ` })
    const description = `${event.title} - ${lineItemsStr}`

    return description
  }

  const createPaymentIntent = () => {
    const description = createPaymentIntentDescription()
    const amount = chargeAmount * 100 + taxAmount
    const paymentIntent = { amount, currency, description }
    return paymentIntent
  }

  const collectPayment = async () => {
    const paymentIntent = createPaymentIntent()
    const processedPaymentIntent = await client.processPaymentIntent(paymentIntent);
    const payment = await terminal.collectPaymentMethod(processedPaymentIntent.secret);
    const processedPayment = await terminal.processPayment(payment.paymentIntent);
    const captureResult = await client.capturePaymentIntent({ paymentIntentId: processedPayment.paymentIntent.id });
    return captureResult;
  };

  const collectPaymentWorkFlow = async () => { runWorkflow(collectPayment) }

  const cancelPayment = async () => {
    await terminal.cancelCollectPaymentMethod();
  };

  const cancelPaymentWorkFlow = async () => { runWorkflow(cancelPayment) }

  const emptyCart = () => {
    const newCart = cart
    newCart.forEach((item) => item.quantity = 0)
    setCart(newCart)
    setChargeAmount(0)
  }

  return (
    <Router>
      <div className="app">
        {
          !readerRegistered ? <Redirect to="/" /> : null
        }
        <Loader
          loading={workFlowInProgress}
        />
        <ErrorMessage
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          errorOccured={errorOccured}
          setErrorOccured={setErrorOccured}
        />
        <Switch>
          <Route path="/register">
            <RegisterReader
              setReaderRegistered={setReaderRegistered}
              registerReader={registerAndConnectReaderWorkFlow}
              errorOccured={errorOccured}
            />
          </Route>
          <Route path="/events">
            <EventSelector
              setEvent={setEvent}
            />
          </Route>
          <Route path="/checkout">
            <Checkout
              cart={Products}
              setCart={setCart}
              chargeAmount={chargeAmount}
              updateChargeAmount={setChargeAmount}
              setReaderDisplay={setReaderDisplayWorkFlow}
              errorOccured={errorOccured}
            />
          </Route>
          <Route path="/confirm">
            <AskCustomer
              terminal={terminal}
            />
          </Route>
          <Route path="/collect">
            <CollectPayment
              collectPayment={collectPaymentWorkFlow}
              cancelPayment={cancelPaymentWorkFlow}
              emptyCart={emptyCart}
              errorOccured={errorOccured}
              collectingPayment={workFlowInProgress}
              terminal={terminal}
            />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Button onClick={() => terminal.clearReaderDisplay()}>Clear Reader</Button>
        </Switch>
      </div >
    </Router>
  );
}

const AppWrapper = () => {

  const client = new Client(BackendUrl)
  const terminal = client.initTerminal()

  return (
    <Router>
      <App
        client={client}
        terminal={terminal}
      />
    </Router>
  )
}

export default withRouter(Test)