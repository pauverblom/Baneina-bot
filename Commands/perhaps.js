const Discord = require('discord.js');
module.exports = {
  name: 'perhaps',
  description: 'send perhaps photo',
  execute(message, args) 
  {
    const embed = new Discord.MessageEmbed().setImage('https://postimg.cc/ctLh0kyF');
    message.channel.send(embed);
  },
};
