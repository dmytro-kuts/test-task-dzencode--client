import React from 'react';
import { Link } from 'react-router-dom';

import LogoPng from '../assets/img/logo.png';
import { ReactComponent as ClockSvg } from '../assets/img/icons/clock.svg';

export const TopMenu = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [activeSessions, setActiveSessions] = React.useState(0);

  React.useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  const dayOfWeek = currentTime.toLocaleString('en', { weekday: 'long' });
  const formattedDate = currentTime.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <header className="top-menu">
      <div className="top-menu__container-big">
        <div className="top-menu__container">
          <Link to="/" className="top-menu__logo">
            <img src={LogoPng} alt="Logo" />
          </Link>
          <div className="top-menu__active active-top-menu">
            <div className="active-top-menu__wrap">
              <div className="active-top-menu__week">{dayOfWeek}</div>
              <div className="active-top-menu__inner">
                <div className="active-top-menu__date">{formattedDate}</div>
                <div className="active-top-menu__time">
                  <ClockSvg />
                  {formattedTime}
                </div>
              </div>
            </div>
            <div className="active-top-menu__session">Active Sessions: {activeSessions}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
