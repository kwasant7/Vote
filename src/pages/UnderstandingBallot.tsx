import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { candidates } from '../data/candidates';

const UnderstandingBallot: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress, selectedElection } = useApp();

  const ballotItemsByLevel = [
    {
      level: 'State',
      description: 'Legislative District offices',
      items: candidates.filter((c) => c.level === 'state'),
    },
    {
      level: 'County',
      description: 'King County offices',
      items: candidates.filter((c) => c.level === 'county'),
    },
    {
      level: 'City',
      description: 'Municipal offices',
      items: candidates.filter((c) => c.level === 'city'),
    },
    {
      level: 'Port',
      description: 'Port of Seattle',
      items: candidates.filter((c) => c.level === 'port'),
    },
    {
      level: 'School District',
      description: 'School Board',
      items: candidates.filter((c) => c.level === 'school'),
    },
    {
      level: 'Special Districts',
      description: 'Fire, Water, and other districts',
      items: candidates.filter((c) => c.level === 'special'),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.ballot')}</h1>
      <p className="text-gray-600 mb-8">
        Your personalized sample ballot based on your address and selected election.
      </p>

      {!userAddress && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>Please enter your address</strong> on the{' '}
            <a href="/" className="underline font-semibold">
              Home page
            </a>{' '}
            to see your personalized ballot.
          </p>
        </div>
      )}

      {userAddress && (
        <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
          <p className="text-primary-800">
            <strong>Your Address:</strong> {userAddress.street}, {userAddress.city},{' '}
            {userAddress.state} {userAddress.zipCode}
          </p>
          {userAddress.legislativeDistrict && (
            <p className="text-primary-800 mt-1">
              <strong>Legislative District:</strong> {userAddress.legislativeDistrict}
            </p>
          )}
        </div>
      )}

      {selectedElection && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedElection.name}
          </h2>
          <p className="text-gray-600">Election Date: {selectedElection.date}</p>
        </div>
      )}

      {/* Sample Ballot */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Sample Ballot</h2>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
            Download PDF
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
                    No items in this category for your ballot.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Read Your Ballot */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Read Your Ballot</h2>
        <div className="prose max-w-none">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Ballot Structure
                </h3>
                <p className="text-gray-700">
                  Your ballot is organized from highest to lowest level: State, County, City,
                  and local districts. Each section contains races and measures relevant to
                  your address.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Candidate Information
                </h3>
                <p className="text-gray-700">
                  Each candidate listing includes their name, party (if applicable), and a
                  brief statement. You can research candidates further using this guide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Marking Your Ballot
                </h3>
                <p className="text-gray-700">
                  Use a black or blue pen to fill in the oval next to your choice. Do not use
                  red ink, pencil, or make any other marks on the ballot.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Ballot Measures
                </h3>
                <p className="text-gray-700">
                  In addition to candidates, your ballot may include measures (propositions,
                  levies, bonds). Read each carefully and vote YES or NO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video/Webtoon Guide */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Visual Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Video Tutorial</h3>
            <p className="text-sm mb-3">
              Watch a step-by-step video guide on how to complete your ballot.
            </p>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              Watch Video
            </button>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Webtoon Guide</h3>
            <p className="text-sm mb-3">
              Read an illustrated guide explaining the voting process in multiple languages.
            </p>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
              View Webtoon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderstandingBallot;
