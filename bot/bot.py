from curses.ascii import EOT
import logging
from telegram import Update # type: ignore
from telegram.ext import Application, CommandHandler, ContextTypes # type: ignore
import requests # type: ignore

# Enable logging
logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)

# Your Telegram bot's token
BOT_TOKEN = "7689242404:AAHilWajjtm115yoKa6druY73wh0NDjDomc"

# Define the start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Welcome to TuneChain Bot! 🎵 Type /help to see available commands.")

# Define the help command
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "/start - Start the bot\n"
        "/help - List available commands\n"
        "/startbattle - Start a music battle\n"
        "/votetrack - Vote for a track"
    )

# Define the start battle command
async def start_battle(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    response = requests.post('http://127.0.0.1:5000/startbattle')  # Call the backend API
    battle_info = response.json()

    battle_message = (
        f"{battle_info['message']}\n"
        f"1️⃣ {battle_info['track1']}\n"
        f"2️⃣ {battle_info['track2']}\n"
        "Vote using /votetrack <track number>"
    )

    await update.message.reply_text(battle_message)

# Define the vote track command
async def vote_track(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) != 1:
        await update.message.reply_text("Please vote using: /votetrack <track number>")
        return

    try:
        track_number = int(context.args[0])
        if track_number in [1, 2]:
            await update.message.reply_text(f"Thank you for voting for Track {track_number}!")
        else:
            await update.message.reply_text("Invalid track number. Please vote for 1 or 2.")
    except ValueError:
        await update.message.reply_text("Invalid input. Please use a number (1 or 2).")

# Main function to run the bot
def main():
    application = Application.builder().token(BOT_TOKEN).build()

    # Register commands
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("startbattle", start_battle))
    application.add_handler(CommandHandler("votetrack", vote_track))

    # Start the bot
    application.run_polling()

if __name__ == "__main__":
    main()
EOT