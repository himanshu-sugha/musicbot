import React from 'react';
import { Trophy, Coins, Music, Users, Star, Zap } from 'lucide-react';
import { FeatureCard } from './shared/FeatureCard';

const features = [
  {
    icon: Trophy,
    title: 'Music Battles',
    description: 'Challenge friends to music duels and let the community vote for their favorite track',
  },
  {
    icon: Music,
    title: 'Share Music',
    description: 'Share your favorite tracks directly through Telegram and discover new music',
  },
  {
    icon: Users,
    title: 'Community Voting',
    description: 'Vote on battles, interact with other music lovers, and shape the rankings',
  },
  {
    icon: Star,
    title: 'Leaderboards',
    description: 'Climb the rankings and become a top music curator in the community',
  },
  {
    icon: Coins,
    title: 'Earn Points',
    description: 'Get points for participating in battles, voting, and sharing music',
  },
  {
    icon: Zap,
    title: 'Instant Battles',
    description: 'Start music battles instantly with anyone in your Telegram groups',
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
          Battle, Vote, Share & Earn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}