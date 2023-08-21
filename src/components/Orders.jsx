import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchOrders, deleteOrder } from '../redux/orders/ordersSlice';
import { fetchProducts, deleteProduct } from '../redux/products/productsSlice';

import { Popup } from '../components/UI/Popup';
import { Preloader } from '../components/UI/Preloader';
import { ButtonAdd, ButtonClose, ButtonList, ButtonRemove } from '../components/UI/buttons';

import { useTotalPriceCalculator, useDateFormat } from '../hooks/';

import { ReactComponent as ArrowSvg } from '../assets/img/icons/arrow.svg';

export const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const totalPriceCalculator = useTotalPriceCalculator();
  const dateFormat = useDateFormat();

  const { orders, isLoading } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);

  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);

  const handleDelete = (obj) => {
    setDeleteTarget(obj);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      if ('order' in deleteTarget) {
        dispatch(deleteProduct(deleteTarget.id));
      } else {
        dispatch(deleteOrder(deleteTarget.id));
      }
      setDeleteTarget(null);
      setIsDeletePopupOpen(false);

      setSelectedProducts(selectedProducts.filter((product) => product.id !== deleteTarget.id));
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrderId(order.id);
    setSelectedProducts(products.filter((product) => product.order === order.id));
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
            const totalUSD = totalPriceCalculator(orderProducts, 'USD');
            const totalUAH = totalPriceCalculator(orderProducts, 'UAH');

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
                  <span>{t('header.products')}</span>
                </div>

                <div className="item-order__date">
                  <span>{dateFormat.formatDate(order.date, 'dd/mm')}</span>
                  <span>{dateFormat.formatDate(order.date, 'dd/mmmm/yyyy')}</span>
                </div>

                {!selectedOrderId && (
                  <div className="item-order__total">
                    <span>{totalUSD} $</span>
                    <span>{totalUAH} UAH</span>
                  </div>
                )}

                {!selectedOrderId && <ButtonRemove click={() => handleDelete(order)} />}

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
              {selectedOrderId && orders?.find((order) => order.id === selectedOrderId)?.title}
            </h3>

            <ButtonClose click={() => setSelectedOrderId(null)} />

            <ButtonAdd title={t('button.addProducts')} click={null} />
          </div>

          <ul className="detail-orders__list">
            {selectedProducts.map((product) => (
              <li key={product.id} className="detail-orders__product-item product-orders ">
                <div className={`product-orders__dot ${product.isNew ? 'active' : ''}`}></div>
                <img src={product.photo} alt={product.title} className="product-orders__image" />
                <div className="product-orders__title title-small">
                  <span>{product.title}</span> <span>{product.serialNumber}</span>
                </div>
                <ButtonRemove click={() => handleDelete(product)} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleConfirmDelete}
        obj={deleteTarget}
      />
    </div>
  );
};
