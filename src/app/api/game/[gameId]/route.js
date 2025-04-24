import { connectMongoose } from "@/lib/db";
import Image from "@/models/Image";
import { NextResponse } from "next/server";
 
export async function GET(req, { params }) {
  const urlParams = (await params);
  const { gameId } = urlParams;

  try {
    await connectMongoose();

    const game = await Image.findById(gameId).select('-targets.boundingBoxes');
    
    if (!game) {

      return NextResponse.json({
        status: 'error',
        message: 'No game found',
      }, { status: 404 });

    } else {

      return NextResponse.json({
        status: 'success',
        gameId, game
      }, { status: 200 });
    }

  } catch(err) {
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}