import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HelpResources: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: t('help.faq1Question'),
      answer: t('help.faq1Answer'),
    },
    {
      question: t('help.faq2Question'),
      answer: t('help.faq2Answer'),
    },
    {
      question: t('help.faq3Question'),
      answer: t('help.faq3Answer'),
    },
    {
      question: t('help.faq4Question'),
      answer: t('help.faq4Answer'),
    },
    {
      question: t('help.faq5Question'),
      answer: t('help.faq5Answer'),
    },
    {
      question: t('help.faq6Question'),
      answer: t('help.faq6Answer'),
    },
    {
      question: t('help.faq7Question'),
      answer: t('help.faq7Answer'),
    },
    {
      question: t('help.faq8Question'),
      answer: t('help.faq8Answer'),
    },
    {
      question: t('help.faq9Question'),
      answer: t('help.faq9Answer'),
    },
    {
      question: t('help.faq10Question'),
      answer: t('help.faq10Answer'),
    },
    {
      question: t('help.faq11Question'),
      answer: t('help.faq11Answer'),
    },
    {
      question: t('help.faq12Question'),
      answer: t('help.faq12Answer'),
    },
  ];

  const glossary = [
    {
      term: t('help.glossary1Term'),
      definition: t('help.glossary1Def'),
    },
    {
      term: t('help.glossary2Term'),
      definition: t('help.glossary2Def'),
    },
    {
      term: t('help.glossary3Term'),
      definition: t('help.glossary3Def'),
    },
    {
      term: t('help.glossary4Term'),
      definition: t('help.glossary4Def'),
    },
    {
      term: t('help.glossary5Term'),
      definition: t('help.glossary5Def'),
    },
    {
      term: t('help.glossary6Term'),
      definition: t('help.glossary6Def'),
    },
    {
      term: t('help.glossary7Term'),
      definition: t('help.glossary7Def'),
    },
    {
      term: t('help.glossary8Term'),
      definition: t('help.glossary8Def'),
    },
    {
      term: t('help.glossary9Term'),
      definition: t('help.glossary9Def'),
    },
    {
      term: t('help.glossary10Term'),
      definition: t('help.glossary10Def'),
    },
    {
      term: t('help.glossary11Term'),
      definition: t('help.glossary11Def'),
    },
    {
      term: t('help.glossary12Term'),
      definition: t('help.glossary12Def'),
    },
    {
      term: t('help.glossary13Term'),
      definition: t('help.glossary13Def'),
    },
    {
      term: t('help.glossary14Term'),
      definition: t('help.glossary14Def'),
    },
    {
      term: t('help.glossary15Term'),
      definition: t('help.glossary15Def'),
    },
    {
      term: t('help.glossary16Term'),
      definition: t('help.glossary16Def'),
    },
    {
      term: t('help.glossary17Term'),
      definition: t('help.glossary17Def'),
    },
    {
      term: t('help.glossary18Term'),
      definition: t('help.glossary18Def'),
    },
  ];

  const officialResources = [
    {
      name: t('help.resource1Name'),
      url: 'https://kingcounty.gov/en/dept/elections',
      description: t('help.resource1Desc'),
    },
    {
      name: t('help.resource2Name'),
      url: 'https://www.sos.wa.gov/elections/',
      description: t('help.resource2Desc'),
    },
    {
      name: t('help.resource3Name'),
      url: 'https://www.sos.wa.gov/elections/myvote/',
      description: t('help.resource3Desc'),
    },
    {
      name: t('help.resource4Name'),
      url: 'https://kingcounty.gov/en/dept/elections/how-to-vote/voters-pamphlet',
      description: t('help.resource4Desc'),
    },
    {
      name: t('help.resource5Name'),
      url: 'https://kingcounty.gov/en/dept/elections/how-to-vote/ballot-drop-boxes',
      description: t('help.resource5Desc'),
    },
    {
      name: t('help.resource6Name'),
      url: 'https://www.sos.wa.gov/elections/register.aspx',
      description: t('help.resource6Desc'),
    },
  ];

  const communityOrganizations = [
    {
      name: 'OneAmerica',
      description: t('help.org1Desc'),
      phone: '206-587-4009',
      website: 'https://weareoneamerica.org',
    },
    {
      name: 'Asian Pacific Islander Coalition (APIC)',
      description: t('help.org2Desc'),
      website: 'https://apicwa.org',
    },
    {
      name: 'Washington Coalition for Language Access',
      description: t('help.org3Desc'),
      website: 'https://example.org',
    },
    {
      name: 'League of Women Voters of Seattle-King County',
      description: t('help.org4Desc'),
      phone: '206-329-4848',
      website: 'https://lwvskc.org',
    },
    {
      name: 'King County Library System',
      description: t('help.org5Desc'),
      website: 'https://kcls.org',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.help')}</h1>
      <p className="text-gray-600 mb-8">
        {t('help.subtitle')}
      </p>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t('help.faqTitle')}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFaq === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openFaq === index && (
                <div className="p-4 pt-0 text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Voting Glossary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('help.glossaryTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {glossary.map((item, index) => (
            <div key={index} className="border-l-4 border-primary-600 pl-4 py-2">
              <h3 className="font-bold text-gray-800 mb-1">{item.term}</h3>
              <p className="text-sm text-gray-700">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Resources */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('help.officialResourcesTitle')}</h2>
        <div className="space-y-4">
          {officialResources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-primary-700 mb-2">{resource.name}</h3>
              <p className="text-gray-700 mb-3">{resource.description}</p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-semibold"
              >
                {t('help.visitWebsite')}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-md p-6 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">{t('help.contactTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">{t('help.addressLabel')}</h3>
            <p>
              King County Elections<br />
              919 SW Grady Way<br />
              Renton, WA 98057
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t('help.contactLabel')}</h3>
            <p>
              {t('help.phone')}: 206-296-VOTE (8683)<br />
              TTY: 1-800-833-6388<br />
              Email: elections@kingcounty.gov
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white border-opacity-30">
          <h3 className="font-semibold mb-2">{t('help.hoursLabel')}</h3>
          <p>{t('help.hoursText')}</p>
          <p className="text-sm mt-2 opacity-90">
            {t('help.extendedHours')}
          </p>
        </div>
      </div>

      {/* Community Organizations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t('help.communityOrgsTitle')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('help.communityOrgsDesc')}
        </p>
        <div className="space-y-4">
          {communityOrganizations.map((org, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{org.name}</h3>
              <p className="text-gray-700 mb-2">{org.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {org.phone && (
                  <span className="text-gray-600">
                    <strong>{t('help.phone')}:</strong> {org.phone}
                  </span>
                )}
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    {t('help.visitWebsite')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpResources;
