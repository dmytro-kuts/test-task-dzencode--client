import React from 'react';

import { ReactComponent as RemoveSvg } from '../../../assets/img/icons/remove.svg';

export const ButtonRemove = ({ click }) => {
  return (
    <button className="button button--remove" aria-label="Remove" onClick={click}>
      <RemoveSvg />
    </button>
  );
};
