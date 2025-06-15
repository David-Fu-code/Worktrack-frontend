import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page components
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmEmail from './pages/ConfirmEmail';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';

// Auth route protection
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      {/* App layout wrapper */}
      <div className="min-h-screen bg-gray-100">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ConfirmEmail />} />

          {/* Home Page (placeholder) */}
          <Route path="/" element={<Home />} />

          {/* Protected Route (requires authentication) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route 
            path='/profile'
            element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
