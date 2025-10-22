import { Election } from '../types';

export const elections: Election[] = [
  {
    id: 'nov-2025',
    name: '2025 November General Election',
    date: '2025-11-04',
    type: 'future',
  },
  {
    id: 'aug-2025',
    name: '2025 August Primary',
    date: '2025-08-05',
    type: 'future',
  },
  {
    id: 'nov-2024',
    name: '2024 November General Election',
    date: '2024-11-05',
    type: 'past',
  },
  {
    id: 'aug-2024',
    name: '2024 August Primary',
    date: '2024-08-06',
    type: 'past',
  },
];
