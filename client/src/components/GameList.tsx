import React from 'react';
import type { GamePost } from '../types';
import { GameCard } from './GameCard';

interface GameListProps {
  posts: GamePost[];
  onHover?: (gameId: string | null) => void;
  onClick?: (game: GamePost) => void;
}

export const GameList: React.FC<GameListProps> = ({ posts, onHover, onClick }) => {
  if (posts.length === 0) {
    return <div className="text-center text-muted mt-8">No games found matching your criteria.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <div key={post.id} className="reveal-on-scroll">
          <GameCard 
            game={post as any} 
            onMouseEnter={() => onHover && onHover(post.id)}
            onMouseLeave={() => onHover && onHover(null)}
            onClick={() => onClick && onClick(post as any)}
          />
        </div>
      ))}
    </div>
  );
};
