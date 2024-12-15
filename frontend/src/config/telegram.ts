// Telegram bot username

// Telegram deep linking
export const getTelegramBotLink = () => `https://t.me/musicsonorousbot`;
export const getTelegramShareLink = () => `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent('Join TuneChain Bot - The Ultimate Music Battle Experience! 🎵')}`;