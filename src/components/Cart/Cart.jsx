import React from 'react'
import Button from '../Button/Button.jsx';
import Group from '../Group/Group.jsx';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';
import Alert from 'react-bootstrap/Alert';

class Cart extends React.Component {

  handlePurchase() {
    this.props.updateLineItems()
  }

  handleCardPayment() {
    this.props.collectCardPayment()
  }

  calculateTotal(items) {
    let chargeAmount = 0;
    items.forEach((item) => {
      chargeAmount += item.price * item.quantity
    })
    this.props.updateChargeAmount(chargeAmount)
  }

  changeQuantity = (index, change) => {
    const cart = this.props.cart;
    cart[index].quantity = cart[index].quantity + change;
    this.props.updateCart(cart)
    this.calculateTotal(cart)
  }

  products() {
    const { cart } = this.props
    let ProductGrid;
    if (cart && cart.length > 0) {
      ProductGrid = cart.map((item, index) => (
        <div
          className="item-option"
          key={item.id}
        >
          <div className="item-option-img-container item-option-elem">
            <img className="item-option-img" src={item.image} alt={item.label} />
          </div>
          <div className="item-option-label item-option-elem">
            <p>{item.label}</p>
          </div>
          <div className="item-option-quantity-selector item-option-elem">
            <Button onClick={() => this.changeQuantity(index, 1)}>+</Button>
            <span className="item-option-quantity-selector-amount">{item.quantity}</span>
            <Button onClick={() => this.changeQuantity(index, -1)}>-</Button>
          </div>
          <div className="item-option-price item-option-elem">
            <p>${item.price}</p>
          </div>
        </div>
      ));
    }
    return <div className="grid product-grid">{ProductGrid}</div>
  }

  renderForm() {
    const { cart, success, showFinish } = this.props

    const resetCart = () => {
      const cart = this.props.cart
      cart.forEach((item) => item.quantity = 0)
      this.props.updateCart(cart)
      this.props.updateChargeAmount(0)
    }

    let buttonArea;
    if (success) {
      buttonArea = <Alert variant="info">SUCCESS</Alert>
    } else if (showFinish) {
      buttonArea = (
        <Group>
          <Button
            color="white"
            onClick={this.handleCardPayment.bind(this)}
            justifyContent="left"
          >
            <Group direction="row">
              <Icon icon="payments" />
              <Text color="blue" size={14}>
                Collect card payment
              </Text>
            </Group>
          </Button>
          <Button
            color="white"
            onClick={this.props.cancelPendingPayment}
            disabled={false}
            justifyContent="left"
          >
            <Group direction="row">
              <Icon icon="cancel" />
              <Text color="blue" size={14}>
                Cancel
              </Text>
            </Group>
          </Button>
        </Group>
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
              {this.props.chargeAmount}
            </Text>
          </Group>

          <Button
            color="white"
            onClick={this.handlePurchase.bind(this)}
            // disabled={this.isWorkflowDisabled()}
            disabled={false}
            justifyContent="left"
          >
            <Group direction="row">
              <Icon icon="list" />
              <Text color="blue" size={14}>
                Purchase
                  </Text>
            </Group>
          </Button>
          <Button
            color="white"
            onClick={resetCart}
            justifyContent="left"
          >
            <Group direction="row">
              <Icon icon="list" />
              <Text color="blue" size={14}>
                Reset
                  </Text>
            </Group>
          </Button>
        </Group >
      );
    }
    return (
      <div>
        {buttonArea}
      </div>
    );
  }

  render() {

    const { cart } = this.props

    return (
      <div>
        {this.renderForm()}
        {this.products()}
      </div>
    )
  }
}

export default Cart;