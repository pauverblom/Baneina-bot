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
        return message.channel.send('Please enter an amount of time (in seconds)');
        let seconds = (args[1]);
        
        let time = seconds * 1000;

        let minutes = seconds / 60;
        let hours = minutes / 60;
        
        if (!time || time > 1209600) // Cap at 14 days, larger than 24.8 days causes integer overflow
        return message.channel.send('Please enter an amount of time smaller than 1209600');

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        var user = message.mentions.members.first();
        let role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
        user.roles.add(role);
        message.channel.send(`${user} has been muted for ${seconds} seconds, or ${minutes.toFixed(2)} minutes, or ${hours.toFixed(1)} hours lol.`);
        
        
        user.timeout = message.client.setTimeout(async () => {
          try {
            await user.roles.remove(role);
            message.channel.send(`${user} has been unmuted after ${seconds} seconds, or ${minutes.toFixed(2)} minutes, or ${hours.toFixed(1)} hours lol.`);
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
