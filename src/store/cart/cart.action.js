import { createAction } from '../../utils/reducer/reducer.utils';
import CART_ACTION_TYPES from "./cart.types";


export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => productToAdd.id === cartItem.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity === 1) {
    return cartItems.filter(item => item.id !== productToRemove.id)
  }

  return cartItems.map(item =>
    item.id === productToRemove.id
      ? ({ ...productToRemove, quantity: productToRemove.quantity - 1 })
      : (item)
  );
}

export const clearCartItem = (cartItems, productToRemove) => {
  const newCartItems = cartItems.filter(cartItem => {
    return cartItem.id !== productToRemove.id;
  })
  return newCartItems;
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
