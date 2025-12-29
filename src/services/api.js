import axios from 'axios';

/* ================================
   Base Axios Instance
================================ */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

/* ================================
   Request Interceptor (JWT)
================================ */
api.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem('quickportfolio_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.error('Invalid auth data in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================================
   Response Interceptor
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('quickportfolio_user');

      // Avoid redirect loop on public routes
      if (!window.location.pathname.startsWith('/portfolio/')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/* ================================
   Auth API
================================ */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  socialAuth: (data) => api.post('/auth/social', data),
  getMe: () => api.get('/auth/me'),

  setAuthData: (userData) => {
    localStorage.setItem('quickportfolio_user', JSON.stringify(userData));
  },

  logout: () => {
    localStorage.removeItem('quickportfolio_user');
  }
};

/* ================================
   Portfolio API (EMAIL AUTO FROM JWT)
================================ */
export const portfolioAPI = {
  getPortfolios: () => api.get('/portfolios'),
  getPortfolio: (id) => api.get(`/portfolios/${id}`),
  createPortfolio: (data) => api.post('/portfolios', data),
  updatePortfolio: (id, data) => api.put(`/portfolios/${id}`, data),
  deletePortfolio: (id) => api.delete(`/portfolios/${id}`),

  publishPortfolio: (id) => api.put(`/portfolios/${id}/publish`),
  generateHTML: (id) => api.get(`/portfolios/${id}/html`),
  sharePortfolio: (id, emailData) =>
    api.post(`/portfolios/${id}/share`, emailData),

  getPublicPortfolio: (slug) =>
    api.get(`/portfolios/public/${slug}`)
};

/* ================================
   Template API
================================ */
export const templateAPI = {
  getTemplates: (params) => api.get('/templates', { params }),
  getTemplate: (id) => api.get(`/templates/${id}`),
  getTemplateCategories: () => api.get('/templates/categories'),
  getPremiumTemplates: () => api.get('/templates/premium'),
  previewTemplate: (id) => api.get(`/templates/preview/${id}`),
  favoriteTemplate: (id) => api.post(`/templates/${id}/favorite`),
  getFavorites: () => api.get('/templates/user/favorites')
};

/* ================================
   Contact API
================================ */
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  checkStatus: () => api.get('/contact/status')
};

/* ================================
   User API
================================ */
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  updatePlan: (data) => api.put('/users/plan', data),
  getPortfolios: () => api.get('/users/portfolios'),

  deleteAccount: (password) =>
    api.delete('/users/account', { data: { password } }),

  uploadAvatar: (formData) =>
    api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  getDashboardStats: () => api.get('/users/dashboard')
};

export default api;
