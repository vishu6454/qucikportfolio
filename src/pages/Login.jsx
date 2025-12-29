import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Twitter,
  Chrome,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  UserPlus
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, socialLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /* ---------------- FORM HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- EMAIL LOGIN ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result?.success) {
        toast.success('Login successful!');
        navigate('/create');
      } else {
        setErrors({ submit: result?.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- SOCIAL LOGIN ---------------- */

  const handleSocialLogin = async (provider) => {
    try {
      const socialData = {
        email: `${provider}@example.com`,
        name: `${provider} User`,
        provider,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`
      };

      const result = await socialLogin(socialData);

      if (result?.success) {
        toast.success(`${provider} login successful`);
        navigate('/create');
      }
    } catch {
      toast.error(`${provider} login failed`);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50/50 px-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12">

        {/* LEFT INFO */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <Link to="/" className="flex items-center space-x-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">QP</span>
            </div>
            <span className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              QuickPortfolio
            </span>
          </Link>

          <h1 className="text-5xl font-bold mb-6">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Sign in to manage your portfolios and templates.
          </p>

          <div className="space-y-4">
            <Feature icon={<Zap />} text="Instant Portfolio Creation" />
            <Feature icon={<Shield />} text="Secure & Private" />
            <Feature icon={<Sparkles />} text="Premium Templates" />
          </div>
        </div>

        {/* RIGHT LOGIN */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

            <div className="p-8">

              {/* SOCIAL */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <SocialBtn icon={<Github />} label="GitHub" onClick={() => handleSocialLogin('github')} />
                <SocialBtn icon={<Twitter />} label="Twitter" onClick={() => handleSocialLogin('twitter')} />
                <SocialBtn icon={<Chrome />} label="Google" onClick={() => handleSocialLogin('google')} />
              </div>

              <div className="relative my-6 text-center">
                <span className="bg-white px-4 text-slate-500 text-sm">
                  Or sign in with email
                </span>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">

                <Input
                  label="Email"
                  name="email"
                  icon={<Mail />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <Input
                  label="Password"
                  name="password"
                  icon={<Lock />}
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  toggleIcon={
                    <button type="button" onClick={() => setShowPassword(p => !p)}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  }
                />

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2">
                    <Shield size={16} /> {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold"
                >
                  {isLoading ? 'Signing in...' : (
                    <span className="flex justify-center items-center gap-2">
                      Sign In <ArrowRight className={isHovered ? 'translate-x-1' : ''} />
                    </span>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm">
                New here?{' '}
                <Link to="/signup" className="text-blue-600 font-semibold inline-flex items-center gap-1">
                  <UserPlus size={14} /> Create account
                </Link>
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-slate-700">
    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    {text}
  </div>
);

const SocialBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 border rounded-xl hover:shadow-sm"
  >
    {icon}
    <span className="text-sm mt-1">{label}</span>
  </button>
);

const Input = ({ label, icon, toggleIcon, error, ...props }) => (
  <div>
    <label className="block mb-2 font-semibold">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
      <input
        {...props}
        className="w-full pl-10 pr-10 py-3 border rounded-xl"
      />
      <span className="absolute right-3 top-3 text-slate-400">
        {toggleIcon}
      </span>
    </div>
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default Login;
