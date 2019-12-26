import React from 'react'
import Products from '../Products/Products.jsx'
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedOut: false,
    }
  }

  handleCheckout() {
    this.props.updateLineItems()
    this.setState({ checkedOut: true })
  }

  calculateTotal(items) {
    let chargeAmount = 0;
    items.forEach((item) => {
      chargeAmount += item.price * item.quantity
    })
    this.props.updateChargeAmount(chargeAmount)
  }

  render() {

    const { checkedOut } = this.state
    const { cart, updateCart, chargeAmount, workFlowInProgress } = this.props

    if (workFlowInProgress) {
      return <h1>Loading ... </h1>
    }

    if (checkedOut) {
      return <Redirect to="/purchase" />
    }

    return (
      <div>
        <h1>${chargeAmount}</h1>
        <Button onClick={this.handleCheckout.bind(this)} block>Checkout</Button>
        <Products
          cart={cart}
          updateCart={updateCart}
          calculateTotal={this.calculateTotal.bind(this)}
        />
      </div>
    )
  }
}

export default Cart;