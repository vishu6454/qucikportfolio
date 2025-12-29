// src/pages/Contact.jsx
import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';
import {
  Mail, Phone, MapPin, MessageSquare, User,
  Send, CheckCircle, Globe, Clock, Users
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'support',
    company: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = [
    { id: 'support', name: 'Technical Support', icon: '🔧', response: '24 hours' },
    { id: 'sales', name: 'Sales & Pricing', icon: '💰', response: '2 hours' },
    { id: 'design', name: 'Design & Templates', icon: '🎨', response: '48 hours' },
    { id: 'billing', name: 'Billing & Accounts', icon: '💳', response: '24 hours' },
    { id: 'partnership', name: 'Partnerships', icon: '🤝', response: '72 hours' }
  ];

  /* -------------------- Helpers -------------------- */

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
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (formData.phone && !/^[\d\s+\-()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- Submit -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await contactAPI.sendMessage(formData);

      if (response?.data?.success) {
        toast.success('Message sent successfully!');
        setIsSubmitted(true);

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          department: 'support',
          company: '',
          phone: ''
        });

        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error(response?.data?.message || 'Failed to send message');
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-center mb-6">Get in Touch</h1>
      <p className="text-center text-slate-600 mb-16">
        Have questions? Our team is here to help you.
      </p>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Info */}
        <div className="space-y-6">
          <InfoCard icon={<Mail />} title="Email" text="support@quickportfolio.com" />
          <InfoCard icon={<Phone />} title="Phone" text="+1 (555) 123-4567" />
          <InfoCard icon={<MapPin />} title="Address" text="San Francisco, CA" />

          <div className="bg-blue-50 p-6 rounded-xl">
            <Stat icon={<Clock />} label="Avg Response" value="2 Hours" />
            <Stat icon={<Users />} label="Support" value="24/7" />
            <Stat icon={<CheckCircle />} label="Satisfaction" value="98%" />
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow">
          {isSubmitted ? (
            <SuccessUI onReset={() => setIsSubmitted(false)} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} icon={<User />} />
              <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} icon={<Mail />} />
              <Input label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
              <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} error={errors.message} />

              {errors.submit && (
                <div className="bg-red-50 text-red-700 p-3 rounded">{errors.submit}</div>
              )}

              <button
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-20 bg-blue-50 p-10 rounded-2xl text-center">
        <Globe className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold">QuickPortfolio HQ</h2>
        <p className="text-slate-600">Remote-first company, worldwide team 🌍</p>
      </div>
    </div>
  );
};

/* -------------------- Small Components -------------------- */

const InfoCard = ({ icon, title, text }) => (
  <div className="bg-white p-5 rounded-xl shadow flex gap-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-slate-600">{text}</p>
    </div>
  </div>
);

const Stat = ({ icon, label, value }) => (
  <div className="flex justify-between items-center mb-3">
    <span className="flex gap-2 items-center">{icon}{label}</span>
    <strong>{value}</strong>
  </div>
);

const Input = ({ label, icon, error, ...props }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-3 text-slate-400">{icon}</span>}
      <input {...props} className="w-full pl-10 p-3 border rounded-lg" />
    </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <textarea {...props} rows="5" className="w-full p-3 border rounded-lg" />
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

const SuccessUI = ({ onReset }) => (
  <div className="text-center py-12">
    <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
    <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
    <p className="text-slate-600 mb-6">We’ll contact you shortly.</p>
    <button onClick={onReset} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
      Send Another
    </button>
  </div>
);

export default Contact;
