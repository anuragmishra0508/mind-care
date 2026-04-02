import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { HeartPulse } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-8">
      <div className="max-w-5xl w-full glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-0 overflow-hidden flex flex-col md:flex-row shadow-2xl animate-fade-in-up">
        
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-wellness-primary/40 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-wellness-primary/90 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000" 
            alt="Wellness Morning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Focus on your wellbeing</h2>
            <p className="text-wellness-hero-light leading-relaxed">Join thousands of users improving their mental health through daily tracking and AI-driven insights.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white/50 relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-wellness-hero/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse-slow"></div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wellness-primary shadow-xl shadow-wellness-primary/20 mb-6 group hover:scale-105 transition-transform">
              <HeartPulse className="text-white relative z-10" size={32} />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Continue your wellness journey</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-3 animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary hover:shadow-wellness-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex justify-center py-4 text-lg mt-2 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Signing in...' : 'Sign in to account'}</span>
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-wellness-primary hover:text-wellness-primary-hover transition-colors font-semibold">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
