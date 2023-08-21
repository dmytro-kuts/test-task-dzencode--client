import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Product, fetchProducts, deleteProduct } from '../redux/products/productsSlice';
import { Order, fetchOrders } from '../redux/orders/ordersSlice';

import { Popup } from './UI/Popup';
import { Preloader } from './UI/Preloader';
import { ButtonRemove } from './UI/buttons';

import { useDateFormat } from '../hooks';
import { RootState, useAppDispatch } from '../redux/store';

interface ProductsProps {
  products: Product[];
  isLoading: boolean;
}

export const Products: React.FC<ProductsProps> = ({ products, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const dateFormat = useDateFormat();

  const { orders } = useSelector((state: RootState) => state.orders);

  const [selectedProductsId, setSelectedProductsId] = React.useState<number | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [popupSelectedOrder, setPopupSelectedOrder] = React.useState<Order | Product | null>(null);

  const handleDeleteClick = (product: Product) => {
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
                  <span>{t('common.start')} </span>
                  {dateFormat.formatDate(product.guarantee.start, 'dd/mm/yyyy')}
                </div>
                <div className="date-guarantee__item">
                  <span>{t('common.end')} </span>
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
