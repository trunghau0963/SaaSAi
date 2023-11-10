// import OpenAI from "openai";
// import { NextResponse } from "next/server";
// import { OpenAIStream, StreamingTextResponse } from "ai";
// import { auth } from "@clerk/nextjs";

// const configuration = {
//   apiKey: process.env.OPENAI_API_KEY!,
// };

// const openai = new OpenAI(configuration);

// // export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const { messages } = await req.json();

//     if (!userId) {
//       return new NextResponse("unauthorized", { status: 401 });
//     } else if (!configuration.apiKey) {
//       return new NextResponse("Missing api key", { status: 500 });
//     } else if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       stream: true,
//       messages,
//     });
//     const stream = OpenAIStream(response);
//     console.log('sucessfully created');
//     return new StreamingTextResponse(stream);
//   } catch (err) {
//     if (err instanceof OpenAI.APIError) {
//       console.log('openai error');
//       const { name, status, headers, message } = err;
//       return NextResponse.json({ name, status, headers, message });
//     } else {
//       throw err;
//     }
//   }
// }

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
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
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
