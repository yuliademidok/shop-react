import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signOutUser } from '../../utils/firebase/firebase.utils.js'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx'


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to='/auth'>
                Sign in
              </NavLink>
            )}

          <CartIcon />

        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation