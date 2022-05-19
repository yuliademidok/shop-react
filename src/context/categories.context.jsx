import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: [],
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoreisMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoreisMap();
  }, [])

  // useEffect(() => {
  //   addColletionAndDocuments('categories', SHOP_DATA);
  // }, [])

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  )
}