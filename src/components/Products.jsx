import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts, deleteProduct } from '../redux/products/productsSlice';
import { fetchOrders } from '../redux/orders/ordersSlice';

import { Popup } from '../components/UI/Popup';
import { Preloader } from '../components/UI/Preloader';
import { ButtonRemove } from '../components/UI/buttons';

import { useDateFormat } from '../hooks/';

export const Products = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const dateFormat = useDateFormat();

  const { orders } = useSelector((state) => state.orders);

  const [selectedProductsId, setSelectedProductsId] = React.useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [popupSelectedOrder, setPopupSelectedOrder] = React.useState([]);

  const handleDeleteClick = (product) => {
    setSelectedProductsId(product.id);
    setPopupSelectedOrder(product);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProductsId !== null) {
      dispatch(deleteProduct(selectedProductsId));
      setSelectedProductsId(null);
      setPopupSelectedOrder(null);
      setIsDeletePopupOpen(false);
    }
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <ul className="products__items">
      {isLoading ? (
        <Preloader />
      ) : (
        products?.map((product) => {
          const order = orders.find((order) => order.id === product.order);
          return (
            <li key={product.id} className="products__item item-product">
              <div className={`item-product__dot ${product.isNew ? 'active' : ''}`}></div>

              <img src={product.photo} alt={product.title} className="item-product__image" />

              <h3 className="item-product__title title-small">
                <span>{product.title}</span>
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
              <div className="item-product__order">{order?.title}</div>
              <div className="item-product__date">
                <span>{dateFormat.formatDate(product.date, 'dd/mm')}</span>
                <span>{dateFormat.formatDate(product.date, 'dd/mmmm/yyyy')}</span>
              </div>
              <ButtonRemove click={() => handleDeleteClick(product)} />
            </li>
          );
        })
      )}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleDeleteProduct}
        obj={popupSelectedOrder}
      />
    </ul>
  );
};
