// src/pages/TemplateGallery.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Palette, 
  Sparkles, 
  TrendingUp,
  Zap,
  ArrowRight,
  CheckCircle,
  LayoutGrid,
  Grid3x3,
  Rows
} from 'lucide-react';
import { templates, categories } from '../utils/templates';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'detailed', 'compact'

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (templateId) => {
    localStorage.setItem('selected_template', templateId);
    navigate('/create');
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>25+ Professional Templates</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Choose Your <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Perfect</span> Template
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Browse our collection of professionally designed, fully responsive templates. 
            All templates are customizable to match your personal brand and style.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">25+</div>
              <div className="text-sm text-slate-600">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">100%</div>
              <div className="text-sm text-slate-600">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">4.8★</div>
              <div className="text-sm text-slate-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">10k+</div>
              <div className="text-sm text-slate-600">Users</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search templates by name, category, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white p-1.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'detailed' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Grid3x3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Rows className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-900">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredTemplates.length}</span> templates
            {searchTerm && ` for "${searchTerm}"`}
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>

        {/* Template Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          viewMode === 'detailed' ? 'grid-cols-1 lg:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {filteredTemplates.map(template => (
            <div 
              key={template.id} 
              className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ${
                viewMode === 'compact' ? 'p-4' : 'shadow-sm'
              }`}
            >
              {/* Template Preview */}
              <div className={`relative overflow-hidden ${
                viewMode === 'detailed' ? 'h-64' :
                viewMode === 'compact' ? 'h-40' : 'h-56'
              }`}>
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay linear */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 transition-all">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-10 h-10 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Popular Badge */}
                {template.popular && (
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center space-x-1 bg-linear-to-r from-amber-500 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      <TrendingUp className="h-3 w-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                )}

                {/* New Badge */}
                {template.new && (
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center space-x-1 bg-linear-to-r from-green-500 to-emerald-400 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      <Zap className="h-3 w-3" />
                      <span>New</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className={viewMode === 'compact' ? 'mt-3' : 'p-6'}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-bold text-slate-900 ${
                      viewMode === 'compact' ? 'text-base' : 'text-xl'
                    }`}>
                      {template.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{template.category}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-slate-50 px-2 py-1 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-900">4.8</span>
                  </div>
                </div>

                {viewMode !== 'compact' && (
                  <>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {['Responsive', 'Customizable', 'Modern Design'].map((feature, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {Object.entries(template.colors).slice(0, 4).map(([name, color]) => (
                          <div
                            key={name}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                            title={`${name}: ${color}`}
                          />
                        ))}
                        {Object.keys(template.colors).length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-600">
                            +{Object.keys(template.colors).length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* CTA Button - Always Visible */}
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full mt-4 flex items-center justify-center space-x-2 font-medium transition-all ${
                    viewMode === 'compact' 
                      ? 'px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]'
                      : 'px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]'
                  }`}
                >
                  <Palette className="h-5 w-5" />
                  <span>Use This Template</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
              <Search className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No templates found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              We couldn't find any templates matching your search. Try a different keyword or browse all templates.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              View All Templates
            </button>
          </div>
        )}

        {/* Premium CTA */}
        <div className="mt-20 mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-2/3">
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span>Premium Templates</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Need Something Extraordinary?
                  </h2>
                  <p className="text-slate-300 text-lg mb-8 max-w-2xl">
                    Unlock our premium template collection with advanced animations, 
                    custom components, and priority support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
                      Explore Premium
                    </button>
                    <Link 
                      to="/contact" 
                      className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
                    >
                      Book a Demo
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-2xl font-bold mb-1">50+</div>
                      <div className="text-sm text-slate-300">Premium Templates</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-2xl font-bold mb-1">24/7</div>
                      <div className="text-sm text-slate-300">Priority Support</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-2xl font-bold mb-1">100%</div>
                      <div className="text-sm text-slate-300">Customizable</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-2xl font-bold mb-1">Free</div>
                      <div className="text-sm text-slate-300">Updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;