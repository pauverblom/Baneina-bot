var Existence = 1;

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('Pong!');
  }
  if (msg.content === '!OOF'){
    msg.reply('Whoah! You just commited die!');
  }
if (msg.content === '!Exist'){
        Existence = Existence + 1;
	
	if (Existence == 1)
	{
		msg.reply('Whoah! You exist! ' + Existence + ' person exists!');
	}

	if (Existence > 1)
	{
		msg.reply('Whoah! You exist! ' + Existence + ' people exist!');
	}
  }
if (msg.content === '!Unexist'){
	if (Existence > 0){Existence = Existence - 1;}

	if (Existence == 1)
	{
		msg.reply('You commited sewer side! You unexisted! ' + Existence + ' person exists! '+'Congrats! '+'You are the only survivor!');
	}
	if (Existence > 1)
	{
		msg.reply('You commited sewer side! You unexisted! ' + Existence + ' people exist!');
	}
	if (Existence == 0)
	{
		msg.reply('You commited sewer side! '+'You unexisted! '+'No-one exists. '+'This is so sad.');
	}
  if (message.content === '!avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
  
  };
  


});
client.on('guildMemberAdd', member => {
  channel.send(`Welcome to this fucking piece of shit, ${member}`);
});
client.login('process.env.BOT_TOKEN');
