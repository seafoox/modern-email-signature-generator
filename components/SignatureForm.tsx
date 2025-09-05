
import React from 'react';
import { SignatureData, TranslationSet } from '../types';

interface SignatureFormProps {
  data: SignatureData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  t: TranslationSet['form'];
}

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}> = ({ label, name, value, onChange, placeholder, type = 'text', className }) => (
  <div className={className}>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <fieldset>
        <legend className="text-lg font-semibold text-slate-800 border-b w-full pb-2 mb-6">{title}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            {children}
        </div>
    </fieldset>
);

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onInputChange, onReset, t }) => {
  return (
    <form className="space-y-10">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-900">{t.title}</h2>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          aria-label={t.resetButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M15.325 4.875a.75.75 0 00-1.06-1.06l-.813.812a6.983 6.983 0 00-10.9 6.25a.75.75 0 001.499-.054a5.484 5.484 0 019.226-4.593l-.811.811a.75.75 0 001.06 1.06l2.122-2.122a.75.75 0 000-1.06l-2.122-2.122zM4.675 15.125a.75.75 0 001.06 1.06l.813-.812a6.983 6.983 0 0010.9-6.25a.75.75 0 00-1.5.054a5.484 5.484 0 01-9.226 4.593l.811-.811a.75.75 0 00-1.06-1.06l-2.122 2.122a.75.75 0 000 1.06l2.122 2.122z" clipRule="evenodd" />
          </svg>
          <span>{t.resetButton}</span>
        </button>
      </div>
      
      <Section title={t.personalInfo}>
        <InputField label={t.firstName} name="firstName" value={data.firstName} onChange={onInputChange} placeholder="e.g., Emily" />
        <InputField label={t.lastName} name="lastName" value={data.lastName} onChange={onInputChange} placeholder="e.g., Cooper" />
        <InputField label={t.role} name="role" value={data.role} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Marketing Associate" />
        <InputField label={t.email} name="email" type="email" value={data.email} onChange={onInputChange} placeholder="e.g., emily.cooper@savoir.com" />
        <InputField label={t.phoneNumber} name="phoneNumber" type="tel" value={data.phoneNumber} onChange={onInputChange} placeholder="e.g., +33 7 12 34 56 78" />
        <InputField label={t.pictureUrl} name="pictureUrl" type="url" value={data.pictureUrl} onChange={onInputChange} className="sm:col-span-2" placeholder="https://..." />
      </Section>

      <Section title={t.companyInfo}>
        <InputField label={t.company} name="company" value={data.company} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Savoir" />
        <InputField label={t.address} name="address" value={data.address} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., 1 Place de l'Estrapade, 75005 Paris" />
        <InputField label={t.websiteUrl} name="websiteUrl" type="url" value={data.websiteUrl} onChange={onInputChange} className="sm:col-span-2" placeholder="https://..." />
        <InputField label={t.quote} name="quote" value={data.quote} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Your company motto..." />
        <InputField label={t.disclaimer} name="disclaimer" value={data.disclaimer} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Ce message est confidentiel..." />
      </Section>

      <Section title={t.socialMedia}>
        <InputField label={t.linkedinUrl} name="linkedinUrl" type="url" value={data.linkedinUrl} onChange={onInputChange} placeholder="https://linkedin.com/in/..."/>
        <InputField label={t.instagramUrl} name="instagramUrl" type="url" value={data.instagramUrl} onChange={onInputChange} placeholder="https://instagram.com/..." />
        <InputField label={t.facebookUrl} name="facebookUrl" type="url" value={data.facebookUrl} onChange={onInputChange} placeholder="https://facebook.com/..." />
        <InputField label={t.youtubeUrl} name="youtubeUrl" type="url" value={data.youtubeUrl} onChange={onInputChange} placeholder="https://youtube.com/c/..." />
      </Section>

      <fieldset>
        <legend className="text-lg font-semibold text-slate-800 border-b w-full pb-2 mb-6">{t.ctaButtons}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-4 gap-y-6">
          <InputField label={t.bookCallUrl} name="bookCallUrl" type="url" value={data.bookCallUrl} onChange={onInputChange} placeholder="https://calendly.com/..." className="sm:col-span-2" />
          <InputField label={t.bookCallLabel} name="bookCallLabel" value={data.bookCallLabel} onChange={onInputChange} className="sm:col-span-3" />
          <InputField label={t.bookVisitUrl} name="bookVisitUrl" type="url" value={data.bookVisitUrl} onChange={onInputChange} placeholder="https://booking.example.com/..." className="sm:col-span-2" />
          <InputField label={t.bookVisitLabel} name="bookVisitLabel" value={data.bookVisitLabel} onChange={onInputChange} className="sm:col-span-3" />
        </div>
      </fieldset>
    </form>
  );
};

export default SignatureForm;
