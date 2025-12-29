// src/pages/DemoPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Video, Users, CheckCircle, 
  Award, Zap, Shield, ArrowRight, Mail,
  Phone, Globe, User
} from 'lucide-react';

const DemoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    date: '',
    time: '',
    attendees: 1,
    agenda: 'general',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const agendaOptions = [
    { id: 'general', name: 'General Platform Tour', duration: '30 min' },
    { id: 'advanced', name: 'Advanced Features Deep Dive', duration: '45 min' },
    { id: 'team', name: 'Team & Collaboration Features', duration: '45 min' },
    { id: 'enterprise', name: 'Enterprise Solutions', duration: '60 min' },
    { id: 'custom', name: 'Custom Development Demo', duration: '60 min' }
  ];

  const demoBenefits = [
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Live Platform Tour',
      description: 'See QuickPortfolio in action with a live demo'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Guidance',
      description: 'Get insights from our product specialists'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Q&A Session',
      description: 'Ask specific questions about your use case'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Best Practices',
      description: 'Learn industry best practices for portfolios'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
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
      
      // In a real app, this would send to your calendar/CRM
      console.log('Demo scheduled:', formData);
      
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          date: '',
          time: '',
          attendees: 1,
          agenda: 'general',
          additionalInfo: ''
        });
      }, 5000);
    } catch {
      setErrors({ submit: 'Failed to schedule demo. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate dates for the next 2 weeks
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = generateDates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full mb-6">
          <Video className="h-4 w-4" />
          <span className="text-sm font-medium">Personalized 1-on-1 Demo</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Schedule a Personalized Demo</h1>
        
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          See QuickPortfolio in action. Get a personalized tour of our platform 
          and learn how it can transform your portfolio creation process.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column - Demo Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Demo Scheduled Successfully!</h2>
                <p className="text-slate-600 mb-6">
                  Thank you for scheduling a demo. We've sent a confirmation email 
                  with calendar invite and meeting details.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="font-medium text-blue-900 mb-1">Meeting Details</div>
                    <div className="text-blue-700">
                      {formData.date} at {formData.time}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Schedule Another Demo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Demo</h2>
                  <p className="text-slate-600">
                    Fill out the form below and choose a convenient time for your personalized demo.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@company.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Company
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your company"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Your Role
                        </label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select your role</option>
                          <option value="designer">Designer</option>
                          <option value="developer">Developer</option>
                          <option value="manager">Manager</option>
                          <option value="executive">Executive</option>
                          <option value="student">Student</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Demo Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Demo Details</h3>
                    
                    {/* Date Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Preferred Date *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {availableDates.map((date, index) => {
                          const dateString = date.toISOString().split('T')[0];
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          const dayNumber = date.getDate();
                          const month = date.toLocaleDateString('en-US', { month: 'short' });
                          
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, date: dateString }))}
                              className={`p-3 rounded-xl border-2 text-center transition-all ${formData.date === dateString ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                            >
                              <div className="text-xs text-slate-500 mb-1">{dayName}</div>
                              <div className="text-lg font-bold text-slate-900">{dayNumber}</div>
                              <div className="text-xs text-slate-500">{month}</div>
                            </button>
                          );
                        })}
                      </div>
                      {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                    </div>
                    
                    {/* Time Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Preferred Time (EST) *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {timeSlots.map((time, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, time }))}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${formData.time === time ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                          >
                            <div className="flex items-center justify-center space-x-2">
                              <Clock className="h-4 w-4 text-slate-400" />
                              <span className="font-medium">{time}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                    </div>
                    
                    {/* Agenda Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Demo Agenda *
                      </label>
                      <div className="space-y-3">
                        {agendaOptions.map((agenda) => (
                          <button
                            key={agenda.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, agenda: agenda.id }))}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${formData.agenda === agenda.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-slate-900">{agenda.name}</div>
                                <div className="text-sm text-slate-500">Duration: {agenda.duration}</div>
                              </div>
                              {formData.agenda === agenda.id && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any specific questions or topics you'd like to cover?"
                      />
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
                    className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>{isSubmitting ? 'Scheduling...' : 'Schedule Demo'}</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-linear-to-r from-slate-50 to-slate-100 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-4">Need Immediate Assistance?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Call Us</div>
                  <div className="text-slate-600">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Email Us</div>
                  <div className="text-slate-600">demo@quickportfolio.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Benefits & Info */}
        <div className="space-y-8">
          {/* Benefits */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">What to Expect</h2>
            <div className="space-y-6">
              {demoBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-100 to-cyan-100 flex items-center justify-center shrink-0">
                    <div className="text-blue-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">{benefit.title}</div>
                    <div className="text-sm text-slate-600">{benefit.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Host */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="Demo Host"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-slate-900 mb-1">Alex Johnson</h3>
              <div className="text-blue-600 font-medium mb-3">Senior Product Specialist</div>
              <p className="text-slate-600 text-sm">
                Alex has helped 500+ teams optimize their portfolio strategy and will be your demo host.
              </p>
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-sm bg-linear-to-br from-blue-50 to-cyan-50">
            <h3 className="font-bold text-slate-900 mb-4">How to Prepare</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">Have your goals ready</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">Prepare any questions</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">Test your audio/video</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">Join from a quiet space</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm bg-linear-to-r from-purple-50 to-pink-50">
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-3">Can't Wait?</h3>
              <p className="text-slate-600 text-sm mb-4">
                Start exploring QuickPortfolio now with our free trial.
              </p>
              <button
                onClick={() => navigate('/free-trial')}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;