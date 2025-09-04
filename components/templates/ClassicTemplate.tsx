
import React from 'react';
import { SignatureData, TranslationSet } from '../../types';

interface TemplateProps {
  data: SignatureData;
  t: TranslationSet['preview'];
  theme: 'light' | 'dark';
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data, t, theme }) => {
  const isDarkMode = theme === 'dark';

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const roleAndCompany = [data.role, data.company].filter(Boolean).join(' | ');
  const safePictureUrl = data.pictureUrl || `https://i.pravatar.cc/100?u=${fullName.replace(/\s/g, '')}`;

  const lightTheme = {
    bg: '#FFFFFF',
    mainText: '#1E293B',
    secondaryText: '#64748B',
    boldText: '#1E293B',
    disclaimer: '#777777',
  };

  const darkTheme = {
    bg: '#1E293B',
    mainText: '#CBD5E1',
    secondaryText: '#94A3B8',
    boldText: '#F1F5F9',
    disclaimer: '#64748B',
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  const fontStack = 'Arial, sans-serif';

  const CtaButton: React.FC<{ href: string; label: string }> = ({ href, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
        backgroundColor: data.primaryColor,
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '4px',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: fontStack,
        width: '100px',
        boxSizing: 'border-box'
    }}>
        {label}
    </a>
  );

  return (
    <div className="signature-container">
      <table cellPadding="0" cellSpacing="0" style={{
        borderCollapse: 'collapse',
        width: '100%',
        fontFamily: fontStack,
        fontSize: '14px',
        color: currentTheme.mainText,
      }}>
        <tbody>
          <tr>
            <td valign="top" style={{ paddingRight: '15px', width: '100px' }}>
                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100px' }}>
                    <tbody>
                        <tr><td style={{ paddingBottom: '10px' }}>
                            {fullName && (
                                <img
                                src={safePictureUrl}
                                alt={fullName}
                                width="100"
                                height="100"
                                style={{ display: 'block', borderRadius: '4px', width: '100px', objectFit: 'cover' }}
                                />
                            )}
                        </td></tr>
                        {(data.bookCallUrl || data.bookVisitUrl) && (
                            <tr><td>
                                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100px' }}><tbody>
                                    {data.bookCallUrl && (
                                        <tr><td style={{ paddingBottom: '5px' }}>
                                            <CtaButton href={data.bookCallUrl} label={data.bookCallLabel || t.bookCallButton} />
                                        </td></tr>
                                    )}
                                    {data.bookVisitUrl && (
                                        <tr><td>
                                            <CtaButton href={data.bookVisitUrl} label={data.bookVisitLabel || t.bookVisitButton} />
                                        </td></tr>
                                    )}
                                </tbody></table>
                            </td></tr>
                        )}
                    </tbody>
                </table>
            </td>
            <td valign="top" style={{ borderLeft: `3px solid ${data.primaryColor}`, paddingLeft: '15px' }}>
              <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {fullName && (
                    <tr><td style={{ paddingBottom: '2px', fontFamily: fontStack, fontSize: '16px', fontWeight: 'bold', color: currentTheme.boldText, lineHeight: '1.2' }}>{fullName}</td></tr>
                  )}
                  {roleAndCompany && (
                    <tr><td style={{ paddingBottom: '8px', fontFamily: fontStack, color: currentTheme.secondaryText, lineHeight: '1.4' }}>{roleAndCompany}</td></tr>
                  )}
                  {data.phoneNumber && (
                    <tr><td style={{ paddingBottom: '2px', fontFamily: fontStack, color: currentTheme.mainText, lineHeight: '1.4' }}>
                      <strong style={{ color: currentTheme.boldText, fontWeight: 'bold' }}>{t.phone}</strong>{' '}
                      <a href={`tel:${data.phoneNumber.replace(/\s/g, '')}`} style={{ color: data.secondaryColor, textDecoration: 'none' }}>{data.phoneNumber}</a>
                    </td></tr>
                  )}
                  {data.email && (
                    <tr><td style={{ paddingBottom: '2px', fontFamily: fontStack, color: currentTheme.mainText, lineHeight: '1.4' }}>
                      <strong style={{ color: currentTheme.boldText, fontWeight: 'bold' }}>{t.email}</strong>{' '}
                      <a href={`mailto:${data.email}`} style={{ color: data.secondaryColor, textDecoration: 'none' }}>{data.email}</a>
                    </td></tr>
                  )}
                  {data.address && (
                    <tr><td style={{ paddingBottom: '2px', fontFamily: fontStack, color: currentTheme.mainText, lineHeight: '1.4' }}>
                      <strong style={{ color: currentTheme.boldText, fontWeight: 'bold' }}>{t.address}</strong> {data.address}
                    </td></tr>
                  )}
                  {data.websiteUrl && (
                    <tr><td style={{ fontFamily: fontStack, color: currentTheme.mainText, lineHeight: '1.4' }}>
                      <strong style={{ color: currentTheme.boldText, fontWeight: 'bold' }}>{t.website}</strong>{' '}
                      <a href={data.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: data.secondaryColor, textDecoration: 'none' }}>
                        {data.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}
                      </a>
                    </td></tr>
                  )}
                  {(data.instagramUrl || data.facebookUrl || data.linkedinUrl || data.youtubeUrl) && (
                    <tr><td style={{ paddingTop: '10px' }}>
                      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                        <tbody><tr>
                          {data.linkedinUrl && (
                            <td style={{ paddingRight: '8px' }}><a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentTheme.mainText} style={{ display: 'block' }}>
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a></td>
                          )}
                          {data.instagramUrl && (
                            <td style={{ paddingRight: '8px' }}><a href={data.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentTheme.mainText} style={{ display: 'block' }}>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
                                </svg>
                            </a></td>
                          )}
                          {data.facebookUrl && (
                            <td style={{ paddingRight: '8px' }}><a href={data.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentTheme.mainText} style={{ display: 'block' }}>
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.038v-3.47h3.038v-2.661c0-3.004 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.956.925-1.956 1.874v2.267h3.317l-.53 3.47h-2.787v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                                </svg>
                            </a></td>
                          )}
                          {data.youtubeUrl && (
                            <td><a href={data.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentTheme.mainText} style={{ display: 'block' }}>
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a></td>
                          )}
                        </tr></tbody>
                      </table>
                    </td></tr>
                  )}
                  {data.disclaimer && (
                    <tr><td style={{ paddingTop: '15px', fontFamily: fontStack, fontSize: '12px', fontStyle: 'italic', color: currentTheme.disclaimer, lineHeight: '1.4' }}>
                      {data.disclaimer}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassicTemplate;
