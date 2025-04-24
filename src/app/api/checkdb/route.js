import { connectMongoose } from "@/lib/db";

export async function GET(request) {
    const con = await connectMongoose();
    return new Response(JSON.stringify({status: 'mongo connection successfully'}),{
        status: 200
    });
}

