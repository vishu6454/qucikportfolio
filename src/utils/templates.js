// src/utils/templates.js
export const templates = [
  {
    id: 'template-1',
    name: 'Professional Blue',
    category: 'Professional',
    description: 'Clean and corporate design for business professionals',
    colors: {
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#38BDF8',
      background: '#F8FAFC',
      text: '#1E293B'
    },
    features: ['Modern Layout', 'Professional Typography', 'Gradient Accents'],
    previewImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  },
  {
    id: 'template-2',
    name: 'Creative Purple',
    category: 'Creative',
    description: 'Modern gradient design for creative professionals',
    colors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#A78BFA',
      background: '#FAF5FF',
      text: '#312E81'
    },
    features: ['Creative Layout', 'Vibrant Colors', 'Modern Design'],
    previewImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop'
  },
  {
    id: 'template-3',
    name: 'Tech Minimal',
    category: 'Technology',
    description: 'Minimalist design for tech professionals',
    colors: {
      primary: '#0F172A',
      secondary: '#475569',
      accent: '#06B6D4',
      background: '#FFFFFF',
      text: '#0F172A'
    },
    features: ['Minimal Design', 'Clean Typography', 'Dark Mode'],
    previewImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=400&fit=crop'
  },
  {
    id: 'template-4',
    name: 'Green Professional',
    category: 'Professional',
    description: 'Eco-friendly design with green accents',
    colors: {
      primary: '#16A34A',
      secondary: '#15803D',
      accent: '#4ADE80',
      background: '#F0FDF4',
      text: '#14532D'
    },
    features: ['Eco Design', 'Professional Layout', 'Green Theme'],
    previewImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop'
  },
  {
    id: 'template-5',
    name: 'Bold Gradient',
    category: 'Creative',
    description: 'Vibrant gradient design for bold personalities',
    colors: {
      primary: '#EC4899',
      secondary: '#DB2777',
      accent: '#F472B6',
      background: '#FDF2F8',
      text: '#831843'
    },
    features: ['Bold Colors', 'Gradient Effects', 'Creative Layout'],
    previewImage: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&h=400&fit=crop'
  },
  {
    id: 'template-6',
    name: 'Dark Tech',
    category: 'Technology',
    description: 'Dark mode design for developers',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      background: '#0F172A',
      text: '#E2E8F0'
    },
    features: ['Dark Theme', 'Developer Focused', 'Modern Design'],
    previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'
  }
];

export const categories = ['All', 'Professional', 'Creative', 'Technology'];

export const initialFormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
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
  }
};