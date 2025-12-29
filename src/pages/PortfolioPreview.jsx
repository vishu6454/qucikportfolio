// src/pages/PortfolioPreview.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Download, Share2, Copy, Check, Globe,
  Eye, Printer, Mail, Facebook, Twitter, Linkedin,
  ExternalLink, Lock, BarChart, QrCode as QrCodeIcon,
  Award, Briefcase, Code, GraduationCap, Mail as MailIcon,
  Phone, MapPin, Calendar, Link as LinkIcon,
  Github, Twitter as TwitterIcon, Linkedin as LinkedinIcon,
  Edit, Home,ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { downloadPortfolioAsHTML, downloadPortfolioAsZIP } from '../utils/downloadPortfolio';
import { templates } from '../utils/templates';

const PortfolioPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [analytics, setAnalytics] = useState({
    views: 245,
    shares: 42,
    downloads: 18,
    lastViewed: '2 hours ago'
  });

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      
      if (id === 'preview_temp') {
        // Load temporary preview data
        data = JSON.parse(localStorage.getItem('portfolio_preview_temp'));
      } else if (id === 'latest') {
        // Load latest portfolio
        data = JSON.parse(localStorage.getItem('latestPortfolio'));
      } else {
        // Load specific portfolio by ID
        data = JSON.parse(localStorage.getItem(`portfolio_${id}`));
      }

      if (!data) {
        // Try to load from user's portfolio list
        const user = JSON.parse(localStorage.getItem('quickportfolio_user'));
        if (user) {
          const userPortfolios = JSON.parse(localStorage.getItem(`user_portfolios_${user._id}`)) || [];
          const foundPortfolio = userPortfolios.find(p => p.id === id);
          if (foundPortfolio) {
            data = foundPortfolio;
          }
        }
      }

      if (!data) {
        toast.error('Portfolio not found');
        navigate('/create');
        return;
      }

      setPortfolioData(data);
      
      // Load template
      const templateId = data.settings?.template || 'template-1';
      const template = templates.find(t => t.id === templateId);
      setSelectedTemplate(template || templates[0]);

      // Update analytics
      const savedAnalytics = JSON.parse(localStorage.getItem(`analytics_${id}`));
      if (savedAnalytics) {
        setAnalytics(savedAnalytics);
      } else {
        // Initialize analytics for new portfolio
        const newAnalytics = {
          views: analytics.views,
          shares: analytics.shares,
          downloads: analytics.downloads,
          lastViewed: new Date().toLocaleString()
        };
        setAnalytics(newAnalytics);
        localStorage.setItem(`analytics_${id}`, JSON.stringify(newAnalytics));
      }

      // Increment view count
      const updatedAnalytics = {
        ...analytics,
        views: analytics.views + 1,
        lastViewed: new Date().toLocaleString()
      };
      setAnalytics(updatedAnalytics);
      localStorage.setItem(`analytics_${id}`, JSON.stringify(updatedAnalytics));
    } catch (error) {
      console.error('Error loading portfolio:', error);
      navigate('/create');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const shareUrl = `${window.location.origin}/preview/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadHTML = async () => {
    if (!portfolioData || !selectedTemplate) return;
    
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          downloadPortfolioAsHTML(portfolioData, selectedTemplate);
          
          // Update download count
          const updatedAnalytics = {
            ...analytics,
            downloads: analytics.downloads + 1
          };
          setAnalytics(updatedAnalytics);
          localStorage.setItem(`analytics_${id}`, JSON.stringify(updatedAnalytics));
          
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handleDownloadZIP = async () => {
    if (!portfolioData || !selectedTemplate) return;
    
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          downloadPortfolioAsZIP(portfolioData, selectedTemplate);
          
          // Update download count
          const updatedAnalytics = {
            ...analytics,
            downloads: analytics.downloads + 1
          };
          setAnalytics(updatedAnalytics);
          localStorage.setItem(`analytics_${id}`, JSON.stringify(updatedAnalytics));
          
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handleShareSocial = (platform) => {
    const name = portfolioData?.personalInfo?.firstName || 'My';
    const text = `Check out ${name}'s portfolio built with QuickPortfolio!`;
    const url = shareUrl;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    
    // Update share count
    const updatedAnalytics = {
      ...analytics,
      shares: analytics.shares + 1
    };
    setAnalytics(updatedAnalytics);
    localStorage.setItem(`analytics_${id}`, JSON.stringify(updatedAnalytics));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const name = portfolioData?.personalInfo?.firstName || 'Portfolio';
    const subject = `${name}'s Portfolio - Created with QuickPortfolio`;
    const body = `Check out my portfolio: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const renderSkillLevel = (level) => {
    const levels = {
      'Beginner': { width: '25%', color: 'bg-red-500' },
      'Intermediate': { width: '50%', color: 'bg-yellow-500' },
      'Advanced': { width: '75%', color: 'bg-blue-500' },
      'Expert': { width: '100%', color: 'bg-green-500' }
    };
    
    return levels[level] || levels['Intermediate'];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString || 'Present';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData || !selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Not Found</h2>
          <p className="text-slate-600 mb-8">The portfolio you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/create')}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Create New Portfolio
          </button>
        </div>
      </div>
    );
  }

  const { personalInfo, education, experience, skills, projects, socialLinks } = portfolioData;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Progress Bar */}
      {downloadProgress > 0 && downloadProgress < 100 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-100 z-50">
          <div 
            className="h-full bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-300"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/create')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              <span>Back to Editor</span>
            </button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Portfolio Preview
            </h1>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </button>
          </div>
          <p className="text-xl text-slate-600">
            Your portfolio is ready! Share it with the world or download it to host anywhere.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Full Portfolio Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Portfolio Header */}
              <div 
                className="h-64 relative"
                style={{ backgroundColor: selectedTemplate.colors.primary }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-6 left-8 flex items-end space-x-6">
                  {personalInfo.photo ? (
                    <img
                      src={personalInfo.photo}
                      alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold">
                      {personalInfo.firstName?.[0] || 'P'}
                    </div>
                  )}
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {personalInfo.firstName} {personalInfo.lastName}
                    </h2>
                    <p className="text-xl text-white/90">{personalInfo.title}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="px-8 pt-6 pb-8 border-b border-slate-200">
                <div className="flex flex-wrap gap-4">
                  {personalInfo.email && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MailIcon className="h-4 w-4" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
                
                {/* Social Links */}
                {(socialLinks.linkedin || socialLinks.github || socialLinks.twitter) && (
                  <div className="flex space-x-3 mt-4">
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <LinkedinIcon className="h-5 w-5" />
                      </a>
                    )}
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      >
                        <TwitterIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="px-8 py-8 space-y-12">
                {/* Summary */}
                {personalInfo.summary && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center">
                      <Award className="h-6 w-6 mr-3" style={{ color: selectedTemplate.colors.secondary }} />
                      About Me
                    </h3>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Briefcase className="h-6 w-6 mr-3" style={{ color: selectedTemplate.colors.secondary }} />
                      Experience
                    </h3>
                    <div className="space-y-6">
                      {experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-slate-200">
                          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white border-2" 
                               style={{ borderColor: selectedTemplate.colors.primary }}></div>
                          <div className="mb-2">
                            <h4 className="text-lg font-bold text-slate-900">{exp.position}</h4>
                            <p className="text-slate-600">{exp.company}</p>
                          </div>
                          <div className="flex items-center text-slate-500 text-sm mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                          <p className="text-slate-700 whitespace-pre-line">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <GraduationCap className="h-6 w-6 mr-3" style={{ color: selectedTemplate.colors.secondary }} />
                      Education
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {education.map((edu, index) => (
                        <div key={index} className="bg-slate-50 rounded-xl p-4">
                          <h4 className="font-bold text-slate-900 mb-1">{edu.degree}</h4>
                          <p className="text-slate-600 mb-2">{edu.institution}</p>
                          <div className="flex items-center text-slate-500 text-sm mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{edu.year}</span>
                          </div>
                          {edu.description && (
                            <p className="text-slate-700 text-sm whitespace-pre-line">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Code className="h-6 w-6 mr-3" style={{ color: selectedTemplate.colors.secondary }} />
                      Skills & Expertise
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-900">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.level}</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${renderSkillLevel(skill.level).color}`}
                              style={{ width: renderSkillLevel(skill.level).width }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{skill.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <Globe className="h-6 w-6 mr-3" style={{ color: selectedTemplate.colors.secondary }} />
                      Projects
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {projects.map((project, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {project.image && (
                            <div className="h-48 overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-slate-900 text-lg">{project.title}</h4>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            <p className="text-slate-700 mb-4 whitespace-pre-line">{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-3 py-1 text-xs rounded-full"
                                    style={{ 
                                      backgroundColor: `${selectedTemplate.colors.accent}20`,
                                      color: selectedTemplate.colors.accent
                                    }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div 
                className="px-8 py-6 text-center text-white"
                style={{ backgroundColor: selectedTemplate.colors.primary }}
              >
                <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}</p>
                <p className="text-sm opacity-80 mt-1">Portfolio created with QuickPortfolio</p>
              </div>
            </div>

            {/* QR Code Modal */}
            {showQR && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
                  <div className="text-center">
                    <QRCodeSVG 
                      value={shareUrl}
                      size={200}
                      level="H"
                      includeMargin
                      className="mx-auto mb-4"
                    />
                    <p className="text-slate-600 mb-4">Scan to view portfolio on mobile</p>
                    <button
                      onClick={() => setShowQR(false)}
                      className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Share Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-blue-600" />
                Share Your Portfolio
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 rounded-r-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-l-none flex items-center space-x-2"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Share on Social Media</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleShareSocial('twitter')}
                    className="p-3 rounded-lg bg-linear-to-r from-sky-50 to-blue-50 text-sky-600 hover:bg-sky-100 transition-all"
                  >
                    <Twitter className="h-5 w-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleShareSocial('facebook')}
                    className="p-3 rounded-lg bg-linear-to-r from-blue-50 to-indigo-50 text-blue-600 hover:bg-blue-100 transition-all"
                  >
                    <Facebook className="h-5 w-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleShareSocial('linkedin')}
                    className="p-3 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 text-blue-700 hover:bg-blue-100 transition-all"
                  >
                    <Linkedin className="h-5 w-5 mx-auto" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEmail}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>Email Portfolio</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Printer className="h-5 w-5" />
                  <span>Print Portfolio</span>
                </button>
                <button
                  onClick={() => setShowQR(true)}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <QrCodeIcon className="h-5 w-5" />
                  <span>Generate QR Code</span>
                </button>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Download className="h-5 w-5 mr-2 text-green-600" />
                Download Options
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleDownloadHTML}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-green-500 to-emerald-400 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900">HTML File</div>
                      <div className="text-sm text-slate-600">Single HTML file</div>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-slate-400 group-hover:text-green-600" />
                </button>

                <button
                  onClick={handleDownloadZIP}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <Download className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900">ZIP Package</div>
                      <div className="text-sm text-slate-600">All assets included</div>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                </button>
              </div>
            </div>

            {/* Analytics & Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-purple-600" />
                Portfolio Analytics
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Views</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{analytics.views}</div>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Share2 className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Shares</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">{analytics.shares}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-slate-700">Template</span>
                  <span className="font-medium text-slate-900">{selectedTemplate?.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-slate-700">Created</span>
                  <span className="font-medium text-slate-900">
                    {new Date(portfolioData.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/create?edit=${id}`)}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Portfolio</span>
                  </button>
                  <button
                    onClick={() => navigate('/templates')}
                    className="flex-1 px-4 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-colors"
                  >
                    Change Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;