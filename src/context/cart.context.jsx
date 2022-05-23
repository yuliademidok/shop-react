import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: [],
  cartTotal: 0,
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw Error(`Unhandled type ${type} in the cart reducer`)
  }
}

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  //   setCartCount(newCartCount);
  // }, [cartItems])

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
  //   setCartTotal(newCartTotal);
  // }, [cartItems])


  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(CartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
        {
          cartItems: newCartItems,
          cartTotal: newCartTotal,
          cartCount: newCartCount
        })
    );
  }

  const setIsCartOpen = (bool) => {
    // dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool })
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
