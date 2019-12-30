import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

// Static Classes
import Client from './client';

// Components
import Checkout from './components/Checkout/Checkout.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Loader from './components/Loader/Loader.jsx'
import Instruction from "./components/Instruction/Instruction"
import InputForm from "./components/InputForm/InputForm"

// Images
import ReaderImg from "./assets/reader-large.png"
import BlueCheck from "./assets/blueCheck.png"
import InsertCard from "./assets/insertCard2.png"
import DollarSign from "./assets/dollarSign.png"

// Static Data
import Products from './static/Products';
import BackendUrl from './static/BackendUrl';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
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

  render() {

    const {
      chargeAmount,
      taxAmount,
      isLoading,
      event,
      errorMsg,
      cart,
      isConnected,
      currency
    } = this.state

    const { history } = this.props;

    const setChargeAmount = (chargeAmount) => { this.setState({ chargeAmount }) }
    const setIsLoading = (isLoading) => { this.setState({ isLoading }) }
    const setEvent = (event) => { this.setState({ event }) }
    const setErrorMsg = (errorMsg) => { this.setState({ errorMsg }) }
    const setCart = (cart) => { this.setState({ cart }) }
    const setIsConnected = (isConnected) => { this.setState({ isConnected }) }

    const withLoadingAndErrors = async (fn, args) => {
      setIsLoading(true)
      setErrorMsg(null)
      try {
        await fn(args);
      } catch (error) {
        setErrorMsg(`${error}`)
        history.goBack()
      } finally {
        setIsLoading(false)
      }
    };

    //////////////////////////////////////////////////
    // Landing Page Props for Instruction Component //
    //////////////////////////////////////////////////

    const goToRegister = () => {
      history.push("/register")
    }

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
        {
          text: "Next",
          variant: "primary",
          onClick: goToRegister,
          block: true
        },
      ]
    }

    ////////////////////////////////////////////////
    // Registration Props for InputForm Component //
    ////////////////////////////////////////////////

    const registerAndConnectReader = async (registrationCode) => {
      const reader = await this.client.registerReader({ registrationCode });
      await this.terminal.connectReader(reader);
    };

    const onRegister = (registrationCode) => {
      withLoadingAndErrors(registerAndConnectReader, registrationCode)
      setIsConnected(true)
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

    ////////////////////
    // Checkout Logic //
    ////////////////////
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

    const calculateTotalCharge = () => {
      let total = 0;
      cart.forEach((item) => { total += item.price * item.quantity })
      return total
    }

    const changeQuantity = (change, index) => {
      if (cart[index].quantity + change < 0) { return }
      const newCart = cart
      newCart[index].quantity = cart[index].quantity + change;
      setCart(newCart)
    }

    const onQtyChange = (change, index) => {
      changeQuantity(change, index)
      const totalCharge = calculateTotalCharge()
      setChargeAmount(totalCharge)
    }

    const onCheckout = () => {
      window.scrollTo(0, 0)
      withLoadingAndErrors(setReaderDisplay)
      history.push("/insert")
    }

    ///////////////////
    // Confirm Logic //
    ///////////////////

    const onEditOrder = () => {
      this.terminal.clearReaderDisplay()
      history.push("/checkout")
    }

    const onCollect = () => {
      history.push("/collect")
    }

    const insertCard = {
      header: "Insert Card",
      img: InsertCard,
      btns: [
        {
          text: "Next",
          variant: "primary",
          block: true,
          onClick: onCollect
        },
        {
          text: "Edit Order",
          variant: "outline-primary",
          block: true,
          onClick: onEditOrder
        },
      ]
    }

    ///////////////////
    // Collect Logic //
    ///////////////////

    const createPaymentIntentDescription = () => {
      let lineItemsStr = ""
      cart.forEach((lineItem) => { lineItemsStr += `${lineItem.label} (${lineItem.quantity}), ` })
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
      const processedPaymentIntent = await this.client.processPaymentIntent(paymentIntent);
      const payment = await this.terminal.collectPaymentMethod(processedPaymentIntent.secret);
      const processedPayment = await this.terminal.processPayment(payment.paymentIntent);
      const captureResult = await this.client.capturePaymentIntent({ paymentIntentId: processedPayment.paymentIntent.id });
      return captureResult;
    };

    const emptyCart = () => {
      const newCart = cart
      newCart.forEach((item) => item.quantity = 0)
      setCart(newCart)
      setChargeAmount(0)
    }

    const cancelPayment = async () => {
      await this.terminal.cancelCollectPaymentMethod();
    };

    const onCancelPayment = () => {
      console.log("Cancel Payment")
      history.push("/checkout")
      this.terminal.clearReaderDisplay()
      emptyCart()
    }

    const onCollectPayment = () => {
      console.log("Collect Payment")
      withLoadingAndErrors(collectPayment)
      history.push("/success")
      emptyCart()
    }

    const collectPaymentProps = {
      className: "collect-payment",
      header: "Collect Payment",
      img: DollarSign,
      btns: [
        {
          text: "Collect Payment",
          onClick: onCollectPayment,
          block: true,
        },
        {
          text: "Cancel Payment",
          variant: "outline-primary",
          onClick: onCancelPayment,
          block: true,
        },
      ]
    }

    /////////////
    // Success //
    /////////////

    const goToCheckout = () => {
      history.push("/checkout")
    }

    const paymentSuccessful = {
      className: "payment-successful",
      header: "Success",
      img: BlueCheck,
      btns: [
        {
          text: "Return to Checkout",
          block: true,
          onClick: goToCheckout
        }
      ]
    }

    if (isLoading) {
      return <Loader loading={isLoading} />
    }

    return (
      <div>
        {
          !isConnected ? <Redirect to="/" /> : null
        }
        <ErrorMessage
          errorMsg={errorMsg}
          onClose={setErrorMsg}
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
              cart={cart}
              chargeAmount={chargeAmount}
              onQtyChange={onQtyChange}
              onCheckout={onCheckout}
            />
          </Route>
          <Route path="/insert">
            <Instruction
              className={insertCard.className}
              header={insertCard.header}
              img={insertCard.img}
              lines={insertCard.lines}
              btns={insertCard.btns}
            />
          </Route>
          <Route path="/collect">
            <Instruction
              className={collectPaymentProps.className}
              img={collectPaymentProps.img}
              btns={collectPaymentProps.btns}
            />
          </Route>
          <Route path="/success">
            <Instruction
              className={paymentSuccessful.className}
              header={paymentSuccessful.header}
              img={paymentSuccessful.img}
              btns={paymentSuccessful.btns}
            >
            </Instruction>
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

export default withRouter(App)