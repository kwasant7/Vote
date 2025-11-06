import React from 'react';
import { useTranslation } from 'react-i18next';

const HowToVote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('returnBallot.title')}</h1>
      <p className="text-gray-600 mb-8">
        {t('returnBallot.subtitle')}
      </p>

      {/* Important Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-800">
          <strong>{t('returnBallot.threeWays')}</strong> {t('returnBallot.threeWaysDesc')}
        </p>
      </div>

      {/* By Mail */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
            1
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('returnBallot.byMail')}</h2>
            <p className="text-gray-700 mb-4">
              <strong>{t('returnBallot.byMailDesc')}</strong>
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Important:</strong> {t('returnBallot.byMailImportant')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ballot Drop Boxes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
            2
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('returnBallot.dropBoxes')}</h2>
            <p className="text-gray-700 mb-4">
              {t('returnBallot.dropBoxesDesc')}
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-800">
                <strong>Deadline:</strong> {t('returnBallot.dropBoxesDeadline')}
              </p>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>{t('returnBallot.dropBoxesList1')}</li>
              <li>{t('returnBallot.dropBoxesList2')}</li>
              <li>{t('returnBallot.dropBoxesList3')}</li>
            </ul>
            <a
              href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballots/return-my-ballot/ballot-drop-boxes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
            >
              {t('returnBallot.findDropBoxes')}
            </a>
          </div>
        </div>
      </div>

      {/* Vote Centers */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
            3
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('returnBallot.voteCenters')}</h2>
            <p className="text-gray-700 mb-4">
              {t('returnBallot.voteCentersDesc')}
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-800 mb-2">
                {t('returnBallot.servicesAvailable')}
              </h4>
              <ul className="list-disc pl-6 space-y-1 text-purple-800">
                <li>{t('returnBallot.service1')}</li>
                <li>{t('returnBallot.service2')}</li>
                <li>{t('returnBallot.service3')}</li>
                <li>{t('returnBallot.service4')}</li>
                <li>{t('returnBallot.service5')}</li>
              </ul>
            </div>
            <a
              href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballots/return-my-ballot/vote-centers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
            >
              {t('returnBallot.findVoteCenters')}
            </a>
          </div>
        </div>
      </div>

      {/* Student Engagement Hubs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
            📚
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('returnBallot.studentHubs')}</h2>
            <p className="text-gray-700 mb-4">
              {t('returnBallot.studentHubsDesc')}
            </p>
            <p className="text-gray-700">
              {t('returnBallot.studentHubsDesc2')}
            </p>
          </div>
        </div>
      </div>

      {/* Track Your Ballot */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('returnBallot.trackBallot')}</h2>
        <p className="text-gray-700 mb-4">
          {t('returnBallot.trackBallotDesc')}
        </p>
        <a
          href="https://www.sos.wa.gov/elections/myvote/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
        >
          {t('returnBallot.trackBallotButton')}
        </a>
      </div>
    </div>
  );
};

export default HowToVote;
