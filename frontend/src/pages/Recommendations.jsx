import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Brain, Moon, ShieldAlert, HeartPulse, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('/recommendations');
        setRecommendations(res.data.data);
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const getIconForRec = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('sleep') || lowerText.includes('bed')) return <Moon className="text-wellness-primary" size={28} />;
    if (lowerText.includes('stress') || lowerText.includes('meditation')) return <Brain className="text-rose-500" size={28} />;
    if (lowerText.includes('mood') || lowerText.includes('friend')) return <HeartPulse className="text-pink-500" size={28} />;
    return <Sparkles className="text-amber-500" size={28} />;
  };

  const getColorForRec = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('sleep')) return 'bg-wellness-hero-light border-wellness-hero';
    if (lowerText.includes('stress')) return 'bg-rose-50 border-rose-100';
    if (lowerText.includes('mood')) return 'bg-pink-50 border-pink-100';
    return 'bg-amber-50 border-amber-100';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-wellness-hero border-t-wellness-primary rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Analyzing your wellness data...</p>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto pb-32 sm:pb-8 animate-fade-in-up">
      
      {/* Hero Section */}
      <div className="relative glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] overflow-hidden mb-10 p-8 sm:p-12 border-none bg-wellness-primary text-white shadow-xl shadow-wellness-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-wellness-hero/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-wellness-hero-light text-sm font-medium mb-6">
              <Sparkles size={16} className="text-amber-300" />
              AI-Powered Insights
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">Your Personalized Insights</h1>
            <p className="text-wellness-hero-light text-lg max-w-xl leading-relaxed">
              Based on your recent mood, sleep, and stress logs, here are some tailored recommendations to improve your daily wellbeing.
            </p>
          </div>
          <div className="w-48 h-48 hidden md:block rounded-full bg-white/5 backdrop-blur-sm border-8 border-white/10 p-2 shadow-[0_0_60px_rgba(123,163,136,0.5)]">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" 
              alt="Meditation" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {recommendations.length === 0 ? (
          <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-12 text-center flex flex-col items-center">
            <ShieldAlert size={48} className="text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Not enough data yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Start logging your daily mood, sleep, and stress levels to unlock personalized recommendations from our engine.
            </p>
            <Link to="/track" className="btn-primary hover:shadow-wellness-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-95">Go to Mood Tracker</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getColorForRec(rec)} delay-${(idx+1)*100} opacity-0 animate-fade-in-up`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {getIconForRec(rec)}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Actionable Insight</h3>
                <p className="text-slate-600 leading-relaxed flex-1">
                  {rec}
                </p>
              </div>
            ))}

            {/* Premium Placeholder for generic tip */}
            <div className="flex flex-col p-8 rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
               <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                  <ExternalLink className="text-slate-400" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">General Wellness Tip</h3>
                <p className="text-slate-600 leading-relaxed flex-1">
                  Staying hydrated and taking frequent breaks during long periods of work can significantly improve mood and productivity.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
