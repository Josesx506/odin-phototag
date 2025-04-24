import { connectMongoose } from "@/lib/db";
import Image from "@/models/Image";
import { NextResponse } from "next/server";


function isWithinBox(clickX, clickY, box) {
  return (
    clickX >= box.left &&
    clickX <= box.left + box.width &&
    clickY >= box.top &&
    clickY <= box.top + box.height
  );
}

export async function GET(req, { params }) {
  const { gameId } = await params;

  const searchParams = req.nextUrl.searchParams;
  const targetName = searchParams.get("target");
  const xcrd = parseFloat(searchParams.get("xcrd"));
  const ycrd = parseFloat(searchParams.get("ycrd"));

  try {
    await connectMongoose();

    const game = await Image.findById(gameId);

    if (!game) {
      return NextResponse.json({  status: 'error', message: 'No game found',}, { status: 404 });
    } 

    // Check if the target name exists for this game
    const target = game.targets.find(t => t.name === targetName);
    if (!target) {
      return NextResponse.json({ status: 'error', message: 'Target not found' }, { status: 404 });
    }

    // Check clicked point is inside the box
    const match = target.boundingBoxes.some(box => 
      isWithinBox(xcrd, ycrd, box)
    );

    if (match) {
      return NextResponse.json({ 
        status: 'success', message: `You found ${targetName}`, boundingBox: target.boundingBoxes[0] 
      }, { status: 200 });
    } else {
      return NextResponse.json({ status: 'failure', message: `${targetName}'s not here` }, { status: 200 });
    }

  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}

