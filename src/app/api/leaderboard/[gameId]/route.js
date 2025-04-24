import { connectMongoose } from "@/lib/db";
import LeaderBoard from "@/models/LeaderBoard";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const urlParams = (await params);
  const { gameId } = urlParams;

  try {
    await connectMongoose();

    // Get the leaderboard for the game and sort it by ascending time 
    const board = await LeaderBoard.findOne({ imageId: gameId });

    if (!board) {

      return NextResponse.json({
        status: 'error',
        message: 'No board found for this game',
      }, { status: 404 });

    } else {

      return NextResponse.json({
        status: 'success',
        gameId, board
      }, { status: 200 });
    }

  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}


export async function POST(req, { params }) {
  const urlParams = (await params);
  const { gameId } = urlParams;

  try {
    // Parse request body
    const body = await req.json();

    const { userName, userTime } = body;

    await connectMongoose();

    let leaderboard = await LeaderBoard.findOne({ imageId: gameId });

    if (!leaderboard) {
      // Check if the game exists for this id
      const game = await Image.findById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }

      // Initialize a new leaderboard with the game title and empty entries
      leaderboard = new LeaderBoard({
        imageId: game._id,
        title: game.title,
        entries: []
      });
    }
    // Add the new entry
    leaderboard.entries.push({
      name: userName,
      time: userTime
    });

    // Optional: Sort entries by time (fastest first)
    leaderboard.entries.sort((a, b) => a.time - b.time);

    await leaderboard.save();

    // Return success response
    return NextResponse.json({
      status: 'success',
      message: `Added to the leaderboard`
    }, { status: 200 });

  } catch (error) {
    console.error("Error adding new leaderboard entry", error);

    // Return error response
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}