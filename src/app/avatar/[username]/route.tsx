import { NextRequest, NextResponse } from "next/server";

interface Params {
  username: string;
}

interface Options {
  params: Params;
}

const API_KEY = process.env.MULTIAVATAR_API_KEY;

export async function GET(_: NextRequest, { params }: Options) {
  const image = await fetch(
    `https://api.multiavatar.com/${params.username}.png?apikey=${API_KEY}`
  ).then((res) => res.blob());
  return new NextResponse(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
