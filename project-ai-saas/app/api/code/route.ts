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
      "meta/codellama-13b:cc618fca92404570b9c10d1a4fb5321f4faff54a514189751ee8d6543db64c8f",
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
