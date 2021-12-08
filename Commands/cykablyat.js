module.exports = {
  name: 'cykablyat',
  description: 'Russian meme, comrade',
  execute(message, args) {
    var number2 = 5;
    var random = Math.floor(Math.random() * 5) + 1;
    switch (random) {
      case 1:
        message.reply('Stay Cheeki Breeki Comrade');
        break;
      case 2:
        message.reply('https://www.youtube.com/watch?v=OUHVRWdVQCI');
        break;
      case 3:
        message.reply('https://www.youtube.com/watch?v=U06jlgpMtQs');
        break;
      case 4:
        message.reply(
          'https://cdn.discordapp.com/attachments/539112946509545475/554747539279314954/c05b9da.jpg'
        );
        break;
      case 5:
        message.reply(
          'https://cdn.discordapp.com/attachments/539112946509545475/554747539279314955/22e6d09.png'
        );
        break;
    }
  }
};
