
import React, { useState, useRef, useEffect } from 'react';
import { SignatureData, SignatureLayout } from './types';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';
import LanguageSelector from './components/LanguageSelector';
import ColorCustomizer from './components/ColorCustomizer';
import ThemeToggler from './components/ThemeToggler';
import ShareTemplate from './components/ShareTemplate';
import { translations } from './translations';

type Language = keyof typeof translations;
type Theme = 'light' | 'dark';

// Helper function to copy plain text to clipboard with a fallback mechanism.
const copyTextToClipboard = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(resolve).catch(err => {
        console.warn('Clipboard API failed, falling back to execCommand.', err);
        fallbackCopyText(text, resolve, reject);
      });
    } else {
      fallbackCopyText(text, resolve, reject);
    }
  });
};

const fallbackCopyText = (text: string, resolve: () => void, reject: (reason?: any) => void) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      resolve();
    } else {
      reject(new Error('Fallback copy method failed.'));
    }
  } catch (err) {
    reject(err);
  } finally {
    document.body.removeChild(textArea);
  }
};

const fallbackCopyHtml = (html: string, resolve: () => void, reject: (reason?: any) => void) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);
    
    const range = document.createRange();
    range.selectNodeContents(tempDiv);
    const selection = window.getSelection();
    if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
    }
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            resolve();
        } else {
            reject(new Error('Fallback HTML copy failed.'));
        }
    } catch (err) {
        reject(err);
    } finally {
        document.body.removeChild(tempDiv);
        if (window.getSelection()) {
            window.getSelection()?.removeAllRanges();
        }
    }
};

// Helper function to copy HTML to clipboard using a robust fallback method.
const copyHtmlToClipboard = (html: string): Promise<void> => {
   return new Promise((resolve, reject) => {
        fallbackCopyHtml(html, resolve, reject);
   });
};

const getComplementaryColor = (hex: string): string => {
  if (!hex || hex.length < 4) return '#4A4A4A'; // Return a default if hex is invalid

  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(char => char + char).join('');
  }
  
  if (cleanHex.length !== 6) return '#4A4A4A'; // Return a default if hex is invalid

  try {
    const r = 255 - parseInt(cleanHex.substring(0, 2), 16);
    const g = 255 - parseInt(cleanHex.substring(2, 4), 16);
    const b = 255 - parseInt(cleanHex.substring(4, 6), 16);

    const toHex = (c: number) => c.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  } catch (e) {
    return '#4A4A4A'; // Return default on parsing error
  }
};

const LOCAL_STORAGE_KEY = 'emailSignatureWizardState';

const defaultSignatureData: SignatureData = {
  firstName: "Emily",
  lastName: "Cooper",
  role: "Marketing Associate",
  company: "Savoir",
  phoneNumber: "+33 7 12 34 56 78",
  email: "emily.cooper@savoir.com",
  address: "1 Place de l'Estrapade, 75005 Paris, France",
  pictureUrl: "https://i.pravatar.cc/100?u=emilycooper",
  instagramUrl: "https://www.instagram.com/emilyinparis",
  facebookUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/emily-cooper-savoir",
  websiteUrl: "https://savoir.com",
  youtubeUrl: "",
  primaryColor: "#D81B60",
  secondaryColor: "#3D5A80",
  disclaimer: "Ce message est confidentiel. Merci de ne pas l'imprimer pour préserver l'environnement.",
  quote: "Bring your vision to life with our customizable furniture designs!",
  bookCallUrl: "",
  bookVisitUrl: "",
  bookCallLabel: translations.fr.preview.bookCallButton,
  bookVisitLabel: translations.fr.preview.bookVisitButton,
};

const App: React.FC = () => {
  // Load initial state from local storage or set defaults
  const loadInitialState = () => {
    try {
      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        // Ensure all keys are present by merging with defaults
        const loadedData = { ...defaultSignatureData, ...savedState.signatureData };
        return {
          lang: savedState.lang || 'fr',
          theme: savedState.theme || 'light',
          layout: savedState.layout || 'classic',
          signatureData: loadedData,
        };
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
    // Return defaults if nothing is saved or if an error occurred
    return {
      lang: 'fr',
      theme: 'light',
      layout: 'classic',
      signatureData: defaultSignatureData,
    };
  };

  const [initialState] = useState(loadInitialState);

  const [lang, setLang] = useState<Language>(initialState.lang);
  const t = translations[lang];
  const [theme, setTheme] = useState<Theme>(initialState.theme);
  const [layout, setLayout] = useState<SignatureLayout>(initialState.layout);
  const [signatureData, setSignatureData] = useState<SignatureData>(initialState.signatureData);

  const previewRef = useRef<HTMLDivElement>(null);
  const [copyButtonText, setCopyButtonText] = useState(t.app.copyButton);
  const [copyStatusMessage, setCopyStatusMessage] = useState('');
  const [isGeneratingColors, setIsGeneratingColors] = useState(false);

  const [shareAppearance, setShareAppearance] = useState(true);
  const [shareCompanyInfo, setShareCompanyInfo] = useState(true);
  const [shareUrlButtonText, setShareUrlButtonText] = useState(t.form.generateAndCopyLink);

  // Effect to save state to local storage on any change
  useEffect(() => {
    try {
      const stateToSave = { lang, theme, layout, signatureData };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [lang, theme, layout, signatureData]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateData = urlParams.get('template');
    if (templateData) {
      try {
        // Unicode-safe Base64 decoding
        const decodedString = decodeURIComponent(escape(atob(templateData)));
        const parsedData = JSON.parse(decodedString);
        
        if (parsedData.layout) {
          setLayout(parsedData.layout);
        }

        const signatureUpdate = { ...parsedData };
        delete signatureUpdate.layout;
        setSignatureData(prev => ({ ...prev, ...signatureUpdate }));

      } catch (error) {
        console.error("Failed to parse template data from URL:", error);
      }
    }
  }, []);

  useEffect(() => {
    setCopyButtonText(t.app.copyButton);
    setShareUrlButtonText(t.form.generateAndCopyLink);

    setSignatureData(prev => {
        const defaultCallLabels = Object.values(translations).map(langSet => langSet.preview.bookCallButton);
        const isDefaultCallLabel = defaultCallLabels.includes(prev.bookCallLabel);

        const defaultVisitLabels = Object.values(translations).map(langSet => langSet.preview.bookVisitButton);
        const isDefaultVisitLabel = defaultVisitLabels.includes(prev.bookVisitLabel);

        return {
            ...prev,
            bookCallLabel: isDefaultCallLabel ? t.preview.bookCallButton : prev.bookCallLabel,
            bookVisitLabel: isDefaultVisitLabel ? t.preview.bookVisitButton : prev.bookVisitLabel,
        };
    });
  }, [lang, t.app.copyButton, t.preview.bookCallButton, t.preview.bookVisitButton, t.form.generateAndCopyLink]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'primaryColor') {
      const newSecondaryColor = getComplementaryColor(value);
      setSignatureData(prev => ({
        ...prev,
        primaryColor: value,
        secondaryColor: newSecondaryColor,
      }));
    } else {
      setSignatureData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLayoutChange = (newLayout: SignatureLayout) => {
    setLayout(newLayout);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all fields? This action cannot be undone.")) {
        // Preserve language setting
        const currentState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
        const currentLang = currentState.lang || 'fr';
        
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        
        // Restore language setting after clearing
        const clearedState = { lang: currentLang };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clearedState));

        setSignatureData(defaultSignatureData);
        setLayout('classic');
        setTheme('light');
    }
  };

  const handleGenerateColors = async () => {
    setIsGeneratingColors(true);
    try {
      const randomHex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${randomHex}&mode=analogic&count=3`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.colors && data.colors.length >= 3) {
        const primaryHex = data.colors[0].hex.value;
        const secondaryHex = data.colors[2].hex.value; // Use first and third for better contrast

        setSignatureData(prev => ({
          ...prev,
          primaryColor: primaryHex,
          secondaryColor: secondaryHex,
        }));
      }
    } catch (error) {
      console.error('Failed to generate colors:', error);
    } finally {
      setIsGeneratingColors(false);
    }
  };

  const handleCopy = async () => {
    if (previewRef.current?.firstElementChild) {
        const signatureHtml = previewRef.current.firstElementChild.innerHTML;
        try {
            await copyHtmlToClipboard(signatureHtml);
            
            setCopyButtonText(t.app.copySuccess);
            setCopyStatusMessage(t.app.copySuccessStatus);
            setTimeout(() => {
                setCopyButtonText(t.app.copyButton);
                setCopyStatusMessage('');
            }, 2500);
        } catch (err) {
            console.error('Failed to copy HTML: ', err);
            setCopyButtonText(t.app.copyFailure);
            setCopyStatusMessage(t.app.copyFailureStatus);
            setTimeout(() => {
                setCopyButtonText(t.app.copyButton);
                setCopyStatusMessage('');
            }, 2500);
        }
    }
  };

  const handleGenerateAndCopyUrl = () => {
    const dataToShare: Partial<SignatureData & { layout: SignatureLayout }> = {};

    if (shareAppearance) {
      dataToShare.layout = layout;
      dataToShare.primaryColor = signatureData.primaryColor;
      dataToShare.secondaryColor = signatureData.secondaryColor;
    }

    if (shareCompanyInfo) {
      dataToShare.company = signatureData.company;
      dataToShare.address = signatureData.address;
      dataToShare.websiteUrl = signatureData.websiteUrl;
      dataToShare.bookCallUrl = signatureData.bookCallUrl;
      dataToShare.bookVisitUrl = signatureData.bookVisitUrl;
      dataToShare.bookCallLabel = signatureData.bookCallLabel;
      dataToShare.bookVisitLabel = signatureData.bookVisitLabel;
      dataToShare.quote = signatureData.quote;
      dataToShare.disclaimer = signatureData.disclaimer;
    }

    if (Object.keys(dataToShare).length > 0) {
      const jsonString = JSON.stringify(dataToShare);
      // Unicode-safe Base64 encoding
      const base64String = btoa(unescape(encodeURIComponent(jsonString)));
      
      const baseUrl = "https://ai.studio/apps/drive/133sdXtU189icU4aOe4_TrxvUtC_sJDGK";
      const url = new URL(baseUrl);
      url.searchParams.set('template', base64String);
      const urlToCopy = url.toString();
      
      copyTextToClipboard(urlToCopy).then(() => {
        setShareUrlButtonText(t.form.linkCopied);
        setTimeout(() => {
          setShareUrlButtonText(t.form.generateAndCopyLink);
        }, 2500);
      }).catch(err => {
        console.error('Failed to copy share URL: ', err);
      });
    }
};

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800 flex flex-col">
       <div className="sr-only" aria-live="polite" role="status">
        {copyStatusMessage}
      </div>
      <header className="max-w-7xl w-full mx-auto pt-8 px-4 sm:px-6 lg:px-8 flex justify-end">
        <LanguageSelector currentLang={lang} setLang={setLang} />
      </header>
      <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
            {t.app.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            {t.app.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
              <SignatureForm 
                data={signatureData} 
                onInputChange={handleInputChange}
                onReset={handleReset}
                t={t.form}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
             <div className="sticky top-12">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-slate-900">{t.app.livePreview}</h2>
                    <ThemeToggler theme={theme} onToggle={handleThemeToggle} />
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
                  >
                    {copyButtonText}
                  </button>
                </div>
                <div
                  ref={previewRef}
                  className={`p-6 rounded-2xl shadow-lg ${
                    theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                  } transition-colors duration-300`}
                >
                  <SignaturePreview data={signatureData} t={t.preview} theme={theme} layout={layout} />
                </div>
                <div className="mt-8">
                    <ColorCustomizer
                        primaryColor={signatureData.primaryColor}
                        secondaryColor={signatureData.secondaryColor}
                        onInputChange={handleInputChange}
                        onGenerateColors={handleGenerateColors}
                        isGenerating={isGeneratingColors}
                        layout={layout}
                        onLayoutChange={handleLayoutChange}
                        t={t.form}
                    />
                </div>
                <div className="mt-8">
                  <ShareTemplate
                    shareAppearance={shareAppearance}
                    onShareAppearanceChange={setShareAppearance}
                    shareCompanyInfo={shareCompanyInfo}
                    onShareCompanyInfoChange={setShareCompanyInfo}
                    onGenerateAndCopy={handleGenerateAndCopyUrl}
                    buttonText={shareUrlButtonText}
                    t={{
                      shareTemplateTitle: t.form.shareTemplateTitle,
                      shareAppearance: t.form.shareAppearance,
                      shareAppearanceDescription: t.form.shareAppearanceDescription,
                      shareCompanyInfo: t.form.shareCompanyInfo,
                      shareCompanyInfoDescription: t.form.shareCompanyInfoDescription,
                      generateAndCopyLink: t.form.generateAndCopyLink,
                      linkCopied: t.form.linkCopied
                    }}
                  />
                </div>
             </div>
          </div>
        </div>
      </main>
      <footer className="w-full text-center py-6 text-slate-500 text-sm">
        Made with ❤️ from <a href="https://maps.app.goo.gl/z1u9H6UymB7qtZmK9" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600">Bordeaux, France</a>
      </footer>
    </div>
  );
};

export default App;
