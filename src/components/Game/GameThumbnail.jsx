import Image from "next/image";
import Link from "next/link";

const cardStyle = {
  background: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  height: '100%',
  width: 'min(100%,200px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em'
}

const imgPlaceholeStyle = {
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

const imgStyle = {
  width: '100%',
  height: 'auto',
  display: 'block',
}

const contentStyle = {
  padding: '0.3rem',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
}

const titleStyle = {
  marginBottom: '0.5rem',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}

const linkStyle = {
  color: '#007bff',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'flex-end'
}

export default function GameThumbnail({ title, imgSrc, link }) {
  return (
    <div style={cardStyle}>
      <div style={imgPlaceholeStyle}>
        <Image src={imgSrc} alt="hidden objects game image thumbnail"
          width={200} height={120} priority
          style={imgStyle} />
      </div>
      <div style={contentStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <Link href={link} style={linkStyle}>
          Play Game <span style={{ marginLeft: '0.5rem' }}>→</span>
        </Link>
      </div>
    </div>
  )
}