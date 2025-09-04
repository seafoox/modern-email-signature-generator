import React from 'react';
import { SignatureData, TranslationSet } from '../types';

interface SignatureFormProps {
  data: SignatureData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onInputChange, t }) => {
  return (
    <form className="space-y-10">
      <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">{t.title}</h2>
      
      <Section title={t.personalInfo}>
        <InputField label={t.firstName} name="firstName" value={data.firstName} onChange={onInputChange} placeholder="e.g., Emily" />
        <InputField label={t.lastName} name="lastName" value={data.lastName} onChange={onInputChange} placeholder="e.g., Cooper" />
        <InputField label={t.role} name="role" value={data.role} onChange={onInputChange} placeholder="e.g., Marketing Associate" />
        <InputField label={t.company} name="company" value={data.company} onChange={onInputChange} placeholder="e.g., Savoir" />
        <InputField label={t.pictureUrl} name="pictureUrl" type="url" value={data.pictureUrl} onChange={onInputChange} className="sm:col-span-2" placeholder="https://..." />
      </Section>

      <Section title={t.contactDetails}>
        <InputField label={t.email} name="email" type="email" value={data.email} onChange={onInputChange} placeholder="e.g., emily.cooper@savoir.com" />
        <InputField label={t.phoneNumber} name="phoneNumber" type="tel" value={data.phoneNumber} onChange={onInputChange} placeholder="e.g., +33 7 12 34 56 78" />
        <InputField label={t.address} name="address" value={data.address} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., 1 Place de l'Estrapade, 75005 Paris" />
        <InputField label={t.websiteUrl} name="websiteUrl" type="url" value={data.websiteUrl} onChange={onInputChange} className="sm:col-span-2" placeholder="https://..." />
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
      
      <Section title={t.misc}>
        <InputField label={t.quote} name="quote" value={data.quote} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Your company motto..." />
        <InputField label={t.disclaimer} name="disclaimer" value={data.disclaimer} onChange={onInputChange} className="sm:col-span-2" placeholder="e.g., Ce message est confidentiel..." />
      </Section>
    </form>
  );
};

export default SignatureForm;