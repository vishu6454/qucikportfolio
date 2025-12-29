// src/pages/About.jsx
import React from 'react';
import { Target, Users, Award, Clock, Heart, Rocket } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Vishnu Kanoujiya',
      role: 'CEO & Founder',
      bio: 'Former Google product manager with 10+ years in tech.',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Abhay Singh',
      role: 'Design Director',
      bio: 'Award-winning designer with expertise in UX/UI.',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Felix',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Sudip Kumar',
      role: 'Lead Developer',
      bio: 'Full-stack developer passionate about open source.',
      avatar: 'https://api.dicebear.com/9.x/avataaars/svg',
      social: { twitter: '#', linkedin: '#' }
    },
    {
      name: 'Chandan Upadhyay',
      role: 'Growth Marketer',
      bio: 'Specializes in SaaS marketing and user acquisition.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      social: { twitter: '#', linkedin: '#' }
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'User-First',
      description: 'We prioritize user experience above all else.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Inclusive',
      description: 'Building tools accessible to everyone.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passionate',
      description: 'We love what we do and it shows in our work.'
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: 'Innovative',
      description: 'Constantly pushing boundaries in portfolio tech.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'QuickPortfolio was founded with a vision to democratize portfolio creation.'
    },
    {
      year: '2021',
      title: 'First 1,000 Users',
      description: 'Reached our first major milestone with 1,000 active users.'
    },
    {
      year: '2022',
      title: 'Series A Funding',
      description: 'Raised $5M to expand our team and platform capabilities.'
    },
    {
      year: '2023',
      title: 'Global Launch',
      description: 'Expanded to serve users in 50+ countries worldwide.'
    },
    {
      year: '2024',
      title: '25K Users',
      description: 'Celebrated reaching 25,000 satisfied portfolio creators.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Our Story</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We're on a mission to help professionals showcase their work beautifully,
          without the complexity of traditional web development.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 mb-6">
              To empower every professional, creator, and entrepreneur with the tools
              they need to build a stunning online presence in minutes, not months.
            </p>
            <div className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <span className="text-slate-700">Founded in 2020</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25K+</div>
              <div className="text-slate-600">Active Users</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">89</div>
              <div className="text-slate-600">Countries</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-slate-600">User Rating</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <div className="text-slate-600">Award Winning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="
    bg-white rounded-2xl p-6 shadow-sm
    hover:shadow-xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.social.twitter} className="text-slate-400 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href={member.social.linkedin} className="text-slate-400 hover:text-blue-600">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-6">
                <div className="text-white">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-blue-500 to-cyan-400"></div>
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-0 md:text-right' : 'md:pl-1/2 md:pr-0'}`}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-lg mx-auto">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mr-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{milestone.title}</h3>
                </div>
                <p className="text-slate-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;