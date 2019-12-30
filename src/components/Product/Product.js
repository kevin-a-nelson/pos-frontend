import React from 'react'

import "./Product.css"

const Product = (props) => {

  const {
    index,
    item,
    onQtyChange
  } = props

  const marginTop = item.lines === 2 ? "mt-6per" : "mt-8per";

  return (
    <div
      className="product"
    >
      <div className="product-img-container w-25per">
        <img className="product-img" src={item.image} alt={item.label} />
      </div>
      <div className={`product-label w-25per ${marginTop}`}>
        <p>{item.label}</p>
      </div>
      <div className="product-quantity-selector w-25per">
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(1, index)}>+</button>
        <span className="product-quantity-selector-amount">{item.quantity}</span>
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(-1, index)}>-</button>
      </div>
      <div className="product-price w-25per">
        <p>${item.price}</p>
      </div>
    </div>
  )
}

export default Product;