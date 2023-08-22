import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);

    document.documentElement.lang = selectedLanguage;
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);

      document.documentElement.lang = savedLanguage;
    }
  }, [i18n]);

  return (
    <div className="select-wraper">
      <select
        onChange={handleLanguageChange}
        value={i18n.language}
        aria-label={t('select.language')}
      >
        <option value="en">English</option>
        <option value="ua">Українська</option>
      </select>
    </div>
  );
};
