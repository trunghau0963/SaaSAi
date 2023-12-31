// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const POST = async (req: Request) => {
  try {
    // const { userId } = auth();
    const { prompt } = await req.json();
    // if (!userId) {
    //   return new NextResponse("unauthorized", { status: 401 });
    // }
    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 });
    }
    if (!replicate.auth) {
      return new NextResponse("Missing api key", { status: 500 });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },  
      }
    );

    return NextResponse.json(response);
  } catch (err) {
    return new NextResponse("Sthg went wrong", { status: 500 });
  }
};
