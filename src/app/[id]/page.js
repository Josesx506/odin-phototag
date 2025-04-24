import GameProvider from "@/components/Game/GameProvider";

export default async function page({ params }) {
  const { id } = await params;
  const gameContainerStyle = {
    display: 'block',
    width: '99%',
    padding: '0.1em',
    margin: '0 auto',
  }

  return (
    <div style={gameContainerStyle}>
      <GameProvider id={id} />
    </div>
  );
}
