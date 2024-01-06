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
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
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
