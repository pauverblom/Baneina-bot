module.exports = {
  name: 'feelinglucky',
  description: '1 in a 100 chance of becoming a mod',
  execute(message, args) {
    var member = message.member;
    var highestrole = message.member.roles.highest.name;
    let feelinglucky = message.guild.roles.cache.find(
      (role) => role.name === 'Feeling Lucky!'
    );

    if (highestrole != 'Baneina') {
      if (Math.random() > 0.99) {
        message.reply('YOU GOT LUCKY!!!!!!!!!! CONGRATS!!!');
        member.roles.add(feelinglucky);
      } else {
        message.reply("You didn't get lucky :(  byee!");
        setTimeout(function () {
          member.kick();
          message.reply('was kicked :(');
        }, 3000);
      }
    } else {
      message.reply('You already are the admin, boss');
    }
  },
};
