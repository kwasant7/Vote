# King County Voter Guide for Immigrants

A comprehensive, multilingual voter guide designed specifically for immigrants in King County, Washington. This application helps new citizens understand the voting process and make informed decisions in local, state, and county elections.

## Features

### 🏠 Home Page
- Election selection dropdown (past, current, and future elections)
- Countdown to next election
- Address input (used throughout the site for personalization)
- Quick checklist for voter preparation
- 7-language support

### 📋 Get Ready to Vote
- **Step 1**: Check voter eligibility
- **Step 2**: Register to vote with official links
- **Step 3**: Find ballot drop boxes and voting centers based on your address

### 🤝 Compare Candidates
- Filter by level: State, County, City, Port, School District, Special Districts
- Side-by-side comparison of up to 3 candidates
- Policy positions organized by category
- Contact information for each candidate

### 🎯 Policy Match Quiz
- Take quizzes for each governmental level
- Get personalized candidate matches based on your policy preferences
- See match percentages and aligned policy areas
- Progress tracking for each quiz level

### 🗳️ Understanding Your Ballot
- Personalized sample ballot based on your address
- Detailed explanations of each race and measure
- How to read and mark your ballot
- PDF download option
- Visual guides (video tutorials and webtoons)

### 📮 How to Vote
- **Mail-in Ballot**: Complete step-by-step guide (Washington's primary method)
- **Early Voting**: Information about voting centers and drop boxes
- **Election Day**: Last-minute voting options and deadlines
- Ballot tracking information

### ❓ Help & Resources
- Comprehensive FAQ
- Voting terminology glossary
- Official government resources
- Community organization contacts
- King County Elections contact information

## Supported Languages

1. English
2. 한국어 (Korean)
3. 中文 (Chinese)
4. Español (Spanish)
5. Tiếng Việt (Vietnamese)
6. Русский (Russian)
7. Tagalog

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Internationalization**: i18next + react-i18next
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```
Vote/
├── src/
│   ├── components/       # Reusable components
│   │   └── Layout.tsx    # Main layout with navigation
│   ├── contexts/         # React Context providers
│   │   └── AppContext.tsx # Global state (address, election, language)
│   ├── data/             # Static data
│   │   ├── elections.ts  # Election information
│   │   ├── candidates.ts # Candidate data
│   │   └── quizQuestions.ts # Quiz questions
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── GetReadyToVote.tsx
│   │   ├── CompareCandidates.tsx
│   │   ├── PolicyQuiz.tsx
│   │   ├── UnderstandingBallot.tsx
│   │   ├── HowToVote.tsx
│   │   └── HelpResources.tsx
│   ├── types/            # TypeScript type definitions
│   ├── i18n.ts           # i18next configuration
│   ├── App.tsx           # Main app component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
└── package.json          # Dependencies
```

## Key Features Explained

### Address-Based Personalization
Once users enter their address on the home page, it's saved in the app context and used throughout the site to:
- Show relevant candidates for their legislative district
- Filter quiz questions by applicable levels
- Display personalized sample ballot
- Find nearby ballot drop boxes

### Multi-Level Government Structure
The app organizes candidates and information by governmental level:
1. **State** (highest priority): Legislative District representatives
2. **County**: King County Executive and Council
3. **City**: Municipal offices (Mayor, City Council)
4. **Port of Seattle**: Port commissioners (if applicable)
5. **School District**: School Board members
6. **Special Purpose Districts**: Fire, Water, etc.

### Quiz Scoring Algorithm
The policy quiz matches users with candidates by:
- Comparing user answers to candidate policy positions
- Weighting responses based on alignment strength
- Calculating match percentages for each candidate
- Displaying aligned policy categories

## Educational Purpose

This application is designed for educational purposes to help immigrant communities understand the voting process in King County, Washington. All candidate and election information should be verified with official sources:

- [King County Elections](https://kingcounty.gov/en/dept/elections)
- [Washington Secretary of State](https://www.sos.wa.gov/elections/)

## Contributing

This is an educational project. To improve it:
1. Add more candidate data
2. Expand language translations
3. Add more quiz questions
4. Improve accessibility features
5. Add API integration for real-time election data

## License

This project is for educational purposes. All election information should be verified with official sources.

## Acknowledgments

- King County Elections for voter information
- Washington State Secretary of State for election resources
- Community organizations supporting immigrant voters
