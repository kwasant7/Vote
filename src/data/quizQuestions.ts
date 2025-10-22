import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // State Level Questions
  {
    id: 'state-edu-1',
    level: 'state',
    category: 'Education',
    question: 'How should the state fund public education?',
    options: [
      {
        id: 'a',
        text: 'Significantly increase funding through progressive taxation',
        weight: 5,
      },
      { id: 'b', text: 'Moderately increase funding', weight: 3 },
      { id: 'c', text: 'Maintain current funding levels', weight: 1 },
      { id: 'd', text: 'Reduce funding and increase local control', weight: -1 },
    ],
  },
  {
    id: 'state-housing-1',
    level: 'state',
    category: 'Housing',
    question: 'What should be the state\'s approach to housing affordability?',
    options: [
      {
        id: 'a',
        text: 'Heavy investment in subsidized affordable housing',
        weight: 5,
      },
      { id: 'b', text: 'Incentivize private developers to build affordable units', weight: 3 },
      { id: 'c', text: 'Reduce zoning restrictions to increase supply', weight: 2 },
      { id: 'd', text: 'Let the market determine housing prices', weight: -1 },
    ],
  },
  {
    id: 'state-transit-1',
    level: 'state',
    category: 'Transportation',
    question: 'What transportation investments should the state prioritize?',
    options: [
      { id: 'a', text: 'Expand public transit (light rail, buses)', weight: 5 },
      { id: 'b', text: 'Balance transit and road improvements', weight: 3 },
      { id: 'c', text: 'Focus on road maintenance and expansion', weight: 1 },
      { id: 'd', text: 'Minimize state transportation spending', weight: -1 },
    ],
  },

  // County Level Questions
  {
    id: 'county-env-1',
    level: 'county',
    category: 'Environment',
    question: 'How aggressively should King County pursue climate action?',
    options: [
      {
        id: 'a',
        text: 'Aggressive action with mandatory emissions reductions',
        weight: 5,
      },
      { id: 'b', text: 'Strong but voluntary programs', weight: 3 },
      { id: 'c', text: 'Moderate incentive-based programs', weight: 1 },
      { id: 'd', text: 'Minimal county involvement', weight: -1 },
    ],
  },
  {
    id: 'county-safety-1',
    level: 'county',
    category: 'Public Safety',
    question: 'What should be King County\'s approach to criminal justice?',
    options: [
      {
        id: 'a',
        text: 'Focus on rehabilitation and alternatives to jail',
        weight: 5,
      },
      { id: 'b', text: 'Balance rehabilitation with enforcement', weight: 3 },
      { id: 'c', text: 'Prioritize enforcement and incarceration', weight: 1 },
      { id: 'd', text: 'Strict enforcement with longer sentences', weight: -1 },
    ],
  },

  // City Level Questions
  {
    id: 'city-homeless-1',
    level: 'city',
    category: 'Homelessness',
    question: 'How should the city address homelessness?',
    options: [
      {
        id: 'a',
        text: 'Housing-first approach with comprehensive services',
        weight: 5,
      },
      { id: 'b', text: 'Balance shelter, services, and enforcement', weight: 3 },
      { id: 'c', text: 'Prioritize clearing encampments', weight: 1 },
      { id: 'd', text: 'Strict enforcement of camping bans', weight: -1 },
    ],
  },
  {
    id: 'city-business-1',
    level: 'city',
    category: 'Small Business',
    question: 'What policies should the city adopt for small businesses?',
    options: [
      {
        id: 'a',
        text: 'Reduce fees and streamline permitting',
        weight: 5,
      },
      { id: 'b', text: 'Balance support with regulation', weight: 3 },
      { id: 'c', text: 'Maintain current regulations', weight: 1 },
      { id: 'd', text: 'Increase regulation for public benefit', weight: -1 },
    ],
  },

  // School District Questions
  {
    id: 'school-funding-1',
    level: 'school',
    category: 'Education Funding',
    question: 'How should the school district address funding shortfalls?',
    options: [
      { id: 'a', text: 'Pass levies to increase local funding', weight: 5 },
      { id: 'b', text: 'Advocate for more state funding', weight: 3 },
      { id: 'c', text: 'Make budget cuts while maintaining quality', weight: 1 },
      { id: 'd', text: 'Significant cuts to reduce tax burden', weight: -1 },
    ],
  },
  {
    id: 'school-equity-1',
    level: 'school',
    category: 'Equity',
    question: 'What should be the priority for closing achievement gaps?',
    options: [
      {
        id: 'a',
        text: 'Invest heavily in underserved schools and students',
        weight: 5,
      },
      { id: 'b', text: 'Balanced approach across all schools', weight: 3 },
      { id: 'c', text: 'Focus on overall system improvement', weight: 1 },
      { id: 'd', text: 'Let schools compete for resources', weight: -1 },
    ],
  },

  // Port Questions
  {
    id: 'port-env-1',
    level: 'port',
    category: 'Environment',
    question: 'How should the Port of Seattle balance environment and commerce?',
    options: [
      {
        id: 'a',
        text: 'Prioritize environmental sustainability even if costly',
        weight: 5,
      },
      { id: 'b', text: 'Balance environmental and economic goals', weight: 3 },
      { id: 'c', text: 'Prioritize economic efficiency', weight: 1 },
      { id: 'd', text: 'Minimize environmental regulations', weight: -1 },
    ],
  },

  // Special District Questions
  {
    id: 'special-services-1',
    level: 'special',
    category: 'Emergency Services',
    question: 'How should fire districts fund emergency services?',
    options: [
      {
        id: 'a',
        text: 'Increase levies to expand services and equipment',
        weight: 5,
      },
      { id: 'b', text: 'Maintain current service levels', weight: 3 },
      { id: 'c', text: 'Find efficiencies without service cuts', weight: 1 },
      { id: 'd', text: 'Reduce costs even if it means fewer services', weight: -1 },
    ],
  },
];
