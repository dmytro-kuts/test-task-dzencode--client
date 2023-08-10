import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../redux/products/productsSlice';

import MonitorPng from '../assets/products/monitor.png';

export const Products = ({ products }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ul className="products__items">
      {products?.map((product) => (
        <li key={product.id} className="products__item item-product">
          {!product.photo ? (
            <img src={product.photo} alt={product.title} className="item-product__image" />
          ) : (
            <img src={MonitorPng} alt="Product" className="item-product__image" />
          )}
          <h3 className="item-product__title">{product.title}</h3>
          <div className="item-product__type">{product.type}</div>
          <div className="item-product__date">
            Guarantee Start: {product.guarantee.start} <br />
            Guarantee End: {product.guarantee.end}
          </div>
          <div className="item-product__price">
            {product.price.map((price) => (
              <div key={price.symbol}>
                {price.value} {price.symbol}
              </div>
            ))}
          </div>
          <div className="item-product__order">{product.order}</div>
        </li>
      ))}
    </ul>
  );
};
