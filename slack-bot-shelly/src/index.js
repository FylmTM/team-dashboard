require('dotenv').config();

const Botkit = require('botkit');
const shelly = require('./shelly');

const controller = Botkit.slackbot();
const bot = controller.spawn({
  token: process.env.TOKEN,
});

bot.startRTM(function(err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.on(['direct_message', 'direct_mention'], shelly);

process.on('exit', function() {
  bot.closeRTM();
});
