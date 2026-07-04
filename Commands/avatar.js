const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'send the avatar',
  execute(message, args) {
    if (!message.mentions.users.size) {
      const embed1 = new EmbedBuilder().setImage(
        message.author.displayAvatarURL()
      );
      message.channel.send({ embeds: [embed1] });
    } else {
      var user = message.mentions.users.first();
      const embed2 = new EmbedBuilder()
      .setImage(user.displayAvatarURL()
      );
      message.channel.send({ embeds: [embed2] });
    }
  }
};
