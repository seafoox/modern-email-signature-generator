
import React, { useState } from 'react';
import { translations } from '../translations';

const primaryLanguages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
];

const secondaryLanguages = [
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ar', name: 'العربية' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ru', name: 'Русский' },
];


interface LanguageSelectorProps {
  currentLang: string;
  setLang: (lang: keyof typeof translations) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, setLang }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isMoreActive = secondaryLanguages.some(l => l.code === currentLang);

  return (
    <div className="relative z-50 flex items-center space-x-2 bg-white/50 backdrop-blur-sm p-1 rounded-full shadow-sm">
      {primaryLanguages.map(({ code, name }) => (
        <button
          key={code}
          onClick={() => setLang(code as keyof typeof translations)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out
            ${currentLang === code
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
            }`}
          aria-pressed={currentLang === code}
        >
          {name}
        </button>
      ))}
      <div 
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out
            ${isMoreActive
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-600 hover:bg-slate-200'
            }`}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          aria-label="More languages"
        >
          🌏
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 pt-2">
            <div className="w-32 bg-white rounded-lg shadow-xl py-1 ring-1 ring-black ring-opacity-5">
              {secondaryLanguages.map(({ code, name }) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code as keyof typeof translations);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm 
                    ${currentLang === code 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
