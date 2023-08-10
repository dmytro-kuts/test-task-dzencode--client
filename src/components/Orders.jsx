import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders, deleteOrder } from '../redux/orders/ordersSlice';

import { Popup } from '../components/UI/Popup';

import { ReactComponent as RemoveSvg } from '../assets/icons/remove.svg';

export const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleDeleteOrder = () => {
    if (selectedOrder) {
      dispatch(deleteOrder(selectedOrder.id));
      setSelectedOrder(null);
    }
  };

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <ul className="orders__items">
        {orders?.map((order) => (
          <li key={order.id} className="orders__item item-order">
            <h3 className="item-order__title">{order.title}</h3>
            <div className="item-order__desc">{order.description}</div>
            <div className="item-order__date">{order.date}</div>
            <button className="item-order__button" onClick={() => handleDeleteClick(order)}>
              <RemoveSvg />
            </button>
          </li>
        ))}
      </ul>

      <Popup
        isOpen={selectedOrder !== null}
        onClose={handleClosePopup}
        onDelete={handleDeleteOrder}
        obj={selectedOrder}
      />
    </>
  );
};
