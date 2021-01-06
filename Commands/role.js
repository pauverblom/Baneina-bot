module.exports = {
  name: 'role',
  description: 'Gives your current role',
  execute(message, args) {
    let member = message.member;
    var highestrole = member.roles.highest.name;
    message.reply('Your current role is: ' + highestrole);
  },
};
