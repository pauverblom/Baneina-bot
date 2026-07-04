module.exports = {
  name: 'members',
  description: 'How many members are there in the server',
  async execute(message, args) {
    try {
      await message.guild.members.fetch();
    } catch (error) {
      console.log("Could not fetch all members. Relying on cache and memberCount.");
    }

    var total = message.guild.memberCount;
    var bots = message.guild.members.cache.filter((member) => member.user.bot).size;

    message.reply('There are ' + total + ' members in the server, ' + bots + ' of which are bots');
  }
};
