module.exports = {
  name: 'unmute',
  description: 'Unmute someone you want to mute (this will probably conflict with mute but who cares)',
  async execute (message, args)
  {
    let admin_role = message.guild.roles.cache.find((role) => role.id == 759034196235911210);
    if (message.member.roles.highest.position >= admin_role.position) //admin
    {
      if (!message.mentions.members.size)
      {
        message.channel.send(`You need to mention someone in order to unmute them`);
      }
      else
      {

        var user = message.mentions.members.first();
        let role = message.guild.roles.cache.find((role) => role.id == 917521104908742736);
        user.roles.remove(role);
        message.channel.send(`${user} has been unmuted`);
      }
    }
    else
    {
      message.channel.send('You cannot unmute lol');
    }
  },
};
