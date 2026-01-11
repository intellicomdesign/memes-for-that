import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.x.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer xai-Ms8wi016e8pucPaW67xjNzLrA8rJPYrPDN6gpt9IeEl94pytGFMK0B5yJYC6SJwiL2N5Xu4DiEFkefrf`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'flux',
        prompt: prompt + ' in a funny viral meme style with bold text overlay',
        n: 1,
        size: '1024x1024'
      })
    });

    if (!response.ok) {
      throw new Error('API error: ' + response.statusText);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'error occured, you broke it retard';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
