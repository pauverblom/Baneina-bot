const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'send the avatar',
  execute(message, args) {
    if (!message.mentions.users.size) {
      const embed1 = new Discord.MessageEmbed().setImage(
        message.author.displayAvatarURL()
      );
      message.channel.send(embed1);
    } else {
      var user = message.mentions.users.first();
      const embed2 = new Discord.MessageEmbed()
      .setImage(user.displayAvatarURL()
      );
      message.channel.send(embed2);
    }
  }
};
