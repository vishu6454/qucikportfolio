// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PortfolioForm from './pages/PortfolioForm';
import TemplateGallery from './pages/TemplateGallery';
import PortfolioPreview from './pages/PortfolioPreview';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomerSatisfaction from './pages/CustomerSatisfaction';
import FreeTrialPage from './pages/FreeTrialPage';
import DemoPage from './pages/DemoPage';

// Add PrivateRoute component
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('quickportfolio_user'));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create" element={<PortfolioForm />} />
              <Route path="/templates" element={<TemplateGallery />} />
              <Route path="/preview/:id" element={<PortfolioPreview />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/satisfaction" element={<CustomerSatisfaction />} />
              <Route path="/free-trial" element={<FreeTrialPage />} />
              <Route path="/demo" element={<DemoPage />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;