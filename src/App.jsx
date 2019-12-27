import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Client from './client';

import Home from './components/Home/Home.jsx'
import Checkout from './components/Checkout/Checkout.jsx';
import CollectPayment from './components/CollectPayment/CollectPayment.jsx';
import EventSelector from './components/EventSelector/EventSelector';
import Success from './components/Success/Success.jsx';
import RegisterReader from './components/RegisterReader/RegisterReader.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Loader from './components/Loader/Loader.jsx'

import Products from './static/Products';
import BackendUrl from './static/BackendUrl';
import ErrorSnippets from './static/ErrorSnippets'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ client, terminal }) => {
  const [chargeAmount, setChargeAmount] = useState(0)
  const [taxAmount, setTaxAmount] = useState(0)
  const [currency, setCurrency] = useState('usd')
  const [workFlowInProgress, setWorkFlowInProgress] = useState(false)
  const [event, setEvent] = useState("")
  const [errorOccured, setErrorOccured] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [cart, setCart] = useState(Products)

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
  const registerAndConnectReaderWorkFlow = async (registrationCode) => { runWorkflow(registerAndConnectReader, registrationCode) }


  useEffect(() => {
    const registrationCode = window.localStorage.registration_code
    if (registrationCode) {
      registerAndConnectReaderWorkFlow(registrationCode)
    }
  }, [])


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
    console.log(terminal)
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
    <div className="main-page">
      <Router>
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
          <Route path="/collect">
            <CollectPayment
              collectPayment={collectPaymentWorkFlow}
              cancelPayment={cancelPaymentWorkFlow}
              emptyCart={emptyCart}
              errorOccured={errorOccured}
            />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

const AppWrapper = () => {

  const client = new Client(BackendUrl)
  const terminal = client.initTerminal()

  return (
    <App
      client={client}
      terminal={terminal}
    />
  )
}

export default AppWrapper