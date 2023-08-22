import React from 'react';
import { useTranslation } from 'react-i18next';
import { Order } from '../../redux/orders/ordersSlice';
import { Product } from '../../redux/products/productsSlice';
import { ButtonInherit, ButtonDelate, ButtonClose } from './buttons';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (obj: Order | Product) => void;
  obj: any;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onDelete, obj }) => {
  const { t } = useTranslation();

  const popupClassName = isOpen ? 'popup open' : 'popup';

  return (
    <div className={popupClassName}>
      <div className="popup__wrapper">
        <div className="popup__content">
          <ButtonClose click={onClose} />

          <h3 className="popup__title">{t('popup.confirmDelete')}</h3>
          <div className="popup__item  item-popup">
            {obj?.serialNumber && (
              <div className={`item-popup__dot ${obj.isNew ? 'active' : ''}`}></div>
            )}
            {obj?.photo && <img className="item-popup__image" src={obj.photo} alt={obj.title} />}
            <div className="item-popup__title title-small">
              <span>{obj?.title}</span> <span>{obj?.serialNumber}</span>
            </div>
          </div>
          <div className="popup__actions">
            <ButtonInherit click={onClose} title={t('common.cancel')} />
            <ButtonDelate click={() => onDelete(obj)} title={t('common.delete')} />
          </div>
        </div>
      </div>
    </div>
  );
};
