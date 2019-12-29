import React from 'react'

import "./Products.css"

const Product = ({ cart, index, item, setCart, updateChargeAmount }) => {

  const calculateTotalCharge = () => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity
    })
    return total
  }

  const changeQuantity = (change) => {
    cart[index].quantity = cart[index].quantity + change;
  }

  const handleChangeQuantity = (change) => {
    changeQuantity(change)
    // setCart(cart)
    const totalCharge = calculateTotalCharge()
    updateChargeAmount(totalCharge)
  }

  return (
    <div
      className="item-option"
    >
      <div className="item-option-img-container item-option-elem">
        <img className="item-option-img" src={item.image} alt={item.label} />
      </div>
      <div className="item-option-label item-option-elem">
        <p>{item.label}</p>
      </div>
      <div className="item-option-quantity-selector item-option-elem">
        <button tabIndex="-1" className="quantity-btn" onClick={() => handleChangeQuantity(1)}>+</button>
        <span className="item-option-quantity-selector-amount">{item.quantity}</span>
        <button tabIndex="-1" className="quantity-btn" onClick={() => handleChangeQuantity(-1)}>-</button>
      </div>
      <div className="item-option-price item-option-elem">
        <p>${item.price}</p>
      </div>
    </div>
  )
}

const Products = ({ cart, setCart, updateChargeAmount }) => {
  return (
    < div className="product-grid" >
      {
        (cart && cart.length) > 0 ?
          cart.map((item, index) => (
            <Product
              key={index}
              cart={cart}
              setCart={setCart}
              index={index}
              item={item}
              updateChargeAmount={updateChargeAmount}
            />
          ))
          :
          null
      }
    </div >
  )

}

export default Products