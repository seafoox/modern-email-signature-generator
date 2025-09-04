
import React from 'react';
import { SignatureData, TranslationSet } from '../../types';

interface TemplateProps {
  data: SignatureData;
  t: TranslationSet['preview'];
  theme: 'light' | 'dark';
}

const ModernTemplate: React.FC<TemplateProps> = ({ data, t, theme }) => {
  const isDarkMode = theme === 'dark';

  const fullName = `${data.firstName} ${data.lastName}`.toUpperCase().trim();
  const safePictureUrl = data.pictureUrl || `https://i.pravatar.cc/100?u=${fullName.replace(/\s/g, '')}`;

  const getContrastColor = (hex: string): string => {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    if (hex.length !== 6) {
      return '#FFFFFF'; // default to white for invalid hex
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
  };

  const leftColumnTextColor = getContrastColor(data.primaryColor);

  const lightTheme = {
    mainText: '#2d3748',
    secondaryText: '#718096',
  };

  const darkTheme = {
    mainText: '#e2e8f0',
    secondaryText: '#a0aec0',
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  const fontStack = 'Arial, sans-serif';
  const nameFontStack = 'Georgia, Times, \'Times New Roman\', serif';
  
  const CtaButton: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
        backgroundColor: data.primaryColor,
        color: leftColumnTextColor,
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: fontStack,
    }}>
        {label}
    </a>
  );

  return (
    <div className="signature-container">
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: 'auto', fontFamily: fontStack, fontSize: '13px', color: currentTheme.mainText }}>
        <tbody>
          <tr>
            {/* Left Column */}
            <td valign="middle" align="center" style={{ backgroundColor: data.primaryColor, padding: '24px', width: '200px' }}>
              <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {data.pictureUrl && (
                    <tr>
                      <td align="center" style={{ paddingBottom: '12px' }}>
                        <img src={safePictureUrl} alt={fullName} width="90" height="90" style={{ display: 'block', borderRadius: '50%', width: '90px', height: '90px', objectFit: 'cover', border: `2px solid ${leftColumnTextColor}` }} />
                      </td>
                    </tr>
                  )}
                  {(data.firstName || data.lastName) && (
                    <tr>
                      <td align="center" style={{ fontFamily: nameFontStack, fontSize: '20px', fontWeight: 'bold', color: leftColumnTextColor, lineHeight: '1.1', letterSpacing: '1px', paddingBottom: '5px' }}>
                        {fullName}
                      </td>
                    </tr>
                  )}
                  {data.role && (
                    <tr>
                      <td align="center" style={{ fontFamily: fontStack, color: leftColumnTextColor, fontSize: '14px', paddingBottom: '12px' }}>
                        {data.role}
                      </td>
                    </tr>
                  )}
                  {(data.facebookUrl || data.instagramUrl || data.youtubeUrl || data.linkedinUrl) && (
                     <tr>
                       <td align="center">
                         <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}><tbody><tr>
                          {data.facebookUrl && <td style={{ padding: '0 5px' }}><a href={data.facebookUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={leftColumnTextColor}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.038v-3.47h3.038v-2.661c0-3.004 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.956.925-1.956 1.874v2.267h3.317l-.53 3.47h-2.787v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/></svg>
                          </a></td>}
                          {data.youtubeUrl && <td style={{ padding: '0 5px' }}><a href={data.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={leftColumnTextColor}><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                          </a></td>}
                          {data.instagramUrl && <td style={{ padding: '0 5px' }}><a href={data.instagramUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={leftColumnTextColor}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                          </a></td>}
                          {data.linkedinUrl && <td style={{ padding: '0 5px' }}><a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={leftColumnTextColor}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          </a></td>}
                         </tr></tbody></table>
                       </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </td>

            {/* Right Column */}
            <td valign="top" style={{ padding: '24px' }}>
               <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {data.quote && (
                    <tr>
                      <td colSpan={2} style={{ paddingBottom: '16px', fontStyle: 'italic', color: currentTheme.secondaryText }}>
                        "{data.quote}"
                      </td>
                    </tr>
                  )}
                  {data.email && (
                    <tr>
                      <td valign="middle" style={{ paddingRight: '10px', paddingBottom: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={currentTheme.mainText}><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
                      </td>
                      <td valign="middle" style={{ paddingBottom: '8px' }}><a href={`mailto:${data.email}`} style={{ color: data.secondaryColor, textDecoration: 'none' }}>{data.email}</a></td>
                    </tr>
                  )}
                  {data.websiteUrl && (
                     <tr>
                      <td valign="middle" style={{ paddingRight: '10px', paddingBottom: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={currentTheme.mainText}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                      </td>
                      <td valign="middle" style={{ paddingBottom: '8px' }}><a href={data.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: data.secondaryColor, textDecoration: 'none' }}>{data.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}</a></td>
                    </tr>
                  )}
                  {data.phoneNumber && (
                     <tr>
                      <td valign="middle" style={{ paddingRight: '10px', paddingBottom: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={currentTheme.mainText}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                      </td>
                      <td valign="middle" style={{ paddingBottom: '8px' }}><a href={`tel:${data.phoneNumber.replace(/\s/g, '')}`} style={{ color: data.secondaryColor, textDecoration: 'none' }}>{data.phoneNumber}</a></td>
                    </tr>
                  )}
                  {data.address && (
                     <tr>
                      <td valign="middle" style={{ paddingRight: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={currentTheme.mainText}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      </td>
                      <td valign="middle">{data.address}</td>
                    </tr>
                  )}
                  {(data.bookCallUrl || data.bookVisitUrl) && (
                    <tr>
                      <td colSpan={2} style={{ paddingTop: '16px' }}>
                        <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}><tbody><tr>
                          {data.bookCallUrl && (
                            <td style={{ paddingRight: '10px' }}>
                              <CtaButton href={data.bookCallUrl} label={data.bookCallLabel || t.bookCallButton} />
                            </td>
                          )}
                          {data.bookVisitUrl && (
                            <td>
                              <CtaButton href={data.bookVisitUrl} label={data.bookVisitLabel || t.bookVisitButton} />
                            </td>
                          )}
                        </tr></tbody></table>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          {data.disclaimer && (
            <tr>
                <td colSpan={2} style={{ paddingTop: '15px', paddingLeft: '24px', paddingRight: '24px', fontFamily: fontStack, fontSize: '11px', fontStyle: 'italic', color: currentTheme.secondaryText, textAlign: 'left' }}>
                    {data.disclaimer}
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModernTemplate;
