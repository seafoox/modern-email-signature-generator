import React, { useState, useEffect } from 'react';
import { TranslationSet, SignatureLayout } from '../types';

interface ColorCustomizerProps {
  primaryColor: string;
  secondaryColor: string;
  layout: SignatureLayout;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateColors: () => void;
  onLayoutChange: (layout: SignatureLayout) => void;
  isGenerating: boolean;
  t: TranslationSet['form'];
}

const ColorInput: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => {
  const [textValue, setTextValue] = useState(value);

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleTextBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      onChange({
        ...e,
        target: { ...e.target, name, value: e.target.value },
      } as React.ChangeEvent<HTMLInputElement>);
    } else {
      setTextValue(value);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="flex-grow">
      <label htmlFor={`${name}-color`} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          name={name}
          id={`${name}-color`}
          value={value}
          onChange={handleColorPickerChange}
          className="w-10 h-10 p-0 border border-slate-300 rounded-md cursor-pointer"
          aria-label={label}
        />
        <input
          type="text"
          id={`${name}-text`}
          value={textValue.toUpperCase()}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          aria-label={`${label} hex value`}
          className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
          maxLength={7}
        />
      </div>
    </div>
  );
};

const LayoutButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ label, isActive, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className={`w-full p-2 border rounded-lg transition-all duration-200 ${
            isActive
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
        }`}
    >
        <div className="flex flex-col items-center">
            <div className="w-full h-16 rounded bg-white border border-slate-200 flex items-center justify-center overflow-hidden mb-2">
                {children}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>{label}</span>
        </div>
    </button>
);


const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  primaryColor,
  secondaryColor,
  layout,
  onInputChange,
  onGenerateColors,
  onLayoutChange,
  isGenerating,
  t,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 border-b pb-4 mb-6">{t.customizeAppearance}</h3>
        <div className="flex items-end gap-4">
          <ColorInput label={t.primaryColor} name="primaryColor" value={primaryColor} onChange={onInputChange} />
          <ColorInput label={t.secondaryColor} name="secondaryColor" value={secondaryColor} onChange={onInputChange} />
          <button
              type="button"
              onClick={onGenerateColors}
              disabled={isGenerating}
              aria-label={isGenerating ? t.generatingPalette : t.generatePalette}
              className="flex-shrink-0 h-10 w-10 flex justify-center items-center bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
            >
              {isGenerating ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
              )}
            </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 border-b pb-4 mb-6">{t.layout}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LayoutButton label={t.layoutClassic} isActive={layout === 'classic'} onClick={() => onLayoutChange('classic')}>
                <div className="flex items-center w-full h-full p-2 gap-2">
                    <div className="w-1/4 h-full flex flex-col items-center gap-1">
                        <div className="w-full aspect-square rounded-sm bg-slate-300"></div>
                    </div>
                    <div className="w-px h-full" style={{backgroundColor: primaryColor}}></div>
                    <div className="flex-1 h-full flex flex-col gap-1.5">
                        <div className="w-full h-2 rounded-sm bg-slate-600"></div>
                        <div className="w-4/5 h-2 rounded-sm bg-slate-400"></div>
                        <div className="w-full h-1.5 rounded-sm bg-slate-300"></div>
                        <div className="w-full h-1.5 rounded-sm bg-slate-300"></div>
                    </div>
                </div>
            </LayoutButton>
            <LayoutButton label={t.layoutCompact} isActive={layout === 'compact'} onClick={() => onLayoutChange('compact')}>
                 <div className="flex items-center w-full h-full p-2 gap-2">
                    <div className="w-1/4 h-full flex flex-col items-center">
                        <div className="w-full aspect-square rounded-sm bg-slate-300"></div>
                    </div>
                    <div className="flex-1 h-full flex flex-col gap-1.5">
                        <div className="w-full h-2 rounded-sm" style={{backgroundColor: primaryColor}}></div>
                        <div className="w-4/5 h-2 rounded-sm bg-slate-400"></div>
                        <div className="w-full h-1.5 rounded-sm bg-slate-300"></div>
                        <div className="w-full h-1.5 rounded-sm bg-slate-300"></div>
                    </div>
                </div>
            </LayoutButton>
            <LayoutButton label={t.layoutModern} isActive={layout === 'modern'} onClick={() => onLayoutChange('modern')}>
                 <div className="flex items-stretch justify-center w-full h-full">
                    <div className="w-2/5 h-full flex flex-col items-center justify-center gap-1 p-1 rounded-l-sm" style={{backgroundColor: primaryColor}}>
                        <div className="w-6 h-6 rounded-full bg-white/80 border border-white/90"></div>
                        <div className="w-4/5 h-1.5 bg-white/80 rounded-sm"></div>
                        <div className="w-2/3 h-1.5 bg-white/70 rounded-sm"></div>
                    </div>
                    <div className="flex-1 h-full flex flex-col justify-center gap-1.5 p-1 pl-2 rounded-r-sm">
                        <div className="w-full h-1.5 bg-slate-400 rounded-sm mb-1"></div>
                        <div className="w-full h-1.5 bg-slate-300 rounded-sm"></div>
                        <div className="w-full h-1.5 bg-slate-300 rounded-sm"></div>
                        <div className="w-full h-1.5 bg-slate-300 rounded-sm"></div>
                    </div>
                </div>
            </LayoutButton>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;