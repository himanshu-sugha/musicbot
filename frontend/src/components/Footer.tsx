import React from 'react';
import { Radio } from 'lucide-react';
import { getTelegramBotLink } from '../config/telegram';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Radio className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">TuneChain</span>
          </div>
          <div className="flex gap-6">
            <a href={getTelegramBotLink()} className="hover:text-white transition-colors">Bot</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} TuneChain. All rights reserved.
        </div>
      </div>
    </footer>
  );
}