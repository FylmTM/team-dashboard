const { RTMClient } = require('@slack/client');

const token = '';

const rtm = new RTMClient(token);
rtm.start();

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

rtm.on('message', message => {
  console.log(message);
  // For structure of `event`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if (
    (message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && message.user === rtm.activeUserId)
  ) {
    return;
  }

  // Log the message
  // console.log(message);
  // console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});

// The RTM client can send simple string messages
// rtm.sendMessage('Hello there', conversationId)
// .then((res) => {
//   `res` contains information about the posted message
// console.log('Message sent: ', res.ts);
// })
// .catch(console.error);
