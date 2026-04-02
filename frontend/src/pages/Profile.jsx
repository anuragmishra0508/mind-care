import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { UserCircle, Shield, Download } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    baseSleepTarget: '',
    baseStressLevel: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        baseSleepTarget: user.baseSleepTarget || '',
        baseStressLevel: user.baseStressLevel || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await axios.put('/users/profile', formData);
      setUser(res.data.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8 pb-32 sm:pb-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and wellness targets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 rounded-full bg-wellness-hero flex items-center justify-center border-4 border-white shadow-md">
               <UserCircle className="text-wellness-primary" size={48} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <Shield size={14} /> Account Verified
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-slate-300">
             <h3 className="text-slate-800 font-semibold mb-2">Data Export</h3>
             <p className="text-sm text-slate-500 mb-4 leading-relaxed">You can download an archive of your mood and sleep entries.</p>
             <button className="btn-secondary w-full flex items-center justify-center gap-2 text-sm border-slate-200 shadow-none">
               <Download size={16} /> Export Data
             </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Personal Details</h2>
            
            {success && (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm mb-6 border border-emerald-100 flex items-center gap-2">
                <Shield size={18} /> Profile successfully updated!
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Display Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="input-field" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                  <input 
                    type="number" 
                    name="age" 
                    className="input-field" 
                    value={formData.age} 
                    onChange={handleChange} 
                  />
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Sleep Target (hrs)</label>
                  <input 
                    type="number" 
                    name="baseSleepTarget" 
                    className="input-field" 
                    value={formData.baseSleepTarget} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Perceived Average Stress Level (1-10)</label>
                 <input 
                    type="number" 
                    name="baseStressLevel" 
                    min="1" max="10"
                    className="input-field" 
                    value={formData.baseStressLevel} 
                    onChange={handleChange} 
                  />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button type="submit" disabled={loading} className="btn-primary sm:w-auto w-full px-8">
                  {loading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
