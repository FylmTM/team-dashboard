const executeCommand = require('./util/executeCommand');

function shelly(bot, message) {
  console.log(`Message received: ${message.text}`);
  bot.replyAndUpdate(
    message,
    {
      attachments: [
        {
          text: 'Command execution in progress...',
          color: '#738694',
        },
      ],
    },
    (error, src, updateResponse) => {
      if (error) console.error(error);

      executeCommand(`${process.execPath} src/program.js ${message.text}`)
        .then(result => {
          console.log(`Message response: ${result}`);
          updateResponse(
            {
              attachments: [
                {
                  text: '```' + result.trim() + '```',
                  color: '#0d8050',
                },
              ],
            },
            function(err) {
              console.error(err);
            }
          );
        })
        .catch(error => {
          console.log(`Message error: ${error}`);
          updateResponse(
            {
              attachments: [
                {
                  text:
                    '```' + error.stdout.trim() + error.stderr.trim() + '```',
                  color: '#c23030',
                },
              ],
            },
            function(err) {
              console.error(err);
            }
          );
        });
    }
  );
}

module.exports = shelly;
