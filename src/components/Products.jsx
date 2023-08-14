import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchProducts } from '../redux/products/productsSlice';

import { Popup } from '../components/UI/Popup';
import { Preloader } from '../components/UI/Preloader';
import { ButtonRemove } from '../components/UI/buttons';

import { useDateFormat } from '../hooks/';

export const Products = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const dateFormat = useDateFormat();

  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  const handleDeleteClick = (product) => {
    setSelectedProducts(product);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProducts) {
      setIsDeletePopupOpen(false);
      setSelectedProducts(null);
    }
  };

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
            <ButtonRemove click={() => handleDeleteClick(product)} />
          </li>
        ))
      )}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleDeleteProduct}
        obj={selectedProducts}
      />
    </ul>
  );
};
