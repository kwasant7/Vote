import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import GetReadyToVote from './pages/GetReadyToVote';
import CompareCandidates from './pages/CompareCandidates';
import PolicyQuiz from './pages/PolicyQuiz';
import UnderstandingBallot from './pages/UnderstandingBallot';
import HowToVote from './pages/HowToVote';
import HelpResources from './pages/HelpResources';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-ready" element={<GetReadyToVote />} />
            <Route path="/compare-candidates" element={<CompareCandidates />} />
            <Route path="/policy-quiz" element={<PolicyQuiz />} />
            <Route path="/ballot" element={<UnderstandingBallot />} />
            <Route path="/how-to-vote" element={<HowToVote />} />
            <Route path="/help" element={<HelpResources />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
