//Librerías
//No tocar nada de esto a no ser que se quiera añadir alguna función nueva que requiera una nueva librería
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const Discord = require('discord.js');
const prefix = '!';
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./Commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
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

//si se envia mensaje

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);

  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

  if (isNaN(message.content)) {
    if (message.channel.name === 'counting') {
      message.delete();
      message.author.send('The counting channel is exclusively for counting.');
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
});
//Welcoming and role giving
client.on('guildMemberAdd', (member) => {
  var role = member.guild.roles.cache.find(
    (role) => role.name === 'Lvl 1 Crook'
  );
  member.roles.add(role);
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'greeting-channel'
  );
  if (!channel) return;
  channel.send(
    `Welcome to the server, ${member} Make sure to subscribe to my channel! (if you aren't already) https://www.youtube.com/c/baneina`
  );
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
