const executeCommand = require('./executeCommand');

function shelly(bot, message) {
  console.log(`Message received: ${message.text}`);
  executeCommand(message.text)
    .then(result => {
      console.log(`Message response: ${result}`);
      bot.reply(message, {
        attachments: [
          {
            text: '```' + result.trim() + '```',
            color: '#0d8050',
          },
        ],
      });
    })
    .catch(error => {
      console.log(`Message error: ${error}`);
      bot.reply(message, {
        attachments: [
          {
            text: '```' + error.stdout.trim() + error.stderr.trim() + '```',
            color: '#c23030',
          },
        ],
      });
    });
}

module.exports = shelly;
