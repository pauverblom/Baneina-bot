const Discord = require('discord.js');
module.exports = {
  name: 'mute',
  description: 'Mute someone you want to mute',
  async execute (client, message, args)
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
        return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');
        let time = ms(args[1]);
        if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
        return message.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`None Provided`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        var user = message.mentions.members.first();
        let role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
        user.roles.add(role);
        message.channel.send(`${user} has been muted indefinitely.`)
        
        
        user.timeout = message.client.setTimeout(async () => {
          try {
            await user.roles.remove(role);
            message.channel.send(`${user} has been unmuted`);
          } catch (err) {
              console.log(err)
              return message.channel.send('Please check the role hierarchy', err.message);
           }
        }, time);
      }
    }
  },
};
