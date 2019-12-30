import React from 'react'

import Product from "../Product/Product"

import "./Products.css"

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