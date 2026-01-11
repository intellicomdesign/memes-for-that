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
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  model: 'grok-2-image', // or whatever model you end up using
  prompt: prompt + `, extremely vulgar, savage dark humor, politically incorrect, offensive, profane as fuck, no censorship, brutally funny, shock value high, meme style with huge bold white text overlay and black outline, high contrast, absurd and ridiculous, Gen Z/4chan energy, no safe for work shit, make it as mean and hilarious as possible`,
  n: 1
})
      })
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get real xAI error message
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
