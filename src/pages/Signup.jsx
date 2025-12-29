// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, User, Eye, EyeOff, Check,
  Github, Twitter, Chrome, ArrowRight, Shield,
  Sparkles, Rocket, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 characters required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase & numbers';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      
      const result = await register(userData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/create');
      } else {
        setErrors({ submit: result.message });
      }
    } catch {
      setErrors({ submit: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    console.log(`Signing up with ${provider}`);
    
    const user = {
      email: `${provider}@example.com`,
      name: `${provider} User`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      joined: new Date().toISOString(),
      plan: 'free',
      portfolios: []
    };
    
    localStorage.setItem('quickportfolio_user', JSON.stringify(user));
    localStorage.setItem(`portfolios_${user.email}`, JSON.stringify([]));
    navigate('/create');
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, text: '', color: 'bg-slate-200' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const strength = {
      0: { text: 'Very Weak', color: 'bg-red-400', textColor: 'text-red-400' },
      1: { text: 'Weak', color: 'bg-orange-400', textColor: 'text-orange-400' },
      2: { text: 'Fair', color: 'bg-yellow-400', textColor: 'text-yellow-400' },
      3: { text: 'Good', color: 'bg-green-400', textColor: 'text-green-400' },
      4: { text: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' },
      5: { text: 'Very Strong', color: 'bg-green-600', textColor: 'text-green-600' }
    };
    
    return { score, ...strength[score] };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Hero Section */}
        <div className="lg:w-1/2 max-w-lg">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-linear-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200 group-hover:shadow-xl group-hover:shadow-violet-300 transition-all duration-300">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                  QuickPortfolio
                </h1>
                <p className="text-slate-600 text-sm mt-1">Build stunning portfolios in minutes</p>
              </div>
            </Link>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 leading-tight">
                Start Building Your 
                <span className="relative">
                  <span className="relative z-10"> Digital Presence</span>
                  <Sparkles className="absolute -top-6 -right-6 h-8 w-8 text-amber-400 animate-pulse" />
                </span>
              </h2>
              <p className="text-xl text-slate-600 mt-4">
                Join thousands of professionals showcasing their work with our beautiful templates
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-linear-to-br from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">Lightning Fast</h3>
                <p className="text-slate-600 text-sm mt-2">Create portfolios in under 5 minutes</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900">Secure & Private</h3>
                <p className="text-slate-600 text-sm mt-2">Enterprise-grade data protection</p>
              </div>
            </div>

            <div className="bg-linear-to-r from-violet-50 to-indigo-50 rounded-2xl p-6 border border-violet-100">
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <Check className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What you get with free account:</h3>
                  <ul className="space-y-2">
                    {['1 professional portfolio', '5+ designer templates', 'Custom domain', 'Analytics dashboard', '14-day Pro trial'].map((item, index) => (
                      <li key={index} className="flex items-center text-slate-700">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-3"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:w-1/2 max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Create Your Account</h2>
              <p className="text-slate-600 mt-2">Start your journey in seconds</p>
            </div>

            {/* Social Signup */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { provider: 'github', icon: Github, color: 'hover:bg-slate-900 hover:text-white' },
                  { provider: 'twitter', icon: Twitter, color: 'hover:bg-sky-500 hover:text-white' },
                  { provider: 'google', icon: Chrome, color: 'hover:bg-red-500 hover:text-white' }
                ].map((item) => (
                  <button
                    key={item.provider}
                    onClick={() => handleSocialSignup(item.provider)}
                    className={`flex items-center justify-center p-3 border border-slate-300 rounded-xl text-slate-700 transition-all duration-300 ${item.color}`}
                  >
                    {React.createElement(item.icon, { className: 'h-5 w-5' })}
                  </button>
                ))}
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with email</span>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                    activeField === 'name' ? 'border-violet-500 ring-2 ring-violet-100' : 'border-slate-200'
                  }`}>
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField('')}
                      className="w-full px-12 py-3.5 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.name}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                    activeField === 'email' ? 'border-violet-500 ring-2 ring-violet-100' : 'border-slate-200'
                  }`}>
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField('')}
                      className="w-full px-12 py-3.5 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                    activeField === 'password' ? 'border-violet-500 ring-2 ring-violet-100' : 'border-slate-200'
                  }`}>
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setActiveField('password')}
                      onBlur={() => setActiveField('')}
                      className="w-full px-12 py-3.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 pr-12"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>}
                  
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Password strength:</span>
                        <span className={`text-sm font-medium ${strength.textColor}`}>
                          {strength.text}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div
                            key={index}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                              index <= strength.score ? strength.color : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                    activeField === 'confirmPassword' ? 'border-violet-500 ring-2 ring-violet-100' : 'border-slate-200'
                  }`}>
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setActiveField('confirmPassword')}
                      onBlur={() => setActiveField('')}
                      className="w-full px-12 py-3.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.confirmPassword}
                  </p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                    />
                  </div>
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-slate-700">
                    I agree to the{' '}
                    <Link to="/terms" className="font-medium text-violet-600 hover:text-violet-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-medium text-violet-600 hover:text-violet-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {errors.agreeToTerms}
                  </p>
                )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                    />
                  </div>
                  <label htmlFor="newsletter" className="ml-3 text-sm text-slate-700">
                    Receive product updates, tips, and exclusive offers
                  </label>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {errors.submit}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-violet-600 hover:text-violet-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;