// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Linkedin, Github,
  Mail, Phone, MapPin, Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-slate-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <div className="text-lg font-bold">QP</div>
              </div>
              <span className="text-2xl font-bold text-white">
                QuickPortfolio
              </span>
            </Link>
            <p className="text-slate-300 leading-relaxed">
              Build professional portfolios in minutes. No coding required. 
              Perfect for developers, designers, and professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-slate-300 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <ul className="space-y-3">
              <li className="text-slate-300">No-Code Builder</li>
              <li className="text-slate-300">Responsive Templates</li>
              <li className="text-slate-300">Custom Domain</li>
              <li className="text-slate-300">Analytics Dashboard</li>
              <li className="text-slate-300">SEO Optimization</li>
              <li className="text-slate-300">Export Options</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-slate-300">support@quickportfolio.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-slate-300">
                  123 Tech Street<br />
                  San Francisco, CA 94107
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400">
              © {new Date().getFullYear()} QuickPortfolio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-slate-400 hover:text-white transition-colors text-sm">
                Cookies
              </Link>
            </div>
            <p className="text-slate-400 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by QuickPortfolio Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;