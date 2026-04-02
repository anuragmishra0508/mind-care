import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { HeartPulse } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    baseSleepTarget: 8,
    baseStressLevel: 5,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sign up');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-8">
      <div className="max-w-5xl w-full glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-0 overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl animate-fade-in-up">
        
        {/* Right Side: Image */}
        <div className="md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-wellness-primary/30 mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-wellness-primary/90 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1000" 
            alt="Wellness Journey" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Begin your journey</h2>
            <p className="text-wellness-hero-light leading-relaxed">Start tracking your daily mood, sleep, and stress to unlock AI-powered recommendations tailored just for you.</p>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="md:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white/50 relative">
          
          <div className="absolute top-0 left-0 w-64 h-64 bg-wellness-hero/70 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 -z-10 animate-pulse-slow"></div>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wellness-primary shadow-xl shadow-wellness-primary/20 mb-6 relative group">
              <HeartPulse className="text-white relative z-10" size={28} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Takes less than a minute</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-3 animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" name="name" required className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary" placeholder="John Doe" value={formData.name} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input type="email" name="email" required className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input type="password" name="password" required minLength={6} className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
                <input type="number" name="age" required className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary" placeholder="25" value={formData.age} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Sleep (hrs)</label>
                <input type="number" name="baseSleepTarget" required className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary" placeholder="8" value={formData.baseSleepTarget} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary hover:shadow-wellness-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 py-4 text-lg mt-6 relative overflow-hidden group">
              <span className="relative z-10">{loading ? 'Creating account...' : 'Create Account'}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-wellness-primary hover:text-wellness-primary-hover transition-colors font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
