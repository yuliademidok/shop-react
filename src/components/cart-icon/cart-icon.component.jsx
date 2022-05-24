import { useSelector, useDispatch } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();
  
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;