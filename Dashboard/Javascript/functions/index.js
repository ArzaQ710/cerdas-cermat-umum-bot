const Telegraf = require('telegraf');
const functions = require('firebase-functions');

const bot = new Telegraf(functions.config().ccu_tbot.key);

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

exports.ccu_tbot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res);
})
