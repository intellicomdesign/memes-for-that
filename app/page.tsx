"use client";

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMeme = async () => {
    if (!prompt) {
      setError('Enter a prompt!');
      return;
    }

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const res = await fetch('/api/generate-meme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'error occured, you broke it retard';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px', 
      background: '#f9fafb', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#1a1a1a', fontSize: '2.5rem', marginBottom: '10px' }}>
        The Golden Age of Memes
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Generate a meme with Grok-powered AI!
      </p>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Cat judge ruling on fraud case"
        style={{
          width: '90%',
          maxWidth: '600px',
          padding: '15px',
          fontSize: '1.1rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}
      />

      <br />

      <button
        onClick={generateMeme}
        disabled={loading}
        style={{
          padding: '15px 30px',
          background: loading ? '#aaa' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        {loading ? 'Generating...' : 'Generate Meme'}
      </button>

      {loading && (
        <p style={{ color: '#666', marginTop: '15px' }}>
          Takes 10-30 seconds...
        </p>
      )}

      {error && (
        <p style={{ 
          color: 'red', 
          marginTop: '15px', 
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          {error}
        </p>
      )}

      {imageUrl && (
        <div style={{ marginTop: '40px' }}>
          <img
            src={imageUrl}
            alt="Generated Meme"
            style={{
              maxWidth: '100%',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}
          />
        </div>
      )}
    </div>
  );
}
