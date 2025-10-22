import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';

const GetReadyToVote: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress } = useApp();
  const [registrationChecked, setRegistrationChecked] = useState(false);

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Eligibility</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                To vote in Washington State, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Be a U.S. citizen</li>
                <li>Be at least 18 years old by Election Day</li>
                <li>Be a resident of Washington State</li>
                <li>Not be disqualified from voting due to a court order</li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-blue-800 font-medium">
                  <strong>Note for Immigrants:</strong> You must be a naturalized U.S. citizen
                  to vote. If you are a permanent resident (green card holder), you are not
                  yet eligible to vote in federal, state, or local elections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Register to Vote */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            2
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register to Vote</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                You can register to vote online, by mail, or in person.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                Online Registration
              </h3>
              <p className="text-gray-700 mb-3">
                The fastest way to register is online through the Washington Secretary of State website.
              </p>
              <a
                href="https://www.sos.wa.gov/elections/register.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                Register Online Now
              </a>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                Registration Deadline
              </h3>
              <p className="text-gray-700">
                You can register to vote or update your registration up to 8 days before Election Day.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                What You'll Need
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your Washington State driver's license or ID card number</li>
                <li>The last 4 digits of your Social Security number</li>
                <li>Your current address</li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => setRegistrationChecked(!registrationChecked)}
                  className="flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                >
                  <div
                    className={`w-6 h-6 border-2 rounded mr-2 flex items-center justify-center ${
                      registrationChecked
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {registrationChecked && (
                      <svg
                        className="w-4 h-4 text-white"
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
                  Check My Registration Status
                </button>
                {registrationChecked && (
                  <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">
                      Visit{' '}
                      <a
                        href="https://www.sos.wa.gov/elections/myvote/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold"
                      >
                        MyVote
                      </a>{' '}
                      to check your registration status, view your ballot, and track your ballot.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Find Your Polling Place */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
            3
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Find Your Ballot Drop Box & Voting Center
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Washington State uses mail-in voting. You'll receive your ballot by mail, but
                you can drop it off at any ballot drop box or voting center in King County.
              </p>

              {userAddress ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
                  <p className="text-green-800 font-medium mb-2">
                    Based on your address: {userAddress.street}, {userAddress.city}
                  </p>
                  <p className="text-green-800">
                    You can use any ballot drop box in King County. The nearest locations will
                    be shown on the King County Elections website.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
                  <p className="text-yellow-800">
                    Please enter your address on the{' '}
                    <a href="/" className="underline font-semibold">
                      Home page
                    </a>{' '}
                    to see personalized voting locations.
                  </p>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                Ballot Drop Boxes
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Available 24/7 starting 18 days before Election Day</li>
                <li>Collected daily by election staff</li>
                <li>No postage required</li>
                <li>Monitored by video surveillance</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                Voting Centers
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Get help with your ballot</li>
                <li>Register to vote in person</li>
                <li>Request a replacement ballot</li>
                <li>Vote in person with assistance</li>
              </ul>

              <a
                href="https://kingcounty.gov/en/dept/elections/how-to-vote/ballot-drop-boxes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-semibold"
              >
                Find Drop Boxes & Voting Centers
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Important Dates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-20 rounded-md p-4">
            <p className="font-semibold text-lg">Voter Registration Deadline</p>
            <p className="text-sm">8 days before Election Day</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-md p-4">
            <p className="font-semibold text-lg">Ballots Mailed</p>
            <p className="text-sm">At least 18 days before Election Day</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-md p-4">
            <p className="font-semibold text-lg">Online Ballot Marking</p>
            <p className="text-sm">Available when ballots are mailed</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-md p-4">
            <p className="font-semibold text-lg">Return Deadline</p>
            <p className="text-sm">8:00 PM on Election Day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetReadyToVote;
