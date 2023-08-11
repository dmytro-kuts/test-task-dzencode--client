import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrders, deleteOrder } from '../redux/orders/ordersSlice';
import { fetchProducts } from '../redux/products/productsSlice';

import { Popup } from '../components/UI/Popup';
import { Preloader } from '../components/UI/Preloader';
import { ButtonAdd, ButtonClose, ButtonList, ButtonRemove } from '../components/UI/buttons';

import { ReactComponent as ArrowSvg } from '../assets/img/icons/arrow.svg';
import MonitorPng from '../assets/img/products/monitor.png';

export const Orders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);

  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  const handleDeleteClick = (order) => {
    setSelectedOrderId(order.id);
    setIsDeletePopupOpen(true);
  };

  const handleDeleteOrder = () => {
    if (selectedOrderId !== null) {
      dispatch(deleteOrder(selectedOrderId));
      setSelectedOrderId(null);
      setIsDeletePopupOpen(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrderId(order.id);
    setSelectedProducts(products.filter((product) => product.order === order.id));
  };

  const formatShortDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' });
  };

  const formatLongDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en', { minimumFractionDigits: 2 });
  };

  const calculateTotalPriceUSD = (orderProducts) => {
    const totalPrice = orderProducts.reduce((total, product) => {
      const productPrice = product.price.find((price) => price.symbol === 'USD');
      return total + productPrice.value;
    }, 0);
    return formatPrice(totalPrice);
  };

  const calculateTotalPriceUAH = (orderProducts) => {
    const totalPrice = orderProducts.reduce((total, product) => {
      const productPrice = product.price.find((price) => price.symbol === 'UAH');
      return total + productPrice.value;
    }, 0);
    return formatPrice(totalPrice);
  };

  React.useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={`orders__body ${selectedOrderId ? 'active' : ''}`}>
      <ul className={`orders__items ${selectedOrderId ? 'active' : ''}`}>
        {isLoading ? (
          <Preloader />
        ) : (
          orders?.map((order) => {
            const orderProducts = products.filter((product) => product.order === order.id);
            const totalUSD = calculateTotalPriceUSD(orderProducts);
            const totalUAH = calculateTotalPriceUAH(orderProducts);

            return (
              <li
                key={order.id}
                className={`orders__item item-order ${
                  selectedOrderId === order.id ? 'selected' : ''
                }`}
              >
                {!selectedOrderId && <h3 className="item-order__title">{order.title}</h3>}

                <ButtonList click={() => handleOrderClick(order)} />

                <div className="item-order__products">
                  {orderProducts.length}
                  <span>Products</span>
                </div>

                <div className="item-order__date">
                  <span>{formatShortDate(order.date)}</span>
                  <span>{formatLongDate(order.date)}</span>
                </div>

                {!selectedOrderId && (
                  <div className="item-order__total">
                    <span>{totalUSD} $</span>
                    <span>{totalUAH} UAH</span>
                  </div>
                )}

                {!selectedOrderId && <ButtonRemove click={() => handleDeleteClick(order)} />}

                {selectedOrderId && (
                  <div className="item-order__arrow">
                    <ArrowSvg />
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>
      {selectedOrderId && (
        <div className="orders__detail detail-orders">
          <div className="detail-orders__header">
            <h3 className="detail-orders__title">
              {selectedOrderId && orders.find((order) => order.id === selectedOrderId)?.title}
            </h3>

            <ButtonClose click={() => setSelectedOrderId(null)} />

            <ButtonAdd title="add products" click={null} />
          </div>

          <ul className="detail-orders__list">
            {selectedProducts.map((product) => (
              <li key={product.id} className="detail-orders__product-item product-orders ">
                {product.photo ? (
                  <img src={product.photo} alt={product.title} className="product-orders__image" />
                ) : (
                  <img src={MonitorPng} alt="Product" className="product-orders__image" />
                )}
                <div className="product-orders__title"> {product.title}</div>
                <ButtonRemove click={null} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleDeleteOrder}
        obj={selectedOrderId}
      />
    </div>
  );
};
