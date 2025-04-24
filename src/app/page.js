import styles from "./page.module.css";
import Link from "next/link";
import LandingPage from "@/components/HomePage";

export default function Home() {
  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5em',
  }

  return (
    <div>
      <main style={container}>
        <h2>Hidden Phøtø Tag</h2>
        <LandingPage />
        <div style={{display:'flex', gap:"1em"}}>
          <Link style={{textDecoration:'underline'}} href={'./addImage'}>Create New Game</Link>
          {/* <Link style={{textDecoration:'underline'}} href={'./leaderboard'}>Leader Board</Link> */}
        </div>
      </main>
    </div>
  );
}
