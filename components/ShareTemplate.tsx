import React from 'react';

interface ShareTemplateProps {
  shareAppearance: boolean;
  onShareAppearanceChange: (checked: boolean) => void;
  shareCompanyInfo: boolean;
  onShareCompanyInfoChange: (checked: boolean) => void;
  onGenerateAndCopy: () => void;
  buttonText: string;
  t: {
    shareTemplateTitle: string;
    shareAppearance: string;
    shareAppearanceDescription: string;
    shareCompanyInfo: string;
    shareCompanyInfoDescription: string;
    generateAndCopyLink: string;
    linkCopied: string;
  };
}

const ToggleField: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
  id: string;
}> = ({ checked, onChange, label, description, id }) => (
    <div className="relative flex items-start">
        <div className="flex h-6 items-center">
            <input
                id={id}
                aria-describedby={`${id}-description`}
                name={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
            />
        </div>
        <div className="ml-3 text-sm leading-6">
            <label htmlFor={id} className="font-medium text-slate-900">
                {label}
            </label>
            <p id={`${id}-description`} className="text-slate-500">
                {description}
            </p>
        </div>
    </div>
);

const ShareTemplate: React.FC<ShareTemplateProps> = ({
  shareAppearance,
  onShareAppearanceChange,
  shareCompanyInfo,
  onShareCompanyInfoChange,
  onGenerateAndCopy,
  buttonText,
  t
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 border-b pb-4 mb-6">{t.shareTemplateTitle}</h3>
        <div className="space-y-4">
            <ToggleField
                id="share-appearance"
                label={t.shareAppearance}
                description={t.shareAppearanceDescription}
                checked={shareAppearance}
                onChange={onShareAppearanceChange}
            />
            <ToggleField
                id="share-company-info"
                label={t.shareCompanyInfo}
                description={t.shareCompanyInfoDescription}
                checked={shareCompanyInfo}
                onChange={onShareCompanyInfoChange}
            />
        </div>
        <div className="mt-6">
            <button
                type="button"
                onClick={onGenerateAndCopy}
                className="w-full px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 ease-in-out disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                {buttonText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ShareTemplate;
