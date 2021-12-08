module.exports = {
  name: 'role',
  description: 'Gives your current role',
  execute(message, args) {
    if (message.mentions.members.size)
    {
      message.reply(`${message.mentions.members.first()} has the role: ${message.mentions.members.first().roles.highest.name}`);
    }
    else {
      {
        message.reply('Your current role is: ' + message.member.roles.highest.name);
      }
    }
  }
};
