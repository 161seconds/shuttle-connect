import React from 'react';
import type { GamePost } from '../types';
import { GameCard } from './GameCard';

interface GameListProps {
  posts: GamePost[];
}

export const GameList: React.FC<GameListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <div className="text-center text-muted mt-8">No games found matching your criteria.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <GameCard key={post.id} game={post as any} />
      ))}
    </div>
  );
};
