const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");

// Environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
const juneKey = process.env.JUNE_AI_API_KEY;

// Start bot
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    const res = await fetch("https://api.june.ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${juneKey}`
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await res.json();

    bot.sendMessage(chatId, data.reply || "No response from AI");
  } catch (err) {
    console.log(err);
    bot.sendMessage(chatId, "Error connecting AI 😢");
  }
});
