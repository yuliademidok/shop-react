import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);
  
  const clearFromCart = () => clearItemFromCart(cartItem);
  const addProductToCart = () => addItemToCart(cartItem);
  const removeProductFromCart = () => removeItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <div className='quantity'>
        <div className='arrow' onClick={removeProductFromCart}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addProductToCart}>&#10095;</div>
      </div>
      <span className='price'>{price * quantity}</span>
      <div className='remove-button' onClick={clearFromCart}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;