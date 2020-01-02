import React from 'react'
import "./Product.css"

const Product = (props) => {

  const {
    index,
    item,
    onQtyChange
  } = props

  const marginTop = item.lines === 1 ? "mt-8per" : "mt-6per";

  return (
    <div className="product">
      <div className="product-img-container w-25per">
        <img className="product-img" src={item.image} alt={item.label} />
      </div>
      <div className={`product-label w-25per ${marginTop}`}>
        <p>{item.label} </p>
      </div>
      <div className="product-quantity-selector w-25per">
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(1, index)}>+</button>
        {
          item.quantity === 0 ?
            <span className="product-quantity-selector-amount thin">{item.quantity}</span>
            :
            <span className="product-quantity-selector-amount bold">{item.quantity}</span>
        }
        <button tabIndex="-1" className="quantity-btn" onClick={() => onQtyChange(-1, index)}>-</button>
      </div>
      <div className="product-price">
        <div className="product-price-container">
          <p>${item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default Product;