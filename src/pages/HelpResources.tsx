import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HelpResources: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Am I eligible to vote?',
      answer:
        'To vote in Washington State, you must be a U.S. citizen, at least 18 years old by Election Day, a resident of Washington State, and not disqualified from voting due to a court order. If you are a permanent resident (green card holder), you are not yet eligible to vote.',
    },
    {
      question: 'How do I register to vote?',
      answer:
        'You can register online at sos.wa.gov/elections/register.aspx, by mail using a voter registration form, or in person at King County Elections. You need your Washington State driver\'s license or ID number and the last 4 digits of your Social Security number.',
    },
    {
      question: 'When is the voter registration deadline?',
      answer:
        'You can register to vote or update your registration up to 8 days before Election Day. After that, you can still register in person at a voting center through Election Day.',
    },
    {
      question: 'What if I moved recently?',
      answer:
        'Update your voter registration with your new address as soon as possible. You can do this online, by mail, or in person. Your ballot will be mailed to your registered address.',
    },
    {
      question: 'I didn\'t receive my ballot. What should I do?',
      answer:
        'Contact King County Elections at 206-296-VOTE (8683) or visit any voting center to request a replacement ballot. You can also check your voter registration status online to ensure your address is correct.',
    },
    {
      question: 'Can I vote if I\'m a naturalized citizen?',
      answer:
        'Yes! Once you become a naturalized U.S. citizen, you have the right to vote. Make sure you are registered to vote in Washington State.',
    },
    {
      question: 'What languages are ballots available in?',
      answer:
        'King County provides ballots and voter materials in English, Spanish, Chinese, Vietnamese, and Korean. You can request materials in these languages when you register or by contacting King County Elections.',
    },
    {
      question: 'Can someone help me fill out my ballot?',
      answer:
        'Yes. You can get help from a family member, friend, or go to a voting center where staff and volunteers can assist you. At voting centers, accessible voting equipment is also available for voters with disabilities.',
    },
    {
      question: 'What if I make a mistake on my ballot?',
      answer:
        'If you make a mistake, don\'t try to erase or cross it out. Contact King County Elections for a replacement ballot, or visit a voting center to get a new one.',
    },
    {
      question: 'How do I know my vote was counted?',
      answer:
        'You can track your ballot online at sos.wa.gov/elections/myvote/. This system will show you when your ballot was mailed, received, and counted. If there\'s an issue with your ballot, King County Elections will contact you.',
    },
    {
      question: 'Are ballot drop boxes safe?',
      answer:
        'Yes. All King County ballot drop boxes are secured, monitored by video surveillance, and collected daily by election staff. They are a safe and reliable way to return your ballot.',
    },
    {
      question: 'What is a primary election vs. general election?',
      answer:
        'Primary elections (usually in August) narrow down the field of candidates. The top two vote-getters advance to the general election (in November), when the final winner is chosen. Washington uses a "top-two" primary system.',
    },
  ];

  const glossary = [
    {
      term: 'Absentee Ballot',
      definition:
        'In Washington State, all voters receive mail-in ballots, which function as absentee ballots. You don\'t need to request one.',
    },
    {
      term: 'Ballot Drop Box',
      definition:
        'A secure, monitored box where you can deposit your completed ballot instead of mailing it.',
    },
    {
      term: 'Ballot Measure',
      definition:
        'A proposal (initiative, referendum, levy, or bond) that voters can approve or reject.',
    },
    {
      term: 'Candidate',
      definition: 'A person running for an elected office.',
    },
    {
      term: 'Canvassing',
      definition:
        'The process of counting and verifying ballots after Election Day to certify results.',
    },
    {
      term: 'General Election',
      definition:
        'The final election where winners are chosen, typically held in November.',
    },
    {
      term: 'Initiative',
      definition:
        'A ballot measure proposed by citizens through a petition process.',
    },
    {
      term: 'Legislative District',
      definition:
        'A geographic area represented by state senators and representatives. Washington has 49 legislative districts.',
    },
    {
      term: 'Levy',
      definition:
        'A proposed tax increase that voters can approve or reject, often to fund schools or local services.',
    },
    {
      term: 'Non-partisan',
      definition:
        'An office or candidate without a party affiliation. Many local offices in Washington are non-partisan.',
    },
    {
      term: 'Polling Place',
      definition:
        'In other states, this is where you vote in person. Washington uses voting centers instead, which any voter can visit.',
    },
    {
      term: 'Primary Election',
      definition:
        'An election to narrow down candidates before the general election, usually held in August.',
    },
    {
      term: 'Proposition',
      definition: 'Another term for a ballot measure.',
    },
    {
      term: 'Referendum',
      definition:
        'A ballot measure that asks voters to approve or reject a law passed by the legislature.',
    },
    {
      term: 'Special Election',
      definition:
        'An election held outside the regular election schedule, often for a specific purpose or to fill a vacancy.',
    },
    {
      term: 'Top-Two Primary',
      definition:
        'Washington\'s primary system where the top two vote-getters advance to the general election, regardless of party.',
    },
    {
      term: 'Voter Registration',
      definition:
        'The process of officially signing up to vote. You must be registered to receive a ballot.',
    },
    {
      term: 'Voting Center',
      definition:
        'A location where you can drop off your ballot, register to vote, get help, or vote using accessible equipment.',
    },
  ];

  const officialResources = [
    {
      name: 'King County Elections',
      url: 'https://kingcounty.gov/en/dept/elections',
      description: 'Official King County election information and services',
    },
    {
      name: 'Washington Secretary of State - Elections',
      url: 'https://www.sos.wa.gov/elections/',
      description: 'Statewide election information and voter registration',
    },
    {
      name: 'MyVote - Track Your Ballot',
      url: 'https://www.sos.wa.gov/elections/myvote/',
      description: 'Check registration status and track your ballot',
    },
    {
      name: 'King County Voters\' Pamphlet',
      url: 'https://kingcounty.gov/en/dept/elections/how-to-vote/voters-pamphlet',
      description: 'Detailed information about candidates and measures',
    },
    {
      name: 'Ballot Drop Box Locations',
      url: 'https://kingcounty.gov/en/dept/elections/how-to-vote/ballot-drop-boxes',
      description: 'Find the nearest ballot drop box',
    },
    {
      name: 'Register to Vote Online',
      url: 'https://www.sos.wa.gov/elections/register.aspx',
      description: 'Register or update your voter registration',
    },
  ];

  const communityOrganizations = [
    {
      name: 'OneAmerica',
      description: 'Immigrant rights organization with voter engagement programs',
      phone: '206-587-4009',
      website: 'https://weareoneamerica.org',
    },
    {
      name: 'Asian Pacific Islander Coalition (APIC)',
      description: 'Civic engagement for Asian American and Pacific Islander communities',
      website: 'https://apicwa.org',
    },
    {
      name: 'Washington Coalition for Language Access',
      description: 'Ensuring language access in voting and civic participation',
      website: 'https://example.org',
    },
    {
      name: 'League of Women Voters of Seattle-King County',
      description: 'Nonpartisan voter education and advocacy',
      phone: '206-329-4848',
      website: 'https://lwvskc.org',
    },
    {
      name: 'King County Library System',
      description: 'Voter registration assistance and election information at libraries',
      website: 'https://kcls.org',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.help')}</h1>
      <p className="text-gray-600 mb-8">
        Find answers to common questions, learn voting terminology, and access helpful resources.
      </p>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Frequently Asked Questions (FAQ)
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Voting Glossary</h2>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Official Resources & Links</h2>
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
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-md p-6 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact King County Elections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p>
              King County Elections<br />
              919 SW Grady Way<br />
              Renton, WA 98057
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>
              Phone: 206-296-VOTE (8683)<br />
              TTY: 1-800-833-6388<br />
              Email: elections@kingcounty.gov
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white border-opacity-30">
          <h3 className="font-semibold mb-2">Hours</h3>
          <p>Monday - Friday: 8:30 AM - 4:30 PM</p>
          <p className="text-sm mt-2 opacity-90">
            Extended hours before and on Election Day
          </p>
        </div>
      </div>

      {/* Community Organizations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Community Organizations
        </h2>
        <p className="text-gray-600 mb-4">
          These organizations provide voter education, language assistance, and support for
          immigrant communities.
        </p>
        <div className="space-y-4">
          {communityOrganizations.map((org, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{org.name}</h3>
              <p className="text-gray-700 mb-2">{org.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {org.phone && (
                  <span className="text-gray-600">
                    <strong>Phone:</strong> {org.phone}
                  </span>
                )}
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    Visit Website →
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
