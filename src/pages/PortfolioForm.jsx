// src/pages/PortfolioForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Save, ArrowRight, Plus, Trash2, Upload, 
  Check, User, BookOpen, X,
  Briefcase, Code, Globe, Settings, Camera
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const PortfolioForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('quickportfolio_user')) || null;
  const userEmail = currentUser?.email || 'demo@example.com';
  const userId = currentUser?._id || 'anonymous';
  
  // Check if we're editing an existing portfolio
  const queryParams = new URLSearchParams(location.search);
  const editPortfolioId = queryParams.get('edit');
  const isEditing = !!editPortfolioId;
  
  // Generate storage key based on user email
  const storageKey = `portfolio_data_${userEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  // Initial form data structure
  const initialFormData = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: userEmail,
      phone: '',
      location: '',
      title: '',
      summary: '',
      photo: null
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: ''
    },
    settings: {
      template: 'template-1',
      colorScheme: 'blue',
      enableAnalytics: true,
      passwordProtect: false,
      password: ''
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [portfolioId, setPortfolioId] = useState(editPortfolioId || uuidv4());

  const totalSteps = 6;
  const steps = [
    { id: 1, name: 'Personal Info', icon: <User className="h-5 w-5" /> },
    { id: 2, name: 'Education', icon: <BookOpen className="h-5 w-5" /> },
    { id: 3, name: 'Experience', icon: <Briefcase className="h-5 w-5" /> },
    { id: 4, name: 'Skills', icon: <Code className="h-5 w-5" /> },
    { id: 5, name: 'Projects', icon: <Globe className="h-5 w-5" /> },
    { id: 6, name: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  // Load portfolio data on component mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);
      
      try {
        if (isEditing && editPortfolioId) {
          // Load from localStorage for editing existing portfolio
          const savedData = localStorage.getItem(`portfolio_${editPortfolioId}`);
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setFormData({
              ...parsedData,
              personalInfo: {
                ...parsedData.personalInfo,
                email: userEmail
              }
            });
            setPortfolioId(editPortfolioId);
          }
        } else {
          // Load from localStorage for new portfolio
          const savedData = localStorage.getItem(storageKey);
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              setFormData({
                ...parsedData,
                personalInfo: {
                  ...parsedData.personalInfo,
                  email: userEmail
                }
              });
            } catch (parseError) {
              console.error('Error parsing saved data:', parseError);
              setFormData(initialFormData);
            }
          } else {
            setFormData(initialFormData);
          }
        }
      } catch (error) {
        console.error('Error loading portfolio:', error);
        toast.error('Failed to load portfolio data');
        setFormData(initialFormData);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, [userEmail, isEditing, editPortfolioId, storageKey]);

  // Auto-save to localStorage whenever formData changes (debounced)
  useEffect(() => {
    if (loading) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        // Save draft to user-specific storage
        localStorage.setItem(storageKey, JSON.stringify(formData));
        
        // Also save to portfolio-specific storage for preview
        localStorage.setItem(`portfolio_${portfolioId}`, JSON.stringify(formData));
        
        // Update latest portfolio reference
        localStorage.setItem('latestPortfolio', JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [formData, storageKey, loading, portfolioId]);

  const handleFileUpload = (section, index = null, field = 'photo') => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => {
        if (index !== null) {
          const updated = [...prev[section]];
          updated[index] = { ...updated[index], [field]: reader.result };
          return { ...prev, [section]: updated };
        }
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: reader.result
          }
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.personalInfo.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.personalInfo.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    
    // Validate experience in step 3
    if (step === 3) {
      formData.experience.forEach((exp, index) => {
        if (!exp.position?.trim()) {
          newErrors[`experience_${index}_position`] = 'Position is required';
        }
        if (!exp.company?.trim()) {
          newErrors[`experience_${index}_company`] = 'Company is required';
        }
      });
    }
    
    // Validate projects in step 5
    if (step === 5) {
      formData.projects.forEach((project, index) => {
        if (!project.title?.trim()) {
          newErrors[`project_${index}_title`] = 'Project title is required';
        }
        if (!project.description?.trim()) {
          newErrors[`project_${index}_description`] = 'Project description is required';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      },
      updatedAt: new Date().toISOString()
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
      updatedAt: new Date().toISOString()
    }));
    
    // Clear error for this field
    const errorKey = `${section}_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const addArrayItem = (section, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...defaultItem, id: uuidv4() }],
      updatedAt: new Date().toISOString()
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSave = async () => {
    if (!validateStep(6)) {
      toast.error('Please fix all errors before saving');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Prepare portfolio data
      const portfolioData = {
        id: portfolioId,
        title: `${formData.personalInfo.firstName}'s Portfolio` || 'My Portfolio',
        personalInfo: formData.personalInfo,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects,
        socialLinks: formData.socialLinks,
        settings: formData.settings,
        createdAt: formData.createdAt,
        updatedAt: new Date().toISOString(),
        userId: userId,
        userEmail: userEmail
      };

      // Save to localStorage
      localStorage.setItem(`portfolio_${portfolioId}`, JSON.stringify(portfolioData));
      localStorage.setItem('latestPortfolio', JSON.stringify(portfolioData));
      
      // Clear draft storage
      localStorage.removeItem(storageKey);
      
      // Save to user's portfolio list
      const userPortfolios = JSON.parse(localStorage.getItem(`user_portfolios_${userId}`)) || [];
      const existingIndex = userPortfolios.findIndex(p => p.id === portfolioId);
      
      if (existingIndex >= 0) {
        userPortfolios[existingIndex] = portfolioData;
      } else {
        userPortfolios.push(portfolioData);
      }
      
      localStorage.setItem(`user_portfolios_${userId}`, JSON.stringify(userPortfolios));
      
      toast.success(isEditing ? 'Portfolio updated successfully!' : 'Portfolio created successfully!');
      
      // Navigate to preview
      navigate(`/preview/${portfolioId}`);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast.error('Failed to save portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      setFormData(initialFormData);
      localStorage.removeItem(storageKey);
      toast.success('Form cleared successfully');
    }
  };

  const handlePreview = () => {
    // Save current data temporarily
    const tempData = {
      ...formData,
      id: 'preview_temp',
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('portfolio_preview_temp', JSON.stringify(tempData));
    navigate('/preview/preview_temp');
  };

  // Render Step Content Functions
  const renderStepContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading portfolio data...</p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.personalInfo.title}
                onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Your Email"
                readOnly
              />
              <p className="text-sm text-slate-500 mt-1">Email is set to your account email and cannot be changed</p>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Professional Summary
              </label>
              <textarea
                value={formData.personalInfo.summary}
                onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Passionate frontend developer with 5+ years of experience..."
                rows={4}
              />
            </div>

            {/* Profile Photo */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Profile Picture</h4>
                  <p className="text-sm text-slate-500">Add a photo to personalize your portfolio</p>
                </div>
                
                {formData.personalInfo.photo && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('personalInfo', 'photo', null)}
                    className="inline-flex items-center space-x-1.5 text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Current Photo Display */}
                <div className="relative">
                  <div className="relative w-32 h-32">
                    {formData.personalInfo.photo ? (
                      <>
                        <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                          <img
                            src={formData.personalInfo.photo}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-md flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">No photo</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                <div className="flex-1 max-w-md">
                  <label className="block">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                      <div className="flex items-start space-x-4">
                        <div className="shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Upload className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-slate-900 mb-1">
                            {formData.personalInfo.photo ? 'Update your photo' : 'Upload your photo'}
                          </h5>
                          <p className="text-sm text-slate-600 mb-3">
                            Drag & drop or click to browse. Supports JPG, PNG, WebP.
                          </p>
                          <div className="inline-flex items-center space-x-2 text-sm text-blue-600 font-medium">
                            <Upload className="h-4 w-4" />
                            <span>Browse files</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileUpload('personalInfo')}
                    />
                  </label>

                  {/* Quick Stats */}
                  {formData.personalInfo.photo && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-green-700 font-medium mb-1">Photo added</div>
                        <div className="text-sm font-semibold text-green-900">✓ Ready</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-xs text-blue-700 font-medium mb-1">Recommended</div>
                        <div className="text-sm font-semibold text-blue-900">Square ratio</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Education</h3>
              <button
                type="button"
                onClick={() => addArrayItem('education', {
                  id: uuidv4(),
                  degree: '',
                  institution: '',
                  year: '',
                  description: ''
                })}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Education</span>
              </button>
            </div>

            {formData.education.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No education entries yet. Add your first one!</p>
              </div>
            ) : (
              formData.education.map((edu, index) => (
                <div key={edu.id || index} className="bg-white rounded-2xl p-6 shadow-sm relative group hover:shadow-lg transition-shadow">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('education', index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Degree / Certificate
                      </label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Stanford University"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        value={edu.year || ''}
                        onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2016-2020"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={edu.description || ''}
                        onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Relevant coursework, achievements..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Work Experience</h3>
              <button
                type="button"
                onClick={() => addArrayItem('experience', {
                  id: uuidv4(),
                  position: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  current: false
                })}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Experience</span>
              </button>
            </div>

            {formData.experience.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No experience entries yet. Add your first one!</p>
              </div>
            ) : (
              formData.experience.map((exp, index) => (
                <div key={exp.id || index} className="bg-white rounded-2xl p-6 shadow-sm relative group hover:shadow-lg transition-shadow">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('experience', index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        value={exp.position || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Senior Frontend Developer"
                      />
                      {errors[`experience_${index}_position`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experience_${index}_position`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="TechCorp Inc."
                      />
                      {errors[`experience_${index}_company`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`experience_${index}_company`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        value={exp.startDate || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        End Date
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="month"
                          value={exp.endDate || ''}
                          onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
                          disabled={exp.current}
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current || false}
                            onChange={(e) => handleArrayChange('experience', index, 'current', e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-600">Current</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe your responsibilities and achievements..."
                      rows={4}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Skills & Expertise</h3>
              <button
                type="button"
                onClick={() => addArrayItem('skills', {
                  id: uuidv4(),
                  name: '',
                  level: 'Intermediate',
                  category: 'Technical'
                })}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </button>
            </div>

            {formData.skills.length === 0 ? (
              <div className="text-center py-12">
                <Code className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No skills added yet. Add your first one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.skills.map((skill, index) => (
                  <div key={skill.id || index} className="bg-white rounded-2xl p-6 shadow-sm group hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <input
                        type="text"
                        value={skill.name || ''}
                        onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                        className="text-lg font-semibold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                        placeholder="Skill Name"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={skill.category || 'Technical'}
                          onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Technical">Technical</option>
                          <option value="Design">Design</option>
                          <option value="Business">Business</option>
                          <option value="Soft Skills">Soft Skills</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Proficiency Level
                        </label>
                        <select
                          value={skill.level || 'Intermediate'}
                          onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">
                          {skill.category || 'Technical'}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                          skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                          skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {skill.level || 'Intermediate'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Projects & Portfolio</h3>
              <button
                type="button"
                onClick={() => addArrayItem('projects', {
                  id: uuidv4(),
                  title: '',
                  description: '',
                  technologies: [],
                  link: '',
                  image: null
                })}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            {formData.projects.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">No projects added yet. Add your first one!</p>
              </div>
            ) : (
              formData.projects.map((project, index) => (
                <div key={project.id || index} className="bg-white rounded-2xl p-6 shadow-sm group hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={project.title || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                        className="text-xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                        placeholder="Project Title *"
                      />
                      {errors[`project_${index}_title`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`project_${index}_title`]}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('projects', index)}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Project Link
                      </label>
                      <input
                        type="url"
                        value={project.link || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Technologies Used
                      </label>
                      <input
                        type="text"
                        value={project.technologies?.join(', ') || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="React, Node.js, MongoDB, TailwindCSS"
                      />
                      <p className="text-sm text-slate-500 mt-1">
                        Separate technologies with commas
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={project.description || ''}
                      onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe the project, your role, and key achievements..."
                      rows={4}
                    />
                    {errors[`project_${index}_description`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`project_${index}_description`]}</p>
                    )}
                  </div>

                  {/* Project Image */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">Project Image</h4>
                        <p className="text-sm text-slate-500">Visual showcase of your work</p>
                      </div>
                      {project.image && (
                        <button
                          type="button"
                          onClick={() => handleArrayChange('projects', index, 'image', null)}
                          className="inline-flex items-center space-x-1.5 text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove Image</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Image Preview */}
                      <div className="md:col-span-1">
                        <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                          {project.image ? (
                            <>
                              <img
                                src={project.image}
                                alt="Project Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                              <div className="absolute bottom-3 left-3">
                                <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                                  Preview
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <Globe className="h-12 w-12 text-slate-400 mb-3" />
                              <p className="text-sm text-slate-500">No image</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Upload Section */}
                      <div className="md:col-span-2">
                        <label className="block h-full">
                          <div className="h-full border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-sm transition-all duration-200 cursor-pointer">
                            <div className="flex items-start space-x-4">
                              <div className="shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                                  {project.image ? (
                                    <Upload className="h-6 w-6 text-white" />
                                  ) : (
                                    <Globe className="h-6 w-6 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-slate-900 mb-1">
                                  {project.image ? 'Update project image' : 'Add project image'}
                                </h5>
                                <p className="text-sm text-slate-600 mb-4">
                                  Upload a screenshot or cover image. Drag & drop or click to browse.
                                </p>
                                <div className="flex items-center space-x-4">
                                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                                    <Upload className="h-4 w-4" />
                                    <span className="text-sm font-medium">Browse files</span>
                                  </div>
                                  <span className="text-xs text-slate-500">Max 5MB</span>
                                </div>
                              </div>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleFileUpload('projects', index, 'image')}
                            />
                          </div>
                        </label>

                        {/* Quick Stats */}
                        {project.image && (
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="text-xs text-green-700 font-medium mb-1">Image added</div>
                              <div className="text-sm font-semibold text-green-900">✓ Ready</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-xs text-blue-700 font-medium mb-1">Recommended</div>
                              <div className="text-sm font-semibold text-blue-900">16:9 ratio</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Portfolio Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Template Selection */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Template & Design</h4>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Template
                  </label>
                  <select
                    value={formData.settings.template}
                    onChange={(e) => handleInputChange('settings', 'template', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="template-1">Professional Blue</option>
                    <option value="template-2">Creative Purple</option>
                    <option value="template-3">Tech Minimal</option>
                    <option value="template-4">Green Professional</option>
                    <option value="template-5">Bold Linear</option>
                    <option value="template-6">Dark Tech</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Color Scheme
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('settings', 'colorScheme', 'blue')}
                      className={`w-10 h-10 rounded-full border-2 ${formData.settings.colorScheme === 'blue' ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-300'}`}
                      style={{ backgroundColor: '#2563EB' }}
                      title="Blue"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('settings', 'colorScheme', 'purple')}
                      className={`w-10 h-10 rounded-full border-2 ${formData.settings.colorScheme === 'purple' ? 'border-purple-600 ring-2 ring-purple-200' : 'border-slate-300'}`}
                      style={{ backgroundColor: '#7C3AED' }}
                      title="Purple"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('settings', 'colorScheme', 'green')}
                      className={`w-10 h-10 rounded-full border-2 ${formData.settings.colorScheme === 'green' ? 'border-green-600 ring-2 ring-green-200' : 'border-slate-300'}`}
                      style={{ backgroundColor: '#16A34A' }}
                      title="Green"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('settings', 'colorScheme', 'red')}
                      className={`w-10 h-10 rounded-full border-2 ${formData.settings.colorScheme === 'red' ? 'border-red-600 ring-2 ring-red-200' : 'border-slate-300'}`}
                      style={{ backgroundColor: '#DC2626' }}
                      title="Red"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy & Analytics */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-900">Privacy & Analytics</h4>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-slate-50">
                    <span className="text-slate-700">Enable Portfolio Analytics</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.settings.enableAnalytics}
                        onChange={(e) => handleInputChange('settings', 'enableAnalytics', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${formData.settings.enableAnalytics ? 'bg-green-500' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${formData.settings.enableAnalytics ? 'translate-x-5' : ''}`} />
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer p-3 rounded-lg hover:bg-slate-50">
                    <span className="text-slate-700">Password Protection</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.settings.passwordProtect}
                        onChange={(e) => handleInputChange('settings', 'passwordProtect', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${formData.settings.passwordProtect ? 'bg-blue-500' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${formData.settings.passwordProtect ? 'translate-x-5' : ''}`} />
                      </div>
                    </div>
                  </label>
                  
                  {formData.settings.passwordProtect && (
                    <div className="ml-4 pl-4 border-l-2 border-blue-200">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.settings.password || ''}
                        onChange={(e) => handleInputChange('settings', 'password', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter password"
                      />
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-700">Social Links</h4>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => handleInputChange('socialLinks', 'linkedin', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">GitHub</label>
                    <input
                      type="url"
                      value={formData.socialLinks.github}
                      onChange={(e) => handleInputChange('socialLinks', 'github', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Twitter/X</label>
                    <input
                      type="url"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => handleInputChange('socialLinks', 'twitter', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview & Finalize */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h4 className="font-bold text-slate-900 mb-3">Ready to Publish?</h4>
                <p className="text-slate-600 mb-4">
                  Review your information and click "Save & Preview" to see your portfolio.
                  You can always come back and make changes.
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5" />
                        <span>{isEditing ? 'Update Portfolio' : 'Save & Preview Portfolio'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Review from beginning
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {isEditing ? 'Edit Portfolio' : 'Create Your Portfolio'}
              </h1>
              <p className="text-slate-600">
                {currentUser?.email ? `Logged in as: ${currentUser.email}` : 'Please login to save your portfolio'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreview}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>Live Preview</span>
              </button>
              <button
                onClick={clearForm}
                className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Form</span>
              </button>
            </div>
          </div>
          
          {!currentUser && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <p className="text-yellow-800">
                ⚠️ You are not logged in. Your data will only be saved locally.
                <a href="/login" className="ml-2 text-blue-600 hover:underline font-medium">
                  Login to save to cloud
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step.id ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${currentStep > step.id ? 'bg-linear-to-r from-blue-600 to-cyan-500' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm font-medium text-slate-600">
            {steps.map(step => (
              <span key={step.id}>{step.name}</span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
            <span>Previous</span>
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Next Step</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              <span>{isSaving ? 'Saving...' : (isEditing ? 'Update Portfolio' : 'Save & Preview')}</span>
            </button>
          )}
        </div>

        {/* Auto-save status */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            <span className="inline-flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Auto-save enabled • Data saved for: {userEmail}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;