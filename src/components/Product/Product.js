import React from 'react'
import "./Product.css"

const Product = (props) => {

  const {
    index,
    item,
    onQtyChange
  } = props

  return (
    <div className="product">
      <div className="product-img-container w-25per">
        <img className="product-img" src={item.image} alt={item.label} />
      </div>
      <div className={`product-label`}>
        <div className="vertically-align-container">
          <span className="vertically-align-span">
            <div>
              {item.display_name || item.name}
            </div>
          </span>
        </div>
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