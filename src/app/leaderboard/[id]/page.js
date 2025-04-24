import React from 'react'
import LeaderBoardProvider from '@/components/LeaderBoard/LeaderBoardProvider';

export default async function page({ params }) {
  const { id } = await params;
  return (
    <LeaderBoardProvider id={id} />
  )
}
