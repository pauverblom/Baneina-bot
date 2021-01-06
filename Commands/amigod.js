module.exports = {
  name: 'amigod',
  description: 'Are you?',
  execute(message, args) {
    var highestrole = message.member.roles.highest.name;
    if (highestrole === 'Baneina') {
      message.reply('Yes, you are, my lord');
    } else {
      message.reply("Nahh, bro. You're a loser.");
    }
  },
};
