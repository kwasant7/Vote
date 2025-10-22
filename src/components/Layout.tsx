import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { Language } from '../types';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { language, setLanguage } = useApp();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/get-ready', label: t('nav.getReady') },
    { path: '/compare-candidates', label: t('nav.compareCandidates') },
    { path: '/policy-quiz', label: t('nav.policyQuiz') },
    { path: '/ballot', label: t('nav.ballot') },
    { path: '/how-to-vote', label: t('nav.howToVote') },
    { path: '/help', label: t('nav.help') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: t('languages.en') },
    { code: 'ko', label: t('languages.ko') },
    { code: 'zh', label: t('languages.zh') },
    { code: 'es', label: t('languages.es') },
    { code: 'vi', label: t('languages.vi') },
    { code: 'ru', label: t('languages.ru') },
    { code: 'tl', label: t('languages.tl') },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-primary-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              King County Voter Guide
            </Link>
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-primary-600 text-white px-3 py-2 rounded-md border border-primary-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 whitespace-nowrap transition-colors ${
                  location.pathname === item.path
                    ? 'border-b-4 border-primary-600 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-300">
                This voter guide is designed to help immigrants in King County
                understand the voting process and make informed decisions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Official Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="https://kingcounty.gov/en/dept/elections"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    King County Elections
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sos.wa.gov/elections/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WA Secretary of State
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                King County Elections<br />
                919 SW Grady Way<br />
                Renton, WA 98057<br />
                Phone: 206-296-VOTE (8683)
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 King County Voter Guide for Immigrants. For educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
