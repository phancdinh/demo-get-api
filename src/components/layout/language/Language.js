import React from 'react';
import { useTranslation } from 'react-i18next';
import flagVi from './images/flag_vi.svg';
import flagEn from './images/flag_en.svg';

const VI_LANG = 'vi';
const EN_LANG = 'en';
export default function Language() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  function onClickBtnLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="language d-flex align-items-center">
      <button
        type="button"
        id="flag_en"
        className="bg-transparent border-0 p-0"
        hidden={language === EN_LANG}
        onClick={() => onClickBtnLang(EN_LANG)}
      >
        <img src={flagEn} alt="English" />
      </button>
      <button
        type="button"
        id="flag_vi"
        className="bg-transparent border-0 p-0"
        hidden={language === VI_LANG}
        onClick={() => onClickBtnLang(VI_LANG)}
      >
        <img src={flagVi} alt="Vietnamese" />
      </button>
    </div>
  );
}
