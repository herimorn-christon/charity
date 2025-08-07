import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        className={`p-1 rounded-md ${
          i18n.language === 'en' ? 'bg-gray-100 font-medium' : 'text-gray-600'
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        className={`p-1 rounded-md ${
          i18n.language === 'sw' ? 'bg-gray-100 font-medium' : 'text-gray-600'
        }`}
        onClick={() => changeLanguage('sw')}
      >
        SW
      </button>
    </div>
  );
};

export default LanguageSwitcher;