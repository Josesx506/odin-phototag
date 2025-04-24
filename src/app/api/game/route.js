import { connectMongoose } from "@/lib/db";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongoose();

    // Get images excluding target info in descending order
    const imgs = await Image.find().sort({ createdAt: -1 }).select('-targets');

    if (!imgs || imgs.length === 0) {

      return NextResponse.json({
        status: 'error',
        message: 'No games found',
      }, { status: 404 });

    } else {

      return NextResponse.json({
        status: 'success',
        imgs
      }, { status: 200 });
    }

  } catch (err) {
    // Return error response
    return NextResponse.json({
      status: 'error',
      message: err.message
    }, { status: 500 });
  }
}

export async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();
        
        const {
            title, url, width, height,
            t1Name, t1Url, t1BoundBox,
            t2Name, t2Url, t2BoundBox, } = body;

        await connectMongoose();

        if (
            !url || !t1Name || !t1Url || !t2Name || !t2Url ||
            !Array.isArray(t1BoundBox) || !Array.isArray(t2BoundBox)
        ) {
            return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
        }

        // Create and save new image
        const img = new Image({
            title: title,
            url: url,
            width: Number(width),
            height: Number(height),
            targets: [
                {
                    name: t1Name,
                    url: t1Url,
                    boundingBoxes: t1BoundBox
                },
                {
                    name: t2Name,
                    url: t2Url,
                    boundingBoxes: t2BoundBox
                }
            ]
        })
        await img.save();

        // Return success response
        return NextResponse.json({
            status: 'success',
            message: 'registered new image'
        }, { status: 200 });

    } catch (error) {
        console.error("Error registering new image:", error);

        // Return error response
        return NextResponse.json({
            status: 'error',
            message: error.message
        }, { status: 500 });
    }
}