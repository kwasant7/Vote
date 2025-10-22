import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HowToVote: React.FC = () => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState<'mail' | 'early' | 'election-day'>('mail');

  const methods = [
    { id: 'mail' as const, label: 'Mail-in Ballot', icon: '✉️' },
    { id: 'early' as const, label: 'Early Voting', icon: '🗳️' },
    { id: 'election-day' as const, label: 'Election Day', icon: '📅' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.howToVote')}</h1>
      <p className="text-gray-600 mb-8">
        Washington State primarily uses mail-in voting. Learn about all your voting options.
      </p>

      {/* Important Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-800">
          <strong>Washington State is a Vote-by-Mail state.</strong> All registered voters
          automatically receive their ballot by mail. You don't need to request it!
        </p>
      </div>

      {/* Method Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Voting Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-2">{method.icon}</div>
              <h3 className="font-bold text-lg text-gray-800">{method.label}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Mail-in Ballot */}
      {selectedMethod === 'mail' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Mail-in Ballot (Recommended)
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Receive Your Ballot
                </h3>
                <p className="text-gray-700 mb-2">
                  Your ballot will be mailed to you at least 18 days before Election Day.
                  It arrives in a packet that includes:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Your official ballot</li>
                  <li>Voter pamphlet with candidate statements and measure explanations</li>
                  <li>Secrecy envelope (inner envelope)</li>
                  <li>Return envelope with postage-paid (outer envelope)</li>
                  <li>Instructions</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Mark Your Ballot
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Use a black or blue pen (no red ink or pencil)</li>
                  <li>Fill in the oval completely next to your choice</li>
                  <li>Read instructions carefully for each race and measure</li>
                  <li>You can skip races if you want</li>
                  <li>If you make a mistake, contact King County Elections for a replacement</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Sign the Return Envelope
                </h3>
                <p className="text-gray-700">
                  IMPORTANT: You must sign the return envelope for your ballot to count.
                  Your signature will be compared to your voter registration signature.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Return Your Ballot
                </h3>
                <p className="text-gray-700 mb-3">You have two options:</p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Option A: Ballot Drop Box (Recommended)
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-green-800">
                    <li>Available 24/7 starting 18 days before Election Day</li>
                    <li>No postage needed</li>
                    <li>Must be deposited by 8:00 PM on Election Day</li>
                    <li>Video monitored for security</li>
                    <li>
                      <a
                        href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballot-drop-boxes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold"
                      >
                        Find drop box locations
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Option B: U.S. Mail</h4>
                  <ul className="list-disc pl-6 space-y-1 text-blue-800">
                    <li>No stamp required (postage pre-paid)</li>
                    <li>Mail at least one week before Election Day to ensure delivery</li>
                    <li>Must be postmarked by Election Day</li>
                    <li>Drop in any U.S. Postal Service mailbox</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Track Your Ballot
                </h3>
                <p className="text-gray-700 mb-3">
                  You can track your ballot online to ensure it was received and counted.
                </p>
                <a
                  href="https://www.sos.wa.gov/elections/myvote/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
                >
                  Track My Ballot
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Early Voting */}
      {selectedMethod === 'early' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Early Voting</h2>

          <p className="text-gray-700 mb-6">
            In Washington State, early voting is done through ballot drop boxes and voting
            centers. Once ballots are mailed (18 days before Election Day), you can drop
            off your ballot or visit a voting center for assistance.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Voting Centers
              </h3>
              <p className="text-gray-700 mb-4">
                Voting centers are available starting several days before Election Day.
                At a voting center, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Drop off your completed ballot</li>
                <li>Register to vote or update your registration</li>
                <li>Get help marking your ballot (accessible voting equipment available)</li>
                <li>Request a replacement ballot if needed</li>
                <li>Get voting assistance in multiple languages</li>
              </ul>
              <a
                href="https://kingcounty.gov/en/dept/elections/how-to-vote/voting-centers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                Find Voting Centers
              </a>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">
                Accessible Voting
              </h4>
              <p className="text-purple-800">
                All voting centers have accessible voting equipment for voters with
                disabilities. This includes audio ballot readers, large print displays,
                and other assistive devices.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Election Day */}
      {selectedMethod === 'election-day' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Election Day Voting</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800 font-semibold">
              Important: In Washington State, you cannot vote in-person at a traditional
              polling place on Election Day. Instead, you must return your mail-in ballot
              by 8:00 PM on Election Day.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Last-Minute Voting on Election Day
              </h3>
              <p className="text-gray-700 mb-4">
                If you still have your ballot on Election Day, here's what to do:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  <strong>Drop Box:</strong> Deposit your ballot in any King County ballot
                  drop box by 8:00 PM sharp
                </li>
                <li>
                  <strong>Voting Center:</strong> Visit a voting center (open until 8:00 PM)
                  to drop off your ballot or get assistance
                </li>
                <li>
                  <strong>Do NOT mail:</strong> If it's Election Day, don't mail your
                  ballot—use a drop box instead
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Lost or Damaged Ballot?
              </h3>
              <p className="text-gray-700 mb-4">
                If you lost your ballot or it was damaged, you can get a replacement:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Visit any voting center in King County</li>
                <li>Bring ID if possible (not required but helpful)</li>
                <li>You'll receive a replacement ballot that you can mark on-site</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">
                8:00 PM Deadline
              </h4>
              <p className="text-red-800">
                All ballots must be deposited in drop boxes or received at voting centers
                by 8:00 PM on Election Day. Drop boxes close exactly at 8:00 PM—no exceptions.
                Plan to arrive early!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Common Questions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What if I never received my ballot?
            </h3>
            <p className="text-gray-700">
              Contact King County Elections at 206-296-VOTE (8683) or visit a voting center
              to request a replacement ballot.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Can someone else return my ballot for me?
            </h3>
            <p className="text-gray-700">
              Yes, a family member or household member can drop off your ballot. Make sure
              you have signed the return envelope.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What if my signature has changed?
            </h3>
            <p className="text-gray-700">
              If your signature doesn't match, King County Elections will contact you to
              verify your ballot. You can also update your signature on file anytime.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Is my ballot secret?
            </h3>
            <p className="text-gray-700">
              Yes! Your ballot is placed in a secrecy envelope before being put in the
              return envelope. Election workers separate the secrecy envelope from the
              signed return envelope before your ballot is counted, ensuring your vote
              is completely confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToVote;
