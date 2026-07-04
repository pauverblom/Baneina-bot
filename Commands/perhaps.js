const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: 'perhaps',
  description: 'send perhaps photo',
  execute(message, args)
  {
    const embed = new EmbedBuilder().setImage('https://i.postimg.cc/Gtk5P6Mn/perhaps.jpg');
    message.channel.send({ embeds: [embed] });
  }
};
