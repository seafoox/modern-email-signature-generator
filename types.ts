export interface SignatureData {
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  phoneNumber: string;
  email: string;
  address: string;
  pictureUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  youtubeUrl: string;
  primaryColor: string;
  secondaryColor: string;
  disclaimer: string;
  quote: string;
  bookCallUrl: string;
  bookVisitUrl: string;
  bookCallLabel: string;
  bookVisitLabel: string;
}

export type SignatureLayout = 'classic' | 'compact' | 'modern';

export interface TranslationSet {
  app: {
    title: string;
    subtitle: string;
    livePreview: string;
    copyButton: string;
    copySuccess: string;
    copyFailure: string;
    copySuccessStatus: string;
    copyFailureStatus: string;
  };
  form: {
    title: string;
    personalInfo: string;
    contactDetails: string;
    socialMedia: string;
    misc: string;
    ctaButtons: string;
    customization: string;
    customizeAppearance: string;
    firstName: string;
    lastName:string;
    role: string;
    company: string;
    email: string;
    phoneNumber: string;
    address: string;
    websiteUrl: string;
    pictureUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
    disclaimer: string;
    quote: string;
    bookCallUrl: string;
    bookVisitUrl: string;
    bookCallLabel: string;
    bookVisitLabel: string;
    primaryColor: string;
    secondaryColor: string;
    generatePalette: string;
    generatingPalette: string;
    layout: string;
    layoutClassic: string;
    layoutCompact: string;
    layoutModern: string;
  };
  preview: {
    phone: string;
    email: string;
    address: string;
    website: string;
    bookCallButton: string;
    bookVisitButton: string;
  };
}