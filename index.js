//Inicializar variables.
//no tocar nada de esto a no ser que se quiera añadir alguna función nueva que requiera una nueva librería

//---------------------------------------------------------------------------------------------------------
//librerías
const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
	
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'greeting-channel');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});	



client.login(process.env.TOKEN);
  
