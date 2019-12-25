import React from 'react'
import Button from '../Button/Button.jsx';
import Group from '../Group/Group.jsx';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';
import Alert from 'react-bootstrap/Alert';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      chargeAmount: 0,
    }
  }

  calculateTotal(items) {
    let chargeAmount = 0;
    items.forEach((item) => {
      chargeAmount += item.price * item.quantity
    })
    this.setState({ chargeAmount })
  }

  addQuantity = (index) => {
    const cart = this.props.cart;
    cart[index].quantity = cart[index].quantity + 1;
    this.setState({ cart })
    this.calculateTotal(cart)
  }

  removeQuantity = (index) => {
    const cart = this.props.cart;
    if (cart[index].quantity - 1 >= 0) {
      cart[index].quantity = cart[index].quantity - 1;
    }
    this.setState({ cart })
    this.calculateTotal(cart)
  }

  renderForm() {
    const { cart } = this.props
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
    // const { cancelablePayment, reader, discoveredReaders } = this.state;

    const resetCart = () => {
      const cart = this.state.cart
      cart.forEach((item) => item.quantity = 0)
      this.setState({ cart })
      this.setState({ chargeAmount: 0 })
    }

    let buttonArea;
    if (!this.state.success) {
      if (this.state.showFinish) {
        buttonArea = (
          <Group>
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
            <Button
              color="white"
              onClick={this.cancelPendingPayment}
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
                {this.state.chargeAmount}
              </Text>
            </Group>

            <Button
              color="white"
              onClick={this.updateCart}
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
    } else {
      buttonArea = <Alert variant="info">SUCCESS</Alert>
    }
    return (
      <div>
        {buttonArea}
        <div className="grid product-grid">{ProductGrid}</div>
      </div>
    );
  }

  render() {

    const { cart } = this.props

    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}

export default Cart;