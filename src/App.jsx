import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Spinner from './components/Layout/Spinner';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import UpcomingEvents from './pages/Events/UpcomingEvents';
import CreateEvent from './pages/Events/CreateEvent';
import ManageEvents from './pages/Events/ManageEvents';
import JoinedEvents from './pages/Events/JoinedEvents';
import EventDetailsPage from './pages/Events/EventDetailsPage';
import NotFound from './pages/NotFound'; // Add this import

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events" element={<UpcomingEvents />} />
                <Route path="/events/:id" element={<EventDetailsPage />} />
                
                {/* Private Routes */}
                <Route 
                  path="/create-event" 
                  element={
                    <PrivateRoute>
                      <CreateEvent />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/manage-events" 
                  element={
                    <PrivateRoute>
                      <ManageEvents />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/joined-events" 
                  element={
                    <PrivateRoute>
                      <JoinedEvents />
                    </PrivateRoute>
                  } 
                />
                
                {/* 404 Route - Catch all undefined routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Toast Container */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;