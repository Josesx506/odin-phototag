'use client';

import GameThumbnail from '@/components/Game/GameThumbnail';
import { GameThumbnailSkeleton } from '@/components/Skeletons';
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const containerStyle = {
  display: 'flex',
  gap: '0.8em',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function LandingPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/game', { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setGames(data.imgs);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          toast.error(err.message);
        }
      })

    return () => { controller.abort() };
  }, [])

  return (
    <div style={containerStyle}>
      {loading ? GameThumbnailSkeleton({cards:3}) :
        games.map((game) => {
          return (
            <GameThumbnail key={game._id} title={game.title} 
              imgSrc={game.url} link={`/${game._id}`} />
          )
        })}
    </div>
  )
}
