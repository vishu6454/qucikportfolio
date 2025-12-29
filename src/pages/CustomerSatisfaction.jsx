// src/pages/CustomerSatisfaction.jsx
import React, { useState, useEffect } from 'react';
import {
  Star, Award, TrendingUp, Users, Smile,
  ThumbsUp, CheckCircle, BarChart3, Target, Zap
} from 'lucide-react';

const CustomerSatisfaction = () => {
  const [stats, setStats] = useState({
    satisfaction: 0,
    retention: 0,
    responseTime: 0,
    totalUsers: 0
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Animate counters
    const targetStats = {
      satisfaction: 98.7,
      retention: 95.2,
      responseTime: 1.8,
      totalUsers: 25489
    };

    const duration = 2000;
    const steps = 60;
    const increment = Object.keys(targetStats).reduce((acc, key) => ({
      ...acc,
      [key]: targetStats[key] / steps
    }), {});

    let currentStats = { satisfaction: 0, retention: 0, responseTime: 0, totalUsers: 0 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      currentStats = Object.keys(currentStats).reduce((acc, key) => ({
        ...acc,
        [key]: Math.min(step * increment[key], targetStats[key])
      }), {});

      setStats(currentStats);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    // Load reviews
    const loadReviews = () => {
      const sampleReviews = [
        {
          id: 1,
          name: 'Alex Johnson',
          role: 'Product Designer',
          rating: 5,
          date: '2 days ago',
          comment: 'QuickPortfolio transformed how I showcase my work. The templates are stunning!',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
        },
        {
          id: 2,
          name: 'Maria Garcia',
          role: 'Frontend Developer',
          rating: 5,
          date: '1 week ago',
          comment: 'Customer support is phenomenal. They helped me customize my template perfectly.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
        },
        {
          id: 3,
          name: 'David Chen',
          role: 'Marketing Director',
          rating: 4,
          date: '2 weeks ago',
          comment: 'Great platform for team portfolios. Our entire department uses it.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
        },
        {
          id: 4,
          name: 'Sarah Williams',
          role: 'UX Researcher',
          rating: 5,
          date: '3 weeks ago',
          comment: 'The analytics dashboard helped me understand my portfolio traffic.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        }
      ];
      setReviews(sampleReviews);
    };

    loadReviews();

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      icon: <Smile className="h-8 w-8" />,
      title: 'Customer Satisfaction',
      value: `${stats.satisfaction.toFixed(1)}%`,
      description: 'Based on 1,234 reviews',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'User Retention',
      value: `${stats.retention.toFixed(1)}%`,
      description: 'Monthly active users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Avg. Response Time',
      value: `${stats.responseTime.toFixed(1)}h`,
      description: 'Support ticket response',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      description: 'Active portfolio creators',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const satisfactionData = [
    { month: 'Jan', satisfaction: 96.5 },
    { month: 'Feb', satisfaction: 97.2 },
    { month: 'Mar', satisfaction: 97.8 },
    { month: 'Apr', satisfaction: 98.1 },
    { month: 'May', satisfaction: 98.5 },
    { month: 'Jun', satisfaction: 98.7 }
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 85, count: 1049 },
    { stars: 4, percentage: 10, count: 123 },
    { stars: 3, percentage: 3, count: 37 },
    { stars: 2, percentage: 1, count: 12 },
    { stars: 1, percentage: 1, count: 13 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-linear-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full mb-6">
          <Award className="h-4 w-4" />
          <span className="text-sm font-medium">Rated 4.9/5 by 1,234 Customers</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">Customer Satisfaction</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We're obsessed with providing the best experience for our users. See what our community has to say.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
          >

            <div className={`w-14 h-14 rounded-xl bg-linear-to-r ${metric.color} flex items-center justify-center mb-4`}>
              <div className="text-white">
                {metric.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
            <div className="font-medium text-slate-900 mb-2">{metric.title}</div>
            <div className="text-sm text-slate-600">{metric.description}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Reviews */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-bold text-slate-900">4.9</span>
                <span className="text-slate-600">(1,234 reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{review.name}</div>
                        <div className="text-sm text-slate-600">{review.role}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">{review.date}</div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>

                  <p className="text-slate-700">{review.comment}</p>

                  <div className="flex items-center space-x-4 mt-4">
                    <button className="flex items-center space-x-1 text-sm text-slate-500 hover:text-slate-700">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful</span>
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <button className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Rating Distribution</h2>
            <div className="space-y-4">
              {ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm text-slate-600">{rating.stars}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <span className="font-medium text-slate-900">{rating.percentage}%</span>
                    <span className="text-sm text-slate-500 ml-1">({rating.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Charts & Info */}
        <div className="space-y-8">
          {/* Satisfaction Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Satisfaction Trend</h2>
            <div className="space-y-4">
              {satisfactionData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{data.month}</span>
                    <span className="text-sm font-bold text-green-600">{data.satisfaction}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: `${data.satisfaction}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Highlight */}
          <div className="bg-white rounded-2xl p-6 shadow-sm bg-linear-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <blockquote className="text-lg text-slate-900 mb-4">
                "QuickPortfolio helped me land my dream job. The portfolio looked so professional that recruiters were impressed."
              </blockquote>
              <div>
                <div className="font-bold text-slate-900">Michael Rodriguez</div>
                <div className="text-sm text-slate-600">Senior Product Manager</div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Commitment</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-900">24/7 Customer Support</div>
                  <div className="text-sm text-slate-600">Always here when you need us</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-900">Money-Back Guarantee</div>
                  <div className="text-sm text-slate-600">30-day satisfaction guarantee</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-900">Continuous Improvement</div>
                  <div className="text-sm text-slate-600">Regular updates based on feedback</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-slate-900">Transparent Pricing</div>
                  <div className="text-sm text-slate-600">No hidden fees or surprises</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm bg-linear-to-r from-green-50 to-emerald-50">
            <div className="text-center">
              <h3 className="font-bold text-slate-900 mb-3">Share Your Experience</h3>
              <p className="text-slate-600 mb-4">
                Your feedback helps us improve and helps others make the right choice.
              </p>
              <button className="w-full px-6 py-3 bg-linear-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="mt-16">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-r from-amber-100 to-yellow-100 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Best Portfolio Builder 2024</h3>
              <p className="text-slate-600">Design Tools Awards</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Top User Experience</h3>
              <p className="text-slate-600">UX Design Awards</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-r from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Fastest Growing Platform</h3>
              <p className="text-slate-600">Tech Growth Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;