'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { LeaderBoardSkeleton } from "../Skeletons";

const pageStyle = {
  display: 'flex',
  gap: '1em',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}

const containerStyle = {
  display: 'flex',
  gap: '0.5em',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column'
}

export default function LeaderBoardPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/leaderboard', { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setBoards(data.boards || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          toast.error(err.message);
        }
      })
    return () => { controller.abort() };
  }, [])

  if (loading) {
    return (
      <div style={pageStyle}>
        <h2 style={{ textAlign: 'center' }}>Game Leaderboards</h2>
        <LeaderBoardSkeleton count={5} />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={{ textAlign: 'center' }}>Game Leaderboards</h2>
      <div style={containerStyle}>
        {boards.length > 0 ?
          boards.map((board) => {
            return (
            <Link style={{textDecoration:'underline'}} key={board._id} href={`/leaderboard/${board.imageId}`}>
              {board.title}
            </Link>
            )
          }) :
          <p style={{ textAlign: 'center' }}>No leaderboards available yet.</p>
        }
      </div>
    </div>
  )
}
