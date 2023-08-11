import React from 'react';

import { ReactComponent as CloseSvg } from '../../../assets/img/icons/close.svg';

export const ButtonClose = ({ click }) => {
  return (
    <button className="button button--close" onClick={click}>
      <CloseSvg />
    </button>
  );
};
