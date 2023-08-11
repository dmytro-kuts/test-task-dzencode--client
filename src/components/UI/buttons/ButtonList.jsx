import React from 'react';

import { ReactComponent as ListSvg } from '../../../assets/img/icons/list.svg';

export const ButtonList = ({ click }) => {
  return (
    <button className="button button--list" onClick={click}>
      <ListSvg />
    </button>
  );
};
