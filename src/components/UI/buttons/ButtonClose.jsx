import React from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloseSvg } from '../../../assets/img/icons/close.svg';

export const ButtonClose = ({ click }) => {
  const { t } = useTranslation();
  return (
    <button className="button button--close" aria-label={t('button.close')} onClick={click}>
      <CloseSvg />
    </button>
  );
};
