import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { 
  getCategoriesAndDocuments 
} from '../../utils/firebase/firebase.utils'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.componenet'
import { setCategories } from '../../store/categories/category.action';
import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoreisMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    }
    getCategoreisMap();
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )

}

export default Shop;