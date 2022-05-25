import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../spinner/spinner.component';


const CategoryPreview = ({ title, products }) => {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {
        isLoading ? (
          <Spinner />
        ) : (
          <div className='category-preview-container'>
            <h2>
              <Link to={title}>
                <span className='title'>{title.toUpperCase()}</span>
              </Link>
            </h2>
            <div className='preview'>
              {products
                .slice(0, 4)
                .map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        )
      }
    </Fragment>
  )
}

export default CategoryPreview;