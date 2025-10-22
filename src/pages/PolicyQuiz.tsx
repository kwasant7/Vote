import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { quizQuestions } from '../data/quizQuestions';
import { candidates } from '../data/candidates';
import { CandidateLevel, QuizResult } from '../types';

const PolicyQuiz: React.FC = () => {
  const { t } = useTranslation();
  const { userAddress } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<CandidateLevel>('state');
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const levels: { value: CandidateLevel; label: string; priority: number }[] = [
    { value: 'state', label: 'State (Legislative District)', priority: 1 },
    { value: 'county', label: 'County (King County)', priority: 2 },
    { value: 'city', label: 'City (Municipal)', priority: 3 },
    { value: 'school', label: 'School District', priority: 4 },
    { value: 'port', label: 'Port of Seattle', priority: 5 },
    { value: 'special', label: 'Special Purpose Districts', priority: 6 },
  ];

  const levelQuestions = useMemo(() => {
    return quizQuestions.filter((q) => q.level === selectedLevel);
  }, [selectedLevel]);

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateResults = (): QuizResult[] => {
    const levelCandidates = candidates.filter((c) => c.level === selectedLevel);
    const results: QuizResult[] = [];

    levelCandidates.forEach((candidate) => {
      let totalScore = 0;
      let maxPossibleScore = 0;
      const matchedPolicies: string[] = [];

      levelQuestions.forEach((question) => {
        const userAnswer = answers[question.id];
        if (userAnswer) {
          const selectedOption = question.options.find((opt) => opt.id === userAnswer);
          if (selectedOption) {
            // Check if candidate has a policy in this category
            const candidatePolicy = candidate.policies.find(
              (p) => p.category === question.category
            );

            if (candidatePolicy) {
              // Simple scoring: if candidate has a strong position (5 weight aligned), add to score
              // This is simplified - in real app would need more sophisticated matching
              if (selectedOption.weight >= 3) {
                totalScore += selectedOption.weight;
                matchedPolicies.push(question.category);
              } else if (selectedOption.weight >= 1) {
                totalScore += selectedOption.weight * 0.5;
              }
            }
            maxPossibleScore += 5; // Max weight
          }
        }
      });

      const matchPercentage =
        maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

      results.push({
        candidateId: candidate.id,
        candidateName: candidate.name,
        matchPercentage,
        matchedPolicies,
      });
    });

    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const results = useMemo(() => {
    if (showResults) {
      return calculateResults();
    }
    return [];
  }, [showResults, answers, selectedLevel]);

  const allQuestionsAnswered = levelQuestions.every((q) => answers[q.id]);

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const handleChangeLevel = (level: CandidateLevel) => {
    setSelectedLevel(level);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('nav.policyQuiz')}</h1>
      <p className="text-gray-600 mb-8">
        Answer questions about your policy preferences to find candidates that match your views.
        Complete quizzes for each level to get a comprehensive picture.
      </p>

      {!userAddress && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>Tip:</strong> Enter your address on the{' '}
            <a href="/" className="underline font-semibold">
              Home page
            </a>{' '}
            to ensure you see quizzes for your specific districts.
          </p>
        </div>
      )}

      {/* Level Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Select Level (Priority Order)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() => handleChangeLevel(level.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel === level.value
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  {level.priority}
                </span>
                <span className="font-semibold text-gray-800">{level.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      {showResults && results.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Your Matches for {selectedLevel} Level</h2>
          <div className="space-y-4">
            {results.map((result, index) => {
              const candidate = candidates.find((c) => c.id === result.candidateId);
              return (
                <div
                  key={result.candidateId}
                  className="bg-white bg-opacity-20 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold">#{index + 1}</span>
                      <div>
                        <h3 className="text-xl font-bold">{result.candidateName}</h3>
                        {candidate && (
                          <p className="text-sm opacity-90">{candidate.party}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">{result.matchPercentage}%</div>
                      <p className="text-sm opacity-90">Match</p>
                    </div>
                  </div>
                  {result.matchedPolicies.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold mb-1">Aligned on:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedPolicies.map((policy) => (
                          <span
                            key={policy}
                            className="bg-white bg-opacity-30 px-2 py-1 rounded text-sm"
                          >
                            {policy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleReset}
              className="bg-white text-green-700 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
            >
              Retake Quiz
            </button>
            <a
              href="/compare-candidates"
              className="bg-white text-green-700 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold inline-block"
            >
              Compare These Candidates
            </a>
          </div>
        </div>
      )}

      {/* Quiz Questions */}
      {!showResults && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {levels.find((l) => l.value === selectedLevel)?.label} Quiz
                </h2>
                <span className="text-sm text-gray-600">
                  {Object.keys(answers).filter((k) =>
                    levelQuestions.find((q) => q.id === k)
                  ).length}{' '}
                  / {levelQuestions.length} answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      (Object.keys(answers).filter((k) =>
                        levelQuestions.find((q) => q.id === k)
                      ).length /
                        levelQuestions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-8">
              {levelQuestions.map((question, index) => (
                <div key={question.id} className="pb-6 border-b border-gray-200 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          answers[question.id] === option.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.id}
                          checked={answers[question.id] === option.id}
                          onChange={() => handleAnswerChange(question.id, option.id)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                allQuestionsAnswered
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allQuestionsAnswered
                ? 'See My Matches'
                : `Answer ${
                    levelQuestions.length -
                    Object.keys(answers).filter((k) =>
                      levelQuestions.find((q) => q.id === k)
                    ).length
                  } more ${
                    levelQuestions.length -
                      Object.keys(answers).filter((k) =>
                        levelQuestions.find((q) => q.id === k)
                      ).length ===
                    1
                      ? 'question'
                      : 'questions'
                  }`}
            </button>
          </div>
        </>
      )}

      {levelQuestions.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No quiz questions available for this level yet.</p>
        </div>
      )}
    </div>
  );
};

export default PolicyQuiz;
