import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Sparkles, Moon, Activity, Smile, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [moodHistory, setMoodHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [moodRes, recRes] = await Promise.all([
          axios.get('/moods'),
          axios.get('/recommendations')
        ]);
        
        // Format dates for charts (take last 7 days for better visualization)
        const rawMoods = moodRes.data.data.slice(-7);
        const formattedMoods = rawMoods.map(m => ({
          ...m,
          displayDate: new Date(m.date).toLocaleDateString('en-US', { weekday: 'short' })
        }));
        
        setMoodHistory(formattedMoods);
        setRecommendations(recRes.data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-wellness-hero border-t-wellness-primary rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading your wellness journey...</p>
      </div>
    );
  }

  const getRecentMood = () => {
    if (moodHistory.length === 0) return null;
    return moodHistory[moodHistory.length - 1];
  };

  const recent = getRecentMood();

  return (
    <div className="py-8 space-y-8 pb-32 sm:pb-12 animate-fade-in">
      
      {/* Hero Header Area */}
      <div className="relative overflow-hidden rounded-3xl bg-wellness-primary p-8 sm:p-12 shadow-xl shadow-wellness-primary/20 text-white mb-2">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-wellness-hero/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-wellness-hero-light text-lg leading-relaxed">
              Your dedication to wellness is inspiring. Let's see how you're feeling today.
            </p>
          </div>
          <Link to="/track" className="px-6 py-3.5 bg-white text-wellness-text font-bold rounded-2xl shadow-lg hover:bg-wellness-background hover:scale-105 transition-all w-full md:w-auto text-center flex items-center justify-center gap-2">
            Log Today's Mood <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {moodHistory.length === 0 ? (
        <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-12 text-center text-slate-500 flex flex-col items-center shadow-xl border-dashed border-2 border-wellness-primary-light bg-white/50">
          <Activity size={56} className="text-wellness-primary-light mb-6" />
          <h3 className="text-2xl font-bold text-slate-700 mb-3">Your Journey Begins Here</h3>
          <p className="max-w-md mx-auto mb-8 text-lg">Start tracking your daily mood, sleep, and stress to unlock AI-powered insights, beautiful charts, and personalized recommendations.</p>
          <Link to="/track" className="btn-primary hover:-translate-y-1 active:translate-y-0 active:scale-95 text-xl px-8 py-4">Make Your First Entry</Link>
        </div>
      ) : (
        <>
          {/* Top Recommendations Highlight */}
          {recommendations.length > 0 && (
            <Link to="/recommendations" className="block w-full">
              <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-6 border border-wellness-hero hover:border-wellness-primary-light bg-gradient-to-r from-white/80 to-wellness-hero/20 cursor-pointer relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-2 bg-wellness-primary"></div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-wellness-hero flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="text-wellness-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-1 flex justify-between items-center">
                      Daily AI Insight
                      <ArrowRight size={20} className="text-wellness-primary opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 transition-all" />
                    </h2>
                    <p className="text-slate-600 font-medium leading-relaxed line-clamp-2 md:line-clamp-none pr-8">{recommendations[0]}</p>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card hover:shadow-md hover:border-slate-200 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-wellness-hero blur-2xl group-hover:bg-wellness-hero-light transition-all duration-500"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-wellness-primary to-wellness-primary-hover text-white rounded-2xl flex items-center justify-center shadow-lg shadow-wellness-primary/20 group-hover:scale-110 transition-transform">
                  <Moon size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Latest Sleep</p>
                  <p className="text-3xl font-extrabold text-slate-900">{recent?.sleepHours} <span className="text-lg font-medium text-slate-400">hrs</span></p>
                </div>
              </div>
            </div>

            <div className="stat-card hover:shadow-md hover:border-slate-200 group relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-50 rounded-full blur-2xl group-hover:bg-rose-100/80 transition-all duration-500"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                  <Activity size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Latest Stress</p>
                  <p className="text-3xl font-extrabold text-slate-900">{recent?.stressLevel}<span className="text-lg font-medium text-slate-400">/10</span></p>
                </div>
              </div>
            </div>

            <div className="stat-card hover:shadow-md hover:border-slate-200 group relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100/80 transition-all duration-500"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Smile size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Latest Mood</p>
                  <p className="text-3xl font-extrabold text-slate-900">{recent?.moodScore}<span className="text-lg font-medium text-slate-400">/10</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-6 sm:p-8 flex flex-col">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Mood vs Stress</h3>
                  <p className="text-sm text-slate-500 mt-1">Your 7-day progression</p>
                </div>
                <div className="flex gap-4 text-xs font-bold text-slate-500 mb-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-wellness-primary"></span> Mood</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Stress</span>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodHistory} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7BA388" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7BA388" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', fontWeight: 'bold'}} 
                    />
                    <Area type="monotone" dataKey="moodScore" stroke="#7BA388" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                    <Area type="monotone" dataKey="stressLevel" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.08)] p-6 sm:p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">Sleep Duration</h3>
                <p className="text-sm text-slate-500 mt-1">Hours slept per night</p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodHistory} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis domain={[0, 'dataMax + 2']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}} 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold'}} 
                    />
                    <Bar dataKey="sleepHours" name="Sleep Logged" radius={[8, 8, 8, 8]} barSize={40}>
                      {
                        moodHistory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.sleepHours >= user?.baseSleepTarget ? '#7BA388' : '#D1E2D3'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
