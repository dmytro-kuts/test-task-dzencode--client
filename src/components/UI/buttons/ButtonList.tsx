import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ListSvg } from '../../../assets/img/icons/list.svg';

interface ButtonProps {
  click: () => void;
}

export const ButtonList: React.FC<ButtonProps> = ({ click }) => {
  const { t } = useTranslation();
  return (
    <button className="button button--list" aria-label={t('button.list')} onClick={click}>
      <ListSvg />
    </button>
  );
};
