import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">About Shuttle Connect</h1>
      <div className="card text-muted flex flex-col gap-4">
        <p>
          Shuttle Connect is a platform built for the badminton community. 
          Finding a drop-in game used to mean endlessly scrolling through Facebook groups, 
          trying to figure out if there were still slots left, or where the court was located.
        </p>
        <p>
          We've built this tool to make finding and hosting games frictionless. 
          Search by skill level, see the courts on a map, and manage your game roster all in one place.
        </p>
        
        <h3 className="font-bold text-lg mt-4" style={{ color: 'var(--text)' }}>Policy Statement</h3>
        <p>
          To maintain user privacy and adhere to platform policies, Shuttle Connect <strong>does not scrape Facebook groups</strong>.
          We provide a manual import tool for hosts who wish to crosspost their games.
        </p>
      </div>
    </div>
  );
};
