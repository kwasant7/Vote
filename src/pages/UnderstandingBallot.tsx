import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { candidates } from '../data/candidates';

const UnderstandingBallot: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress, selectedElection } = useApp();

  const ballotItemsByLevel = [
    {
      level: t('ballot.stateLevel'),
      description: t('ballot.stateLevelDesc'),
      items: candidates.filter((c) => c.level === 'state'),
    },
    {
      level: t('ballot.countyLevel'),
      description: t('ballot.countyLevelDesc'),
      items: candidates.filter((c) => c.level === 'county'),
    },
    {
      level: t('ballot.cityLevel'),
      description: t('ballot.cityLevelDesc'),
      items: candidates.filter((c) => c.level === 'city'),
    },
    {
      level: t('ballot.portLevel'),
      description: t('ballot.portLevelDesc'),
      items: candidates.filter((c) => c.level === 'port'),
    },
    {
      level: t('ballot.schoolLevel'),
      description: t('ballot.schoolLevelDesc'),
      items: candidates.filter((c) => c.level === 'school'),
    },
    {
      level: t('ballot.specialLevel'),
      description: t('ballot.specialLevelDesc'),
      items: candidates.filter((c) => c.level === 'special'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.ballot')}</h1>
      <p className="text-gray-600 mb-8">
        {t('ballot.subtitle')}
      </p>

      {!userAddress && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>{t('ballot.enterAddressPrompt')}</strong>{' '}
            <a href="/" className="underline font-semibold">
              {t('ballot.enterAddressLink')}
            </a>
          </p>
        </div>
      )}

      {userAddress && (
        <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
          <p className="text-primary-800">
            <strong>{t('ballot.yourAddress')}:</strong> {userAddress.street}, {userAddress.city},{' '}
            {userAddress.state} {userAddress.zipCode}
          </p>
          {userAddress.legislativeDistrict && (
            <p className="text-primary-800 mt-1">
              <strong>{t('ballot.legislativeDistrict')}:</strong> {userAddress.legislativeDistrict}
            </p>
          )}
        </div>
      )}

      {selectedElection && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedElection.name}
          </h2>
          <p className="text-gray-600">{t('ballot.electionDate')}: {selectedElection.date}</p>
        </div>
      )}

      {/* Sample Ballot */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('ballot.sampleBallot')}</h2>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
            {t('ballot.downloadPdf')}
          </button>
        </div>

        <div className="space-y-8">
          {ballotItemsByLevel.map((section) => (
            <div key={section.level}>
              <div className="bg-gray-100 px-4 py-3 rounded-t-lg border-b-2 border-primary-600">
                <h3 className="text-xl font-bold text-gray-800">{section.level}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
              <div className="border-2 border-gray-200 border-t-0 rounded-b-lg p-4">
                {section.items.length > 0 ? (
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <h4 className="font-bold text-gray-800 mb-1">
                              {item.position}
                            </h4>
                            <p className="text-lg text-primary-700 font-semibold">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">{item.party}</p>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{item.bio}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    {t('ballot.noItems')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Read Your Ballot */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('ballot.howToReadTitle')}</h2>
        <div className="prose max-w-none">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('ballot.step1Title')}
                </h3>
                <p className="text-gray-700">
                  {t('ballot.step1Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('ballot.step2Title')}
                </h3>
                <p className="text-gray-700">
                  {t('ballot.step2Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('ballot.step3Title')}
                </h3>
                <p className="text-gray-700">
                  {t('ballot.step3Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {t('ballot.step4Title')}
                </h3>
                <p className="text-gray-700">
                  {t('ballot.step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video/Webtoon Guide */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">{t('ballot.visualGuidesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">{t('ballot.videoTitle')}</h3>
            <p className="text-sm mb-3">
              {t('ballot.videoDesc')}
            </p>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              {t('ballot.watchVideo')}
            </button>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">{t('ballot.webtoonTitle')}</h3>
            <p className="text-sm mb-3">
              {t('ballot.webtoonDesc')}
            </p>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              {t('ballot.viewWebtoon')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingBallot;
