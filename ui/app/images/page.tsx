'use client';

import { cn } from '@/lib/utils';
import { ImageIcon, Loader2, SendHorizontal, Upload } from 'lucide-react';
import { useState } from 'react';

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 lg:p-8">
      <div className="flex items-center mb-8">
        <ImageIcon className="w-8 h-8 mr-3" />
        <h1 className="text-2xl font-semibold">Image Generation</h1>
      </div>

      <div className="flex flex-col space-y-6">
        {/* Input Section */}
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full p-4 text-sm bg-transparent border rounded-xl border-light-200 dark:border-dark-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
            <button
              onClick={generateImage}
              disabled={loading || !prompt.trim()}
              className={cn(
                "absolute bottom-4 right-4 p-2 rounded-lg transition-colors",
                prompt.trim()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400",
              )}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SendHorizontal className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Generated Image Display */}
        {generatedImage && (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={generatedImage}
              alt="Generated"
              className="max-w-full rounded-lg shadow-lg"
            />
            <a
              href={generatedImage}
              download
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Download Image</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
