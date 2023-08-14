import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Products } from '../components/Products';

export const ProductsPage = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const [filterType, setFilterType] = useState('');

  const filteredProducts = filterType
    ? products.filter((product) => product.type === filterType)
    : products;

  const productTypes = [...new Set(products.map((product) => product.type))];

  return (
    <section className="page__products products ">
      <div className="products__container-big">
        <div className="products__container">
          <div className="products__header header-products">
            <h2 className="header-products__title title">
              Products /<span> {filteredProducts.length ? filteredProducts.length : 0}</span>
            </h2>
            <div className="header-products__select select">
              <label htmlFor="typeFilter" className="select__label">
                Filter by Type:
              </label>
              <select
                id="typeFilter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select__body"
              >
                <option value="">All</option>
                {productTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Products products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
};
