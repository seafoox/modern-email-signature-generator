import React from 'react';
import { SignatureData, TranslationSet, SignatureLayout } from '../types';
import ClassicTemplate from './templates/ClassicTemplate';
import CompactTemplate from './templates/CompactTemplate';
import ModernTemplate from './templates/ModernTemplate';

interface SignaturePreviewProps {
  data: SignatureData;
  t: TranslationSet['preview'];
  theme: 'light' | 'dark';
  layout: SignatureLayout;
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data, t, theme, layout }) => {
  const commonProps = { data, t, theme };

  return (
    <>
      {layout === 'classic' && <ClassicTemplate {...commonProps} />}
      {layout === 'compact' && <CompactTemplate {...commonProps} />}
      {layout === 'modern' && <ModernTemplate {...commonProps} />}
    </>
  );
};

export default SignaturePreview;