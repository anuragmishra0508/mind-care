import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

const ComingSoon = ({ title = "Feature Coming Soon" }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-wellness-hero blur-3xl opacity-60 rounded-full animate-pulse-slow"></div>
        <img
          src="https://plus.unsplash.com/premium_photo-1773734505118-40aea13597b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fGNoYXRib3QlMjBhaXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Coming Soon Workspace"
        />
        <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-lg z-20">
          <Sparkles className="text-wellness-primary" size={32} />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-wellness-text to-wellness-primary mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-lg text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        Under construction 🚧, launching soon with the next major update! ⚡"
      </p>

      <Link to="/" className="btn-secondary hover:bg-wellness-hero-light hover:border-wellness-primary-light hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2 group shadow-md hover:shadow-lg">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Return to Dashboard
      </Link>
    </div>
  );
};

export default ComingSoon;
