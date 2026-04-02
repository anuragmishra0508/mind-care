import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

import Navigation from './components/Navigation';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import ComingSoon from './pages/ComingSoon';
import Recommendations from './pages/Recommendations';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-wellness-background flex flex-col">
      {user && <Navigation />}
      <div className={`flex-grow ${user ? 'pt-24 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8' : ''}`}>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/track" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
          <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ComingSoon title="Profile Area" /></PrivateRoute>} />
          <Route path="/chatbot" element={<PrivateRoute><ComingSoon title="AI Chatbot Assistant" /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><ComingSoon title="Advanced Analytics" /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
