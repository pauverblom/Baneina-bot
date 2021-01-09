//Librerías
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const Discord = require('discord.js');
const prefix = '!';
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./Commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

//declarar funciones

function attachIsImage(msgAttach) {
  var url = msgAttach.url;
  return (
    url.indexOf(
      'jpg' | 'png' | 'jpeg',
      url.length - ('jpg' | 'png' | 'jpeg').length /*or 3*/
    ) !== -1
  );
}

//ESTOY LISTO!

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Mensaje Enviado
client.on('message', (message) => {
  //Counting channel
  if (isNaN(message.content)) {
    if (message.channel.name === 'counting') {
      message.delete();
      message.author.send('The counting channel is exclusively for counting.');
    }
  }

  if (Number(message.content) < 780) {
    if (message.channel.name === 'counting') {
      message.delete();
    }
  }

  //Give image memer role
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)) {
      let member = message.member;

      let imagememer = message.guild.roles.cache.find(
        (role) => role.name === 'Image memer'
      );
      member.roles.add(imagememer);
    }
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

//Welcoming and role giving
client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'greeting-channel'
  );
  if (!channel) return;
  channel.send(
    `Welcome to the server, ${member}. Accept the rules in #rules by reacting to the emoji in order to gain access to the server. Also, make sure to subscribe to my channel! (if you aren't already) https://www.youtube.com/c/baneina`
  );
});


client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:a
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});


client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'dock-of-shame'
  );
  if (!channel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('Dock of Shame')
    .setDescription(
      `${member} has been eliminated and sent to the dock of shame`
    )
    .setImage('https://i.postimg.cc/qMB7Vxnv/Dock-of-shame.jpg');

  channel.send(embed);
});

client.login(process.env.TOKEN);
