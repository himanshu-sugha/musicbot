import React from 'react';
import { Button } from './shared/Button';
import { Send, Share2 } from 'lucide-react';
import { getTelegramBotLink, getTelegramShareLink } from '../config/telegram';

export function CTASection() {
  return (
    <div className="bg-purple-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Battle?</h2>
        <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
          Join thousands of music enthusiasts already battling on Telegram with TuneChain Bot.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            href={getTelegramBotLink()}
            className="bg-white text-purple-900 hover:bg-purple-100"
            icon={Send}
          >
            Launch Bot
          </Button>
          <Button 
            href={getTelegramShareLink()}
            className="border-2 border-white hover:bg-purple-800"
            icon={Share2}
          >
            Invite Friends
          </Button>
        </div>
      </div>
    </div>
  );
}