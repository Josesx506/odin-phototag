import { connectMongoose } from "@/lib/db";
import LeaderBoard from "@/models/LeaderBoard";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoose();

    // Get leaderboard names excluding the entries and sorted by ascending titles
    const boards = await LeaderBoard.find().sort({ title: 1 }).select('-entries');

    if (!boards || boards.length === 0) {

      return NextResponse.json({
        status: 'error',
        message: 'No leaderboards found',
      }, { status: 404 });

    } else {

      return NextResponse.json({
        status: 'success',
        boards
      }, { status: 200 });
    }

  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}