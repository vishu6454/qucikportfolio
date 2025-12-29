// src/pages/FreeTrialPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, Check, Clock, Shield, Globe, Users,
  BarChart, Star, Award, Rocket, ArrowRight
} from 'lucide-react';

const FreeTrialPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const trialFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'All Pro Features',
      description: 'Access every Pro feature during your trial'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Custom Domain',
      description: 'Connect your own domain name'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Track portfolio performance'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Collaborate with team members'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Priority Support',
      description: '24/7 priority email support'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'All Templates',
      description: 'Access to all premium templates'
    }
  ];

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
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create trial account
      const user = {
        email: formData.email,
        name: formData.name,
        company: formData.company,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        joined: new Date().toISOString(),
        plan: 'pro-trial',
        trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        portfolios: []
      };
      
      localStorage.setItem('quickportfolio_user', JSON.stringify(user));
      localStorage.setItem(`portfolios_${formData.email}`, JSON.stringify([]));
      
      // Navigate to templates page
      navigate('/templates');
    } catch  {
      setErrors({ submit: 'Failed to start trial. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-100 to-cyan-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <Rocket className="h-4 w-4" />
            <span className="text-sm font-medium">14-Day Free Trial • No Credit Card Required</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Start Your 14-Day
            <span className="block">Pro Trial Today</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Experience all Pro features for 14 days. No credit card required. 
            Build unlimited portfolios with premium templates and features.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-500" />
              <span className="font-medium text-slate-900">Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium text-slate-900">No credit card</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="font-medium text-slate-900">Full access</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Trial Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full mb-4">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">PRO TRIAL</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Start Your Free Trial</h2>
                <p className="text-slate-600">
                  Get instant access to all Pro features
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Create Password *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-slate-700">
                      I agree to the{' '}
                      <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>. I understand that after 14 days, I'll be asked to upgrade to continue using Pro features.
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-lg disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Starting Trial...' : 'Start 14-Day Free Trial'}</span>
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>

                <p className="text-center text-sm text-slate-500">
                  By signing up, you agree to our 14-day free trial. No credit card required.
                </p>
              </form>
            </div>

            {/* Security Badge */}
            <div className="mt-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-800">100% Secure</div>
                  <div className="text-sm text-green-700">
                    Your data is encrypted and protected. We never share your information.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features & Benefits */}
          <div>
            {/* Features Grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Everything included in your Pro Trial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trialFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-r from-blue-50 to-cyan-50 flex items-center justify-center shrink-0">
                        <div className="text-blue-600">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                        <p className="text-slate-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trial Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">How the Trial Works</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Sign Up Instantly</div>
                    <div className="text-slate-600">Create your account in seconds. No credit card required.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Full Pro Access</div>
                    <div className="text-slate-600">Immediately get access to all Pro features and templates.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Build & Explore</div>
                    <div className="text-slate-600">Create portfolios, try features, and see the value.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Choose Your Plan</div>
                    <div className="text-slate-600">Upgrade to continue Pro features, or stay on Free.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-1">What happens after 14 days?</h4>
                <p className="text-sm text-slate-600">
                  You can choose to upgrade to Pro, or continue with our Free plan. All your work is saved.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-1">Can I cancel anytime?</h4>
                <p className="text-sm text-slate-600">
                  Yes! Cancel anytime during or after the trial. No questions asked.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-1">Do I need a credit card?</h4>
                <p className="text-sm text-slate-600">
                  No credit card is required to start your free trial. We'll only ask if you decide to upgrade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Amazing Portfolios?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who use QuickPortfolio Pro to showcase their work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('name')?.focus()}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105"
              >
                Start Free Trial
              </button>
              <Link
                to="/demo"
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialPage;