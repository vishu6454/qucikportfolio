// src/pages/Services.jsx
import React from 'react';
import { Check, X, Zap, Shield, Globe, Users } from 'lucide-react';

const Services = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        { included: true, text: '1 Portfolio' },
        { included: true, text: 'Basic Templates' },
        { included: true, text: 'Shareable Link' },
        { included: false, text: 'Custom Domain' },
        { included: false, text: 'Analytics' },
        { included: false, text: 'Priority Support' }
      ],
      linear: 'from-slate-100 to-slate-200'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and freelancers',
      features: [
        { included: true, text: '5 Portfolios' },
        { included: true, text: 'All Templates' },
        { included: true, text: 'Custom Domain' },
        { included: true, text: 'Basic Analytics' },
        { included: true, text: 'Email Support' },
        { included: false, text: 'Team Collaboration' }
      ],
      linear: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      name: 'Business',
      price: '$49',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        { included: true, text: 'Unlimited Portfolios' },
        { included: true, text: 'All Templates + Custom' },
        { included: true, text: 'Multiple Domains' },
        { included: true, text: 'Advanced Analytics' },
        { included: true, text: '24/7 Priority Support' },
        { included: true, text: 'Team Collaboration' }
      ],
      linear: 'from-purple-500 to-pink-500'
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Deployment",
      description: "Deploy your portfolio in seconds with our global CDN."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security First",
      description: "SSL encryption and DDoS protection included."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Built-in SEO optimization for better visibility."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Features",
      description: "Collaborate with team members and clients."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Plans for Every Stage of Your Career</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Whether you're just starting out or running an agency, we have the perfect plan for you.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl p-6 shadow-sm relative border-2 ${plan.popular ? 'border-blue-500 shadow-2xl' : 'border-transparent'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="px-4 py-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-slate-600">/{plan.period}</span>
              </div>
              <p className="text-slate-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mr-3" />
                  )}
                  <span className={feature.included ? 'text-slate-900' : 'text-slate-400'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'px-6 bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg' : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Compare All Features
          </h2>
          <p className="text-lg text-slate-600">
            See how our plans stack up against each other
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-6 font-bold text-slate-900">Feature</th>
                <th className="text-center py-4 px-6 font-bold text-slate-900">Free</th>
                <th className="text-center py-4 px-6 font-bold text-slate-900">Pro</th>
                <th className="text-center py-4 px-6 font-bold text-slate-900">Business</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900">Number of Portfolios</td>
                <td className="text-center py-4 px-6">1</td>
                <td className="text-center py-4 px-6">5</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">Unlimited</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900">Templates Access</td>
                <td className="text-center py-4 px-6">Basic</td>
                <td className="text-center py-4 px-6">All</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">All + Custom</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900">Custom Domain</td>
                <td className="text-center py-4 px-6">-</td>
                <td className="text-center py-4 px-6">1 Domain</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">Multiple Domains</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-4 px-6 font-medium text-slate-900">Analytics</td>
                <td className="text-center py-4 px-6">-</td>
                <td className="text-center py-4 px-6">Basic</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">Advanced</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-slate-900">Support</td>
                <td className="text-center py-4 px-6">Community</td>
                <td className="text-center py-4 px-6">Email</td>
                <td className="text-center py-4 px-6 font-bold text-blue-600">24/7 Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Services;