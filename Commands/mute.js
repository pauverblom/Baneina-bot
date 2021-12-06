const Discord = require('discord.js');
module.exports = {
  name: 'mute',
  description: 'Mute someone you want to mute',
  execute(message, args) 
  {
    if (message.author.id == 405050037186330624) //me
    {
      if (!message.mentions.users.size)
      {
        message.send(`You need to mention someone in order to mute them`);
      }
      else
      {
        var user = message.mentions.users.first();
        let role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
        user.roles.add(role);
        message.channel.send(`${user} has been muted.`)
      }
    }
  },
};
