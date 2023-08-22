import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PhotoCover from '../assets/img/user/photo-cover.svg';
import { ReactComponent as SettingsSvg } from '../assets/img/icons/settings.svg';

export const NavigationMenu: React.FC = () => {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  return (
    <aside className="page__sidebar sidebar">
      <div className="sidebar__container-big">
        <div className="sidebar__avatar avatar-sidebar">
          <img className="avatar-sidebar__image" src={PhotoCover} alt="Avatar" />
          <Link to="/" className="avatar-sidebar__link" aria-label={t('button.close')}>
            <SettingsSvg />
          </Link>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__items">
            <li className="sidebar__item">
              <NavLink to={`/orders`} className="sidebar__link">
                {t('header.orders')}
              </NavLink>
            </li>
            <li>
              <NavLink to={`/products`} className="sidebar__link">
                {t('header.products')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
