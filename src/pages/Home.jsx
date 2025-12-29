// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Shield, Globe, Users, TrendingUp,
  CheckCircle, ArrowRight, Star, Award, Rocket
} from 'lucide-react';

const Home = () => {
  const [counters, setCounters] = useState({
    users: 0,
    portfolios: 0,
    templates: 0,
    countries: 0
  });

  useEffect(() => {
    const targetCounters = {
      users: 15427,
      portfolios: 23489,
      templates: 24,
      countries: 89
    };

    const duration = 2000;
    const steps = 60;
    const increment = Object.keys(targetCounters).reduce((acc, key) => ({
      ...acc,
      [key]: targetCounters[key] / steps
    }), {});

    let currentCounters = { users: 0, portfolios: 0, templates: 0, countries: 0 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentCounters = Object.keys(currentCounters).reduce((acc, key) => ({
        ...acc,
        [key]: Math.min(Math.floor(step * increment[key]), targetCounters[key])
      }), {});

      setCounters(currentCounters);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "No Coding Required",
      description: "Build professional portfolios without writing a single line of code.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Create and deploy your portfolio in under 10 minutes.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Fully Responsive",
      description: "Looks perfect on all devices and screen sizes.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Collaborate with team members on portfolio projects.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Built-in Analytics",
      description: "Track visits and engagement with detailed analytics.",
      color: "from-teal-500 to-green-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior UX Designer",
      company: "TechCorp Inc.",
      content: "QuickPortfolio saved me weeks of development time. My portfolio looks amazing!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      content: "The template gallery is incredible. Found the perfect design for my personal brand.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director",
      company: "GrowthLab",
      content: "Our entire team uses QuickPortfolio for our professional portfolios.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-b from-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
          
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">No coding required • Build in minutes</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Build Your Professional
              <span className="block">Portfolio in Minutes</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Create stunning portfolio websites without coding. Choose from professional templates, 
              customize with our easy editor, and launch your career online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/create" className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Start Building Free</span>
              </Link>
              <Link to="/demo" className="px-6 py-3 rounded-xl font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                <span className="flex items-center space-x-2">
                  <span>Watch Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(counters).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {value.toLocaleString()}
                    {(key === 'users' || key === 'portfolios') && '+'}
                  </div>
                  <div className="text-slate-600 font-medium capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Everything You Need for Success</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Powerful features designed to help you create, customize, and launch your perfect portfolio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-xl bg-linear-to-r ${feature.color} flex items-center justify-center mb-6`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-linear-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Trusted by Professionals Worldwide</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who've transformed their careers with QuickPortfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of professionals who trust QuickPortfolio for their online presence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Schedule Demo
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;