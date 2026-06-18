import React from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { Activity, Users, Map } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="layout-container py-8">
      {/* Hero Section */}
      <section className="text-center mb-16 mt-8">
        <h1 className="text-2xl font-bold mb-4" style={{ fontSize: '3rem', color: 'var(--primary)' }}>
          Find your next badminton drop-in game
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Easily discover nearby badminton games matching your skill level, time preference, and location. Or post your own game to find players!
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/explore" className="btn-primary text-lg px-8 py-3">Explore Games</Link>
          <Link to="/host" className="btn-outline text-lg px-8 py-3">Post a Game</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <StatCard title="Active Games Today" value="42" icon={<Activity size={32} />} />
        <StatCard title="Verified Hosts" value="150+" icon={<Users size={32} />} />
        <StatCard title="Courts Covered" value="28" icon={<Map size={32} />} />
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Why Shuttle Connect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-lg mb-2 text-primary">Map-based Search</h3>
            <p className="text-muted">Find games near you using our integrated VietMap feature. No more asking for directions!</p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2 text-primary">Skill-level Matching</h3>
            <p className="text-muted">Play with people at your level. From beginners to advanced players, find the right group.</p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2 text-primary">Facebook Import</h3>
            <p className="text-muted">Hosts can easily paste Facebook post text and let our parser fill in the details automatically.</p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2 text-primary">Host Verification</h3>
            <p className="text-muted">Play safely with verified hosts. Real players, real games.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
