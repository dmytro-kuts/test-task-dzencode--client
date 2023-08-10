import React from 'react';

import { ReactComponent as CloseSvg } from '../../assets/icons/close.svg';
import { ReactComponent as RemoveSvg } from '../../assets/icons/remove.svg';

export const Popup = ({ isOpen, onClose, onDelete, obj }) => {
  const popupClassName = isOpen ? 'popup open' : 'popup';

  return (
    <div className={popupClassName}>
      <div className="popup__wrapper">
        <div className="popup__content">
          <button className="popup__close" onClick={onClose}>
            <CloseSvg />
          </button>
          <h3 className="popup__title">Are you sure you want to delete this object?</h3>
          <div className="popup__item  item-popup">
            <div className="body-popup__image">
              <img src={obj?.photo} alt={obj?.title} />
            </div>
            <div className="body-popup__title">{obj?.title}</div>
          </div>
          <div className="popup__actions">
            <button className="popup__button button button--inherit" onClick={onClose}>
              Cancel
            </button>
            <button className="popup__button button button--del" onClick={onDelete}>
              <RemoveSvg/>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
