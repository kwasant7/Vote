import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { elections } from '../data/elections';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { selectedElection, setSelectedElection, userAddress, setUserAddress } = useApp();
  const [daysUntilElection, setDaysUntilElection] = useState<number>(0);
  const [addressForm, setAddressForm] = useState({
    street: userAddress?.street || '',
    city: userAddress?.city || 'Seattle',
    zipCode: userAddress?.zipCode || '',
  });

  const nextElection = elections.find((e) => e.type === 'future') || elections[0];

  useEffect(() => {
    if (!selectedElection && nextElection) {
      setSelectedElection(nextElection);
    }
  }, [selectedElection, nextElection, setSelectedElection]);

  useEffect(() => {
    if (selectedElection) {
      const electionDate = new Date(selectedElection.date);
      const today = new Date();
      const diffTime = electionDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilElection(diffDays);
    }
  }, [selectedElection]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setUserAddress({
      ...addressForm,
      state: 'WA',
      // In a real app, these would be looked up via API
      legislativeDistrict: '43',
      schoolDistrict: 'Seattle Public Schools',
      countyCouncilDistrict: '8',
    });
  };

  const checklistItems = [
    {
      id: 'registration',
      text: t('home.checkRegistration'),
      link: '/get-ready',
      completed: false,
    },
    {
      id: 'polling',
      text: t('home.findPollingPlace'),
      link: '/get-ready',
      completed: !!userAddress,
    },
    {
      id: 'candidates',
      text: t('home.reviewCandidates'),
      link: '/compare-candidates',
      completed: false,
    },
    {
      id: 'quiz',
      text: t('home.takePolicyQuiz'),
      link: '/policy-quiz',
      completed: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-xl p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
        <p className="text-xl opacity-90">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Election Selector */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-lg font-semibold mb-3 text-gray-700">
              {t('home.selectElection')}
            </label>
            <select
              value={selectedElection?.id || ''}
              onChange={(e) => {
                const election = elections.find((el) => el.id === e.target.value);
                if (election) setSelectedElection(election);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {elections.map((election) => (
                <option key={election.id} value={election.id}>
                  {election.name} - {election.date}
                </option>
              ))}
            </select>
          </div>

          {/* Countdown */}
          {selectedElection && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">{t('home.nextElection')}</h2>
              <div className="text-6xl font-bold my-4">{daysUntilElection}</div>
              <p className="text-xl">
                {t('home.daysUntil')} {selectedElection.name}
              </p>
              <p className="text-lg mt-2 opacity-90">{selectedElection.date}</p>
            </div>
          )}

          {/* Address Input */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {t('home.enterAddress')}
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your address once to personalize your voter information throughout the site.
            </p>
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('home.street')}
                </label>
                <input
                  type="text"
                  value={addressForm.street}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, street: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('home.city')}
                  </label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Seattle"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('home.zipCode')}
                  </label>
                  <input
                    type="text"
                    value={addressForm.zipCode}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, zipCode: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="98101"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('home.saveAddress')}
              </button>
            </form>
            {userAddress && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 font-medium">
                  Address saved: {userAddress.street}, {userAddress.city},{' '}
                  {userAddress.state} {userAddress.zipCode}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Checklist */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {t('home.checklist')}
            </h2>
            <ul className="space-y-3">
              {checklistItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 mr-3 mt-0.5 ${
                        item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 group-hover:border-primary-500'
                      }`}
                    >
                      {item.completed && (
                        <svg
                          className="w-full h-full text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-700 group-hover:text-primary-600">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          to="/compare-candidates"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2">
            {t('nav.compareCandidates')}
          </h3>
          <p className="text-gray-600">
            Compare candidates side-by-side at state, county, and local levels.
          </p>
        </Link>
        <Link
          to="/policy-quiz"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2">
            {t('nav.policyQuiz')}
          </h3>
          <p className="text-gray-600">
            Take our quiz to find candidates that match your policy preferences.
          </p>
        </Link>
        <Link
          to="/how-to-vote"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-bold text-primary-700 mb-2">
            {t('nav.howToVote')}
          </h3>
          <p className="text-gray-600">
            Learn about mail-in voting, early voting, and election day procedures.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
