import React from 'react';

import { ButtonInherit, ButtonDelate, ButtonClose } from './buttons';

export const Popup = ({ isOpen, onClose, onDelete, obj }) => {
  const popupClassName = isOpen ? 'popup open' : 'popup';

  console.log(obj);

  return (
    <div className={popupClassName}>
      <div className="popup__wrapper">
        <div className="popup__content">
          <ButtonClose click={onClose} />

          <h3 className="popup__title">Are you sure you want to delete this object?</h3>
          <div className="popup__item  item-popup">
            {obj?.serialNumber && (
              <div className={`item-popup__dot ${obj.isNew ? 'active' : ''}`}></div>
            )}
            {obj?.photo && <img className="item-popup__image" src={obj.photo} alt={obj.title} />}
            <div className="item-popup__title title-small"><span>{obj?.title}</span> <span>{obj?.serialNumber}</span> </div>
          </div>
          <div className="popup__actions">
            <ButtonInherit click={onClose} title="Cancel" />
            <ButtonDelate click={onDelete} title="Delete" />
          </div>
        </div>
      </div>
    </div>
  );
};
