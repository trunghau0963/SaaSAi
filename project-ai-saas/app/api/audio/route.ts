import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { prompt } = await req.json();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 });
    }
    if (!replicate.auth) {
      return new NextResponse("Missing api key", { status: 500 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json(response);
  } catch (err) {
    return new NextResponse("Sthg went wrong", { status: 500 });
  }
};
