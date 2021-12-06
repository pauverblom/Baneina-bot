const Discord = require('discord.js');
module.exports = {
  name: 'mute',
  description: 'Mute someone you want to mute',
  async execute (message, args)
  {
    if (message.author.id == 405050037186330624) //me
    {
      if (!message.mentions.members.size)
      {
        message.channel.send(`You need to mention someone in order to mute them`);
      }
      else
      {
        if (!args[1])
        return message.channel.send('Please enter an amount of time');
        let time = (args[1]);
        if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
        return message.channel.send('Please enter an amount of time smaller than 1209600000');

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        var user = message.mentions.members.first();
        let role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
        user.roles.add(role);
        message.channel.send(`${user} has been muted for ${(time / 1000)} seconds, or ${(time / 60000)} minutes, or ${(time / 3600000)} hours lol.`);
        
        
        user.timeout = message.client.setTimeout(async () => {
          try {
            await user.roles.remove(role);
            message.channel.send(`${user} has been unmuted after ${(time / 1000)} seconds, or ${(time / 60000)} minutes, or ${(time / 3600000)} hours lol.`);
          } catch (err) {
              console.log(err)
              return message.channel.send('Please check the role hierarchy', err.message);
           }
        }, time);
      }
    }
    else
    {
      message.channel.send('You cannot mute lol');
    }
  },
};
