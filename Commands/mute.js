module.exports = {
  name: 'mute',
  description: 'Mute someone you want to mute',
  async execute (message, args)
  {
    let admin_role = message.guild.roles.cache.find(role => role.id == 759034196235911210);
    if (message.member.roles.highest.position >= admin_role.position) //admin
    {
      let muted_role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      if (!user)
        return message.channel.send(`You need to mention someone in order to mute them`);

      if (user === message.member)
        return message.channel.send('You cannot mute yourself');

      if (user === message.guild.me)
        return message.channel.send('You cannot mute me');

      if (user.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send('You cannot mute someone with an equal or higher role');

      if (!args[1])
        return message.channel.send('Please enter an amount of time (in seconds)')

      if (user.roles.highest === muted_role)
        return message.channel.send('Provided member is already muted');

      let seconds = (args[1]);
      let time = seconds * 1000;
      let minutes = seconds / 60;
      let hours = minutes / 60;

      if (!seconds || seconds > 1209600) // Cap at 14 days, larger than 24.8 days causes integer overflow
      return message.channel.send('Please enter an amount of time smaller than 1209600');

      let reason = args.slice(2).join(' ');
      if (!reason) reason = '`None Provided`';
      if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

      user.roles.add(muted_role);
      message.channel.send(`${user} has been muted for ${seconds} seconds, or ${minutes.toFixed(2)} minutes, or ${hours.toFixed(1)} hours lol.\n\nReason: ${reason}`);

      user.timeout = message.client.setTimeout(async () => {
        try {
          if (user.roles.highest === muted_role)
          {
            await user.roles.remove(muted_role);
            message.channel.send(`${user} has been unmuted after ${seconds} seconds, or ${minutes.toFixed(2)} minutes, or ${hours.toFixed(1)} hours lol.`);
          }
          } catch (err) {
              console.log(err)
              return message.channel.send('Please check the role hierarchy', err.message);
           }
        }, time);
      }
    else
    {
      message.channel.send('you cannot mute lol');
    }
  }
};
