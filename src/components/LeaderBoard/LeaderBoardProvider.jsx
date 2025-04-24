'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import { LeaderBoardProviderSkeleton } from '../Skeletons';
import { formatTime } from '../utils';
import styles from '@/style/leaderboard.module.css'

export default function LeaderBoardProvider({ id }) {

  const [loading, setLoading] = useState(true);
  const [boardData, setBoardData] = useState();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/leaderboard/${id}`, { signal: controller.signal })
      .then((resp) => resp.json())
      .then((data) => {
        setBoardData(data.board);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          toast.error(err.message);
        }
      })

    return () => { controller.abort() };
  }, [id])

  return (
    loading ? <LeaderBoardProviderSkeleton /> :
    <div style={{width:'95%', margin: '0 auto'}}>
      {boardData ?
        <div className={styles.mainContainer}>
          <h3>{boardData.title} Leaderboard</h3>
          <div className={styles.entriesContainer}>
            {boardData.entries.map((entry,idx)=>(
              <div key={idx} className={styles.entryLine}>
                <div>{idx+1}.</div>
                <span>{entry.name}</span>
                <div>{formatTime(entry.time)}</div>
              </div>
            ))}
          </div>
        </div> :
        <h3 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
          No leaderboard data available for this id
        </h3>
      }
    </div>
  )
}
