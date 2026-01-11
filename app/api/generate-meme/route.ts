import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing XAI_API_KEY environment variable');
    }

    const response = await fetch('https://api.x.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({
  model: 'grok-2-image',
  prompt: prompt + ' in a funny viral meme style with bold text overlay',
  n: 1
})
      })
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get raw error from xAI
      throw new Error(`xAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('API route error:', error); // Logs to Vercel Runtime Logs
    const errorMessage = error.message || 'error occured, you broke it retard';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
