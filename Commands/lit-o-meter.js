const progressbar = require('string-progressbar');
module.exports = {
  name: 'lit-o-meter',
  description: 'How lit are you?',
  execute(message, args) {

    var total = 100;
    if (message.author == 405050037186330624)
    {
      var percentaje = 100;
      let bar = progressbar.filledBar(total, percentaje, 15);
      message.channel.send("You are 100% lit, boss 🔥\n" + bar);
    }
    else
    {
      var percentaje = Math.ceil((Math.random() * 100));
      let bar = progressbar.filledBar(total, percentaje, 15);
      message.channel.send("You are " + percentaje + "% lit 🔥\n" + bar);
    }
  }
};
