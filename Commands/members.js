module.exports = {
  name: 'members',
  description: 'How many members are there in the server',
  execute(message, args) {
    var members = message.guild.members.cache.filter((member) => !member.user.bot).size;
    var members_and_bots = message.guild.members.cache.size;
    
    message.reply('There are ' + members_and_bots + ' members in the server, ' + (members_and_bots - members) + ' of which are bots');
  },
};
