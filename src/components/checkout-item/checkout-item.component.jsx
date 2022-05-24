import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart, removeItemFromCart, addItemToCart } from '../../store/cart/cart.action';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  
  const clearFromCart = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addProductToCart = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeProductFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

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