import React from 'react';

interface ThemeTogglerProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ theme, onToggle }) => {
  const isDarkMode = theme === 'dark';
  const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDarkMode}
      aria-label={label}
      className={`relative inline-flex items-center h-10 w-20 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'}`}
    >
      <span
        className={`inline-block h-8 w-8 rounded-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'translate-x-11' : 'translate-x-1'}`}
      >
        <span className="absolute inset-0 flex items-center justify-center">
            {/* Moon Icon - Visible in Dark Mode */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-slate-700 ${isDarkMode ? '' : 'hidden'}`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>

            {/* Sun Icon - Visible in Light Mode */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-slate-600 ${isDarkMode ? 'hidden' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggler;