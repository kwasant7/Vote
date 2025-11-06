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
    { path: '/ballot', label: t('nav.ballot') },
    { path: '/how-to-vote', label: t('nav.returnBallot') },
    { path: '/help', label: t('nav.help') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: t('languages.en') },
    { code: 'ko', label: t('languages.ko') },
    { code: 'es', label: t('languages.es') },
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
      <nav className="bg-gradient-to-r from-gray-50 to-gray-100 shadow-md sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center overflow-x-auto gap-2 scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all font-medium text-sm ${
                  location.pathname === item.path
                    ? 'bg-primary-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md hover:scale-105 border border-gray-200'
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
              <p className="text-gray-300 text-sm mt-3">
                This is an educational project created for the Congressional App Challenge.
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
          <div className="mt-8 pt-8 border-t border-gray-700 space-y-3">
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-2">
                <strong>Data Sources:</strong> Candidate information provided by King County Elections.
                District mapping data from King County GIS Services.
              </p>
              <p className="mb-2">
                <strong>Disclaimer:</strong> This application provides educational information only and does not
                endorse any candidate or political position. All candidate information is presented as provided
                by official sources. Users should verify information with official election resources.
              </p>
              <p>&copy; 2025 King County Voter Guide for Immigrants. For educational purposes.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
