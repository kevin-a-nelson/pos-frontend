import React from 'react'

import "./Products.css"

const Product = (props) => {

  const {
    index,
    item,
    onQtyChange
  } = props

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
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(1, index)}>+</button>
        <span className="item-option-quantity-selector-amount">{item.quantity}</span>
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(-1, index)}>-</button>
      </div>
      <div className="item-option-price item-option-elem">
        <p>${item.price}</p>
      </div>
    </div>
  )
}

const Products = (props) => {

  const {
    cart,
    onQtyChange
  } = props

  return (
    < div className="product-grid" >
      {
        (cart && cart.length) > 0 ?
          cart.map((item, index) => (
            <Product
              key={index}
              onQtyChange={onQtyChange}
              index={index}
              item={item}
            />
          ))
          :
          null
      }
    </div >
  )

}

export default Products