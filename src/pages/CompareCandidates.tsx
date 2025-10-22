import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { candidates } from '../data/candidates';
import { CandidateLevel } from '../types';

const CompareCandidates: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<CandidateLevel>('state');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const levels: { value: CandidateLevel; label: string; description: string }[] = [
    {
      value: 'state',
      label: 'State (Legislative District)',
      description: 'State Senator and Representatives for your legislative district',
    },
    {
      value: 'county',
      label: 'County (King County)',
      description: 'King County Executive and Council',
    },
    {
      value: 'city',
      label: 'City (Municipal)',
      description: 'Mayor and City Council for your city',
    },
    {
      value: 'port',
      label: 'Port of Seattle',
      description: 'Port Commissioners (if in Port district)',
    },
    {
      value: 'school',
      label: 'School District',
      description: 'School Board for your district',
    },
    {
      value: 'special',
      label: 'Special Purpose Districts',
      description: 'Fire, water, and other special districts',
    },
  ];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => c.level === selectedLevel);
  }, [selectedLevel]);

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      } else if (prev.length < 3) {
        return [...prev, candidateId];
      }
      return prev;
    });
  };

  const candidatesToCompare = useMemo(() => {
    return candidates.filter((c) => selectedCandidates.includes(c.id));
  }, [selectedCandidates]);

  const allPolicyCategories = useMemo(() => {
    const categories = new Set<string>();
    candidatesToCompare.forEach((candidate) => {
      candidate.policies.forEach((policy) => {
        categories.add(policy.category);
      });
    });
    return Array.from(categories);
  }, [candidatesToCompare]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.compareCandidates')}</h1>
      <p className="text-gray-600 mb-8">
        Select a level to view candidates, then choose up to 3 candidates to compare side-by-side.
      </p>

      {!userAddress && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>Tip:</strong> Enter your address on the{' '}
            <a href="/" className="underline font-semibold">
              Home page
            </a>{' '}
            to see only the candidates relevant to your location.
          </p>
        </div>
      )}

      {/* Level Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Election Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() => {
                setSelectedLevel(level.value);
                setSelectedCandidates([]);
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel === level.value
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-bold text-lg text-gray-800 mb-1">{level.label}</h3>
              <p className="text-sm text-gray-600">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Select Candidates to Compare (up to 3)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedCandidates.includes(candidate.id)
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => toggleCandidateSelection(candidate.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800">{candidate.name}</h3>
                <div
                  className={`flex-shrink-0 w-6 h-6 border-2 rounded ${
                    selectedCandidates.includes(candidate.id)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedCandidates.includes(candidate.id) && (
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
              </div>
              <p className="text-sm text-primary-600 font-medium mb-2">{candidate.party}</p>
              <p className="text-sm text-gray-600 mb-2">{candidate.position}</p>
              <p className="text-sm text-gray-700">{candidate.bio}</p>
            </div>
          ))}
        </div>
        {filteredCandidates.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No candidates available for this level in the current election.
          </p>
        )}
      </div>

      {/* Comparison Table */}
      {candidatesToCompare.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Policy Comparison</h2>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 bg-gray-50 font-bold text-gray-700">
                    Policy Area
                  </th>
                  {candidatesToCompare.map((candidate) => (
                    <th
                      key={candidate.id}
                      className="p-4 bg-gray-50 text-left font-bold text-gray-700"
                    >
                      <div>{candidate.name}</div>
                      <div className="text-sm font-normal text-primary-600">
                        {candidate.party}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPolicyCategories.map((category) => (
                  <tr key={category} className="border-b border-gray-200">
                    <td className="p-4 font-semibold text-gray-700 bg-gray-50">
                      {category}
                    </td>
                    {candidatesToCompare.map((candidate) => {
                      const policy = candidate.policies.find((p) => p.category === category);
                      return (
                        <td key={candidate.id} className="p-4 align-top">
                          {policy ? (
                            <div>
                              <p className="font-medium text-gray-800 mb-1">
                                {policy.position}
                              </p>
                              <p className="text-sm text-gray-600">{policy.details}</p>
                            </div>
                          ) : (
                            <p className="text-gray-400 italic">No position stated</p>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700 bg-gray-50">Contact</td>
                  {candidatesToCompare.map((candidate) => (
                    <td key={candidate.id} className="p-4 align-top">
                      <div className="space-y-1 text-sm">
                        {candidate.website && (
                          <div>
                            <a
                              href={candidate.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                        {candidate.email && <div>{candidate.email}</div>}
                        {candidate.phone && <div>{candidate.phone}</div>}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-6">
            {candidatesToCompare.map((candidate) => (
              <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{candidate.party}</p>
                <div className="space-y-4">
                  {candidate.policies.map((policy, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-gray-700 mb-1">{policy.category}</h4>
                      <p className="font-medium text-gray-800 mb-1">{policy.position}</p>
                      <p className="text-sm text-gray-600">{policy.details}</p>
                    </div>
                  ))}
                  {candidate.website && (
                    <div className="pt-2">
                      <a
                        href={candidate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCandidates;
