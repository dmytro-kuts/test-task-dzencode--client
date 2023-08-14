import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../redux/products/productsSlice';

import { Preloader } from '../components/UI/Preloader';
import { useDateFormat } from '../hooks/';

export const Products = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const dateFormat = useDateFormat();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ul className="products__items">
      {isLoading ? (
        <Preloader />
      ) : (
        products?.map((product) => (
          <li key={product.id} className="products__item item-product">
            <div className={`item-product__dot ${product.isNew ? 'active' : ''}`}></div>

            <img src={product.photo} alt={product.title} className="item-product__image" />

            <h3 className="item-product__title">
              {product.title}
              <span>{product.serialNumber}</span>
            </h3>
            <div className="item-product__type">{product.type}</div>
            <div className="item-product__date-guarantee date-guarantee">
              <div className="date-guarantee__item">
                <span>Start: </span>
                {dateFormat.formatDate(product.guarantee.start, 'dd/mm/yyyy')}
              </div>
              <div className="date-guarantee__item">
                <span>End: </span>
                {dateFormat.formatDate(product.guarantee.end, 'dd/mm/yyyy')}
              </div>
            </div>
            <div className="item-product__price">
              {product.price.map((price) => (
                <span key={price.symbol}>
                  {price.value.toLocaleString('en', { minimumFractionDigits: 2 })}
                  {price.symbol === 'USD' ? ' $' : ` ${price.symbol}`}
                </span>
              ))}
            </div>
            <div className="item-product__order">{product.order}</div>
            <div className="item-product__date">
              <span>{dateFormat.formatDate(product.date, 'dd/mm')}</span>
              <span>{dateFormat.formatDate(product.date, 'dd/mmmm/yyyy')}</span>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
