import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SmilePlus, CheckCircle2, TrendingUp, Moon, Activity } from 'lucide-react';

const MoodTracker = () => {
  const [formData, setFormData] = useState({
    moodScore: 5,
    sleepHours: 8,
    stressLevel: 5,
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('/moods', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit entry');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-fade-in-up">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100/50">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Entry Saved successfully!</h2>
        <p className="text-slate-500">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-6xl mx-auto pb-32 sm:pb-12 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Form Side */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wellness-primary shadow-lg mb-4">
              <SmilePlus className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Daily Check-In</h1>
            <p className="text-slate-500 mt-2 text-lg">Log your feeling, sleep, and stress to unlock insights</p>
          </div>

          <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-6 sm:p-10 border-t-4 border-t-wellness-primary shadow-xl relative overflow-hidden">
             {/* Decorative blur */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-wellness-hero/70 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              {/* Mood Score */}
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-wellness-primary/20 focus-within:border-wellness-primary-light">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-wellness-primary" size={20} />
                    <label className="text-base font-bold text-slate-800">Overall Mood</label>
                  </div>
                  <span className="px-4 py-1.5 bg-wellness-hero-light text-wellness-primary-hover rounded-full text-sm font-bold shadow-inner">{formData.moodScore} / 10</span>
                </div>
                <input 
                  type="range" 
                  name="moodScore" 
                  min="1" max="10" 
                  value={formData.moodScore} 
                  onChange={handleChange} 
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-wellness-primary focus:outline-none focus:ring-4 focus:ring-wellness-primary/20" 
                />
                <div className="flex justify-between text-xs font-semibold text-slate-400 mt-3 px-1">
                  <span>Terrible</span>
                  <span>Okay</span>
                  <span>Amazing</span>
                </div>
              </div>

              {/* Stress Level */}
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:ring-2 focus-within:ring-rose-100 focus-within:border-rose-300">
                 <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="text-rose-500" size={20} />
                    <label className="text-base font-bold text-slate-800">Stress Level</label>
                  </div>
                  <span className="px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm font-bold shadow-inner">{formData.stressLevel} / 10</span>
                </div>
                <input 
                  type="range" 
                  name="stressLevel" 
                  min="1" max="10" 
                  value={formData.stressLevel} 
                  onChange={handleChange} 
                   className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-400/20" 
                />
                 <div className="flex justify-between text-xs font-semibold text-slate-400 mt-3 px-1">
                  <span>Completely Relaxed</span>
                  <span>Extremely Tense</span>
                </div>
              </div>

              {/* Sleep Duration */}
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:border-wellness-primary-light flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Moon className="text-wellness-primary" size={20} />
                    <label className="text-base font-bold text-slate-800">Sleep Duration</label>
                  </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    name="sleepHours" 
                    min="0" max="24" step="0.5"
                    value={formData.sleepHours} 
                    onChange={handleChange} 
                    className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-bold text-slate-700 outline-none focus:border-wellness-primary-light focus:bg-white transition-colors" 
                  />
                  <span className="text-slate-500 font-semibold tracking-wide">hrs</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3 ml-1">Notes (Optional)</label>
                <textarea 
                  name="notes" 
                  rows="3" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  placeholder="Any context about today? What went well or poorly?" 
                  className="input-field focus:bg-white focus:ring-4 focus:ring-wellness-primary/20 focus:border-wellness-primary resize-none leading-relaxed shadow-sm bg-white" 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full btn-primary hover:shadow-wellness-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 py-4 text-lg font-bold"
                >
                  {loading ? 'Saving Entry...' : 'Complete Daily Check-in'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Info Side (Hidden on small) */}
        <div className="hidden lg:flex flex-col w-[350px] space-y-6">
          <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-6 border-l-4 border-amber-400 bg-amber-50/50">
            <h3 className="font-bold text-slate-800 mb-2">Why tracking helps</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Consistently tracking your mood, sleep, and stress allows our AI to find hidden patterns in your lifestyle and generate highly personalized recommendations that improve your mental wellbeing.
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] relative">
            <div className="absolute inset-0 bg-wellness-primary/20 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" 
              alt="Relaxation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
