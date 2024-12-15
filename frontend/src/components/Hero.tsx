import React from 'react';
import { ExternalLink, Radio, Send } from 'lucide-react';
import { Button } from './shared/Button';
import { getTelegramBotLink, getTelegramShareLink } from '../config/telegram';

export function Hero() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-32">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Radio className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          TuneChain Bot
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Join the Ultimate Music Battle Experience on Telegram! 
          Challenge friends, discover new tracks, and earn rewards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            href={getTelegramBotLink()} 
            icon={Send}
          >
            Start Bot on Telegram
          </Button>
          <Button 
            href={getTelegramShareLink()} 
            variant="secondary" 
            icon={ExternalLink}
          >
            Share with Friends
          </Button>
        </div>
      </div>
    </div>
  );
}