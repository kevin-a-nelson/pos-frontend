import React from 'react'
import Button from '../Button/Button.jsx'


class Product extends React.Component {

  render() {
    const { item, index, changeQuantity } = this.props
    return (
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
          <Button onClick={() => changeQuantity(index, 1)}>+</Button>
          <span className="item-option-quantity-selector-amount">{item.quantity}</span>
          <Button onClick={() => changeQuantity(index, -1)}>-</Button>
        </div>
        <div className="item-option-price item-option-elem">
          <p>${item.price}</p>
        </div>
      </div>
    )
  }
}

class Products extends React.Component {

  changeQuantity = (index, change) => {
    const { cart, updateCart, calculateTotal } = this.props
    cart[index].quantity = cart[index].quantity + change;
    updateCart(cart)
    calculateTotal(cart)
  }

  render() {
    const { cart } = this.props
    return (
      <div className="product-grid">
        {
          (cart && cart.length) > 0 ?
            cart.map((item, index) => (
              <Product
                item={item}
                index={index}
                changeQuantity={this.changeQuantity}
              />
            ))
            :
            null
        }
      </div>
    )
  }
}

export default Products