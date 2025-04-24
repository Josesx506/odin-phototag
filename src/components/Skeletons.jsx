import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardStyle = {
  background: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em'
}

const imgPlaceholderStyle = {
  width: '200px',
  height: '120px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#495057',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  overflow: 'hidden'
}

const contentStyle = {
  padding: '0.3rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
}


function GameThumbnailSkeleton({ cards }) {
  return (
    Array(cards).fill(null).map((item, index) => {
      return (
        <div key={index} style={cardStyle}>
          <div style={imgPlaceholderStyle}>
            <Skeleton />
          </div>
          <div style={contentStyle}>
            <h3><Skeleton /></h3>
          </div>
        </div>)
    })
  )
}

function GameProviderSkeleton() {
  return (
    <div style={{ display: 'grid', gap: '0.5em' }}>
      <div>
        <Skeleton height={'3em'} style={{ borderRadius: '0.5em' }} />
      </div>
      <div style={{ width: '100%', borderRadius: '0.5em', height: 'min(70vh,500px)' }}>
        <Skeleton style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

function LeaderBoardSkeleton({ count }) {
  const containerStyle = {
    display: 'flex',
    gap: '0.5em',
    flexDirection: 'column',
    width: 'min(100%, 400px)'
  }

  return (
    <div style={containerStyle}>
      {Array(count).fill(null).map((item, index) => {
        return <Skeleton key={index} style={{ width: '100%', height: '1.2rem', flex: 1, borderRadius: '0.5em' }} />
      })}
    </div>
  )
}

function LeaderBoardProviderSkeleton() {
  const pageStryle ={
    display: 'flex',
    gap: '1em',
    alignItems: 'center',
    flexDirection: 'column',
  }
  return (
    <div style={pageStryle}>
      <h2><Skeleton style={{flex: 1, width:'200px'}} /></h2>
      <LeaderBoardSkeleton count={10} />
    </div>
  )
}

export { 
  GameThumbnailSkeleton, GameProviderSkeleton, 
  LeaderBoardSkeleton, LeaderBoardProviderSkeleton 
}