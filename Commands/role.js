module.exports = {
  name: 'role',
  description: 'Gives your current role',
  execute(message, args) {
    message.reply('Your current role is: ' + message.member.roles.highest.name);
  },
};
