import { Candidate } from '../types';

export const candidates: Candidate[] = [
  // State Level - Legislative District 43
  {
    id: 'state-senator-1',
    name: 'Jamie Pedersen',
    party: 'Democrat',
    position: 'State Senator - District 43',
    level: 'state',
    bio: 'Incumbent State Senator with focus on education and civil rights.',
    website: 'https://example.com',
    policies: [
      {
        category: 'Education',
        position: 'Increase funding for public schools',
        details: 'Supports significant investment in K-12 education and teacher salaries.',
      },
      {
        category: 'Housing',
        position: 'Expand affordable housing',
        details: 'Advocates for policies to increase affordable housing stock.',
      },
      {
        category: 'Transportation',
        position: 'Support public transit expansion',
        details: 'Strong supporter of light rail and bus rapid transit.',
      },
    ],
  },
  {
    id: 'state-rep-43-1',
    name: 'Nicole Macri',
    party: 'Democrat',
    position: 'State Representative - District 43, Position 1',
    level: 'state',
    bio: 'Focuses on homelessness, housing affordability, and healthcare.',
    policies: [
      {
        category: 'Healthcare',
        position: 'Universal healthcare access',
        details: 'Supports expanding healthcare coverage for all Washington residents.',
      },
      {
        category: 'Housing',
        position: 'Address homelessness crisis',
        details: 'Advocates for comprehensive homelessness solutions and housing-first policies.',
      },
    ],
  },

  // County Level
  {
    id: 'county-exec-1',
    name: 'Dow Constantine',
    party: 'Democrat',
    position: 'King County Executive',
    level: 'county',
    bio: 'Current King County Executive focused on regional planning and services.',
    policies: [
      {
        category: 'Environment',
        position: 'Climate action and green energy',
        details: 'Leading county efforts to achieve carbon neutrality by 2030.',
      },
      {
        category: 'Public Safety',
        position: 'Criminal justice reform',
        details: 'Supports alternatives to incarceration and mental health services.',
      },
      {
        category: 'Transportation',
        position: 'Regional transit integration',
        details: 'Coordinating county services with Sound Transit and local agencies.',
      },
    ],
  },
  {
    id: 'county-council-8-1',
    name: 'Teresa Mosqueda',
    party: 'Democrat',
    position: 'King County Council - District 8',
    level: 'county',
    bio: 'Former Seattle City Councilmember, labor advocate.',
    policies: [
      {
        category: 'Workers Rights',
        position: 'Protect and expand worker protections',
        details: 'Champion of paid sick leave, minimum wage increases, and union rights.',
      },
      {
        category: 'Housing',
        position: 'Affordable housing investment',
        details: 'Supports increased county funding for affordable housing development.',
      },
    ],
  },

  // City Level - Seattle
  {
    id: 'seattle-mayor-1',
    name: 'Bruce Harrell',
    party: 'Non-partisan',
    position: 'Mayor of Seattle',
    level: 'city',
    bio: 'Current Seattle Mayor, former City Councilmember and attorney.',
    policies: [
      {
        category: 'Public Safety',
        position: 'Community-based public safety',
        details: 'Investing in police reform while maintaining public safety services.',
      },
      {
        category: 'Homelessness',
        position: 'Comprehensive approach to homelessness',
        details: 'Focusing on shelter, services, and compassionate enforcement.',
      },
      {
        category: 'Economic Development',
        position: 'Support small businesses',
        details: 'Programs to help local businesses recover and grow.',
      },
    ],
  },
  {
    id: 'seattle-council-3-1',
    name: 'Joy Hollingsworth',
    party: 'Non-partisan',
    position: 'Seattle City Council - District 3',
    level: 'city',
    bio: 'Small business owner focused on economic development.',
    policies: [
      {
        category: 'Small Business',
        position: 'Reduce barriers for businesses',
        details: 'Streamline permitting and reduce regulatory burden.',
      },
      {
        category: 'Public Safety',
        position: 'Balanced public safety approach',
        details: 'Support both police services and alternative response programs.',
      },
    ],
  },

  // Port of Seattle
  {
    id: 'port-commissioner-1',
    name: 'Toshiko Hasegawa',
    party: 'Non-partisan',
    position: 'Port of Seattle Commissioner - Position 1',
    level: 'port',
    bio: 'Environmental advocate with focus on sustainable port operations.',
    policies: [
      {
        category: 'Environment',
        position: 'Green port initiatives',
        details: 'Transitioning port operations to clean energy and reducing emissions.',
      },
      {
        category: 'Labor',
        position: 'Support port workers',
        details: 'Ensuring fair wages and safe working conditions.',
      },
    ],
  },

  // School District
  {
    id: 'seattle-school-board-1',
    name: 'Liza Rankin',
    party: 'Non-partisan',
    position: 'Seattle School Board - District 1',
    level: 'school',
    bio: 'Parent and education advocate.',
    policies: [
      {
        category: 'Education Funding',
        position: 'Increase school funding',
        details: 'Advocate for adequate state funding for schools.',
      },
      {
        category: 'Equity',
        position: 'Close opportunity gaps',
        details: 'Focus on equitable outcomes for all students.',
      },
      {
        category: 'Special Education',
        position: 'Expand special education services',
        details: 'Ensure proper support for students with disabilities.',
      },
    ],
  },

  // Special District
  {
    id: 'fire-district-1',
    name: 'Sarah Johnson',
    party: 'Non-partisan',
    position: 'Fire District Commissioner',
    level: 'special',
    bio: 'Retired firefighter with 25 years of service.',
    policies: [
      {
        category: 'Emergency Services',
        position: 'Modernize equipment',
        details: 'Invest in updated firefighting and medical response equipment.',
      },
      {
        category: 'Training',
        position: 'Enhanced training programs',
        details: 'Ensure firefighters have latest training in emergency response.',
      },
    ],
  },
];
