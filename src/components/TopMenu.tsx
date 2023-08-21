import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useDateFormat } from '../hooks';
import { LanguageSelector } from './UI/LanguageSelector';

import LogoPng from '../assets/img/logo.png';
import { ReactComponent as ClockSvg } from '../assets/img/icons/clock.svg';
import { RootState } from '../redux/store';

export const TopMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dateFormat = useDateFormat();

  const activeSessions = useSelector((state: RootState) => state.activeSessions.activeSessions);

  const [currentTime, setCurrentTime] = React.useState(new Date());

  const formattedTime = currentTime.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  React.useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  return (
    <header className="top-menu">
      <div className="top-menu__container-big">
        <div className="top-menu__container">
          <Link to="/" className="top-menu__logo">
            <img src={LogoPng} alt="Logo" />
          </Link>
          <div className="top-menu__body">
            <div className="top-menu__language">
              <LanguageSelector />
            </div>
            <div className="top-menu__active active-top-menu">
              <div className="active-top-menu__wrap">
                <div className="active-top-menu__week">
                  {dateFormat.formatDate(currentTime, 'dayOfWeek')}
                </div>
                <div className="active-top-menu__inner">
                  <div className="active-top-menu__date">
                    {dateFormat.formatDate(currentTime, 'dd/mmmm/yyyy')}
                  </div>
                  <div className="active-top-menu__time">
                    <ClockSvg />
                    {formattedTime}
                  </div>
                </div>
              </div>
              <div className="active-top-menu__session">
                {t('header.activeSessions', { count: activeSessions })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
