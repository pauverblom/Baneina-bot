module.exports = {
  name: 'members',
  description: 'How many members are there in the server',
  execute(message, args) {
    var members = message.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    message.reply('There are ' + members + ' members in the server.');
  },
};
