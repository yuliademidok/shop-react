import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../context/cart.context'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {
          cartItems.length ?
            (cartItems.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id} />))
            : (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }

      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </CartDropDownContainer>
  )
}

export default CartDropdown;