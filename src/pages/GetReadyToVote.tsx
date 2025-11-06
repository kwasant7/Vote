import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';

const GetReadyToVote: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress } = useApp();
  const [eligibilityChecked, setEligibilityChecked] = useState<{ [key: number]: boolean }>(() => {
    // Load checked items from localStorage
    const saved = localStorage.getItem('eligibilityChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  const eligibilityItems = [
    t('getReady.eligibility1'),
    t('getReady.eligibility2'),
    t('getReady.eligibility3'),
  ];

  const handleEligibilityToggle = (index: number) => {
    const newCheckedItems = {
      ...eligibilityChecked,
      [index]: !eligibilityChecked[index],
    };
    setEligibilityChecked(newCheckedItems);
    // Save to localStorage
    localStorage.setItem('eligibilityChecklist', JSON.stringify(newCheckedItems));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('nav.getReady')}</h1>

      {/* Step 1: Check Eligibility */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            1
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('getReady.step1Title')}</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {t('getReady.step1Intro')}
              </p>
              <ul className="space-y-3 text-gray-800">
                {eligibilityItems.map((item, index) => (
                  <li key={index} className="flex items-start leading-relaxed">
                    <input
                      type="checkbox"
                      id={`eligibility-${index}`}
                      checked={eligibilityChecked[index] || false}
                      onChange={() => handleEligibilityToggle(index)}
                      className="w-5 h-5 mr-3 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`eligibility-${index}`}
                      className={`text-base cursor-pointer select-none ${
                        eligibilityChecked[index] ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-blue-800 font-medium">
                  <strong>{t('getReady.immigrantNote')}</strong> {t('getReady.immigrantNoteText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: You may not register if */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            2
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('getReady.step2Title')}</h2>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('getReady.restriction1')}</li>
                <li>{t('getReady.restriction2')}</li>
                <li>{t('getReady.restriction3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Future Voters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            3
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('getReady.step3Title')}</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {t('getReady.futureVotersText')}
              </p>
              <a
                href="https://www.sos.wa.gov/elections/future-voter-program.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('getReady.futureVotersButton')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Register to Vote */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            4
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('getReady.step4Title')}</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {t('getReady.registerIntro')}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                {t('getReady.onlineTitle')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('getReady.onlineText1')}
              </p>
              <p className="text-gray-700 mb-2">
                {t('getReady.onlineText2')}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                <li>{t('getReady.onlineReq1')}</li>
                <li>{t('getReady.onlineReq2')}</li>
                <li>{t('getReady.onlineReq3')}</li>
              </ul>
              <p className="text-gray-700 mb-4">
                {t('getReady.onlineText3')}
              </p>
              <a
                href="https://voter.votewa.gov/portal2023/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold mb-6"
              >
                {t('getReady.registerButton')}
              </a>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {t('getReady.byMailTitle')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('getReady.byMailText')}
              </p>
              <a
                href="https://www.sos.wa.gov/elections/voters/voter-registration/print-voter-registration-form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold mb-4"
              >
                {t('getReady.downloadFormButton')}
              </a>
              <p className="text-gray-700 mb-2">
                {t('getReady.mailTo')}
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-3">
                <p className="text-gray-800 font-medium">
                  King County Elections<br />
                  919 SW Grady Way, Suite 100<br />
                  Renton, WA 98057
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {t('getReady.inPersonTitle')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('getReady.inPersonText1')}
              </p>
              <p className="text-gray-700 mb-2">
                {t('getReady.inPersonText2')}
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-gray-800 font-medium">
                  919 SW Grady Way, Suite 100<br />
                  Renton, WA 98057
                </p>
              </div>
              <p className="text-gray-700 mb-3">
                {t('getReady.inPersonText3')}
              </p>
              <div className="flex flex-wrap gap-3 mb-3">
                <a
                  href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballots/return-my-ballot/vote-centers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
                >
                  {t('getReady.findVoteCenters')}
                </a>
                <a
                  href="https://kingcounty.gov/sitecore/service/notfound.aspx?item=web%3a%7b4BD66D90-9AA4-4B6D-8BAB-6F5A2E0781A6%7d%40en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
                >
                  {t('getReady.communityEvents')}
                </a>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {t('getReady.deadlinesTitle')}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('getReady.deadlineOnline')}</li>
                <li>{t('getReady.deadlineInPerson')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                {t('getReady.contactTitle')}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>{t('getReady.contactPhone')}</li>
                <li>{t('getReady.contactTTY')}</li>
                <li>{t('getReady.contactEmail')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Find Your Polling Place */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            5
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('getReady.step5Title')}
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                {t('getReady.step5Intro')}
              </p>

              {userAddress && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
                  <p className="text-green-800 font-medium mb-2">
                    {t('getReady.addressBased')} {userAddress.street}, {userAddress.city}
                  </p>
                  <p className="text-green-800">
                    {t('getReady.addressNote')}
                  </p>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">{t('getReady.dropBoxTitle')}</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>{t('getReady.dropBox1')}</li>
                <li>{t('getReady.dropBox2')}</li>
                <li>{t('getReady.dropBox3')}</li>
                <li>{t('getReady.dropBox4')}</li>
              </ul>
              <a
                href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballots/return-my-ballot/ballot-drop-boxes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold mb-6"
              >
                {t('getReady.findDropBoxes')}
              </a>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">{t('getReady.voteCentersTitle')}</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>{t('getReady.voteCenter1')}</li>
                <li>{t('getReady.voteCenter2')}</li>
                <li>{t('getReady.voteCenter3')}</li>
                <li>{t('getReady.voteCenter4')}</li>
              </ul>
              <a
                href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballots/return-my-ballot/vote-centers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                {t('getReady.findVoteCenters')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetReadyToVote;
