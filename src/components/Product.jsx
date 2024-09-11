import React, { useContext } from 'react'
import { CartContext } from '../Store/shopping-cart'

const Product = ({ id, image, title, price, description, }) => {
  const { addToCart } = useContext(CartContext)
  return (
    <div className='product'>
      <img src={image} alt={title} />
      <div className='product-content'>
        <div>
          <h3>{title}</h3>
          <p className='product-price'>{price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => addToCart(id)}>Add to Cart</button>
          {/* <button>View Details</button> */}
        </p>
      </div>
    </div>
  )
}

export default Product