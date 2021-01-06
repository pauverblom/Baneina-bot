//Librerías
//No tocar nada de esto a no ser que se quiera añadir alguna función nueva que requiera una nueva librería
const http = require("http");
const express = require("express");
const app = express();
const fs = require('fs');
const Discord = require("discord.js");
const prefix = ("!");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//declarar funciones

function attachIsImage(msgAttach) {
  var url = msgAttach.url;
  return (url.indexOf("jpg" | "png" | "jpeg", url.length - ("jpg" | "png" | "jpeg").length /*or 3*/) !== -1);
}

//ESTOY LISTO!
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//si se envia mensaje

client.on("message", (message) => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	
	const command = args.shift().toLowerCase();


	//!Cykablyat
  if (message.content === "!Cykablyat") {
    var number2 = 5;
    var random = Math.floor(Math.random() * 5) + 1;
    switch (random) {
      case 1:
        message.reply("Stay Cheeki Breeki Comrade");
        break;
      case 2:
        message.reply("https://www.youtube.com/watch?v=OUHVRWdVQCI");
        break;
      case 3:
        message.reply("https://www.youtube.com/watch?v=U06jlgpMtQs");
        break;
      case 4:
        message.reply(
          "https://cdn.discordapp.com/attachments/539112946509545475/554747539279314954/c05b9da.jpg"
        );
        break;
      case 5:
        message.reply(
          "https://cdn.discordapp.com/attachments/539112946509545475/554747539279314955/22e6d09.png"
        );
        break;
    }
  }
	//!Role
  if (message.content === "!Role") {
    let member = message.member;
    var highestrole = member.roles.highest.name;
    message.reply("Your current role is: " + highestrole);
  }
	//!Avatar
  if (message.content.startsWith("!Avatar")) {
    if (!message.mentions.users.size) {
      const embed1 = new Discord.MessageEmbed().setImage(message.author.displayAvatarURL());
      message.channel.send(embed1);
    } else {
      var user = message.mentions.users.first();
      const embed2 = new Discord.MessageEmbed().setImage(user.displayAvatarURL());
      message.channel.send(embed2);
    }
  }
	
if (message.content === "!Members") {
	var members = message.guild.members.cache.filter(member => !member.user.bot).size;
	message.reply('There are ' + members + ' members in the server.' )
}
	
if (message.content === "Am I God?") {
  var highestrole = message.member.roles.highest.name;
  if (highestrole === "Baneina") {
    message.reply("Yes, you are, my lord");
  } else {
    message.reply("Nahh, bro. You're a loser.");
  }
}	
	//!FeelingLucky	
if (message.content === '!FeelingLucky') {
  var member = message.member;
  var highestrole = message.member.roles.highest.name;
  let feelinglucky = message.guild.roles.cache.find((role) => role.name === 'Feeling Lucky!');

  if (highestrole != 'Baneina') {
    if (Math.random() > 0.99) {
      message.reply('YOU GOT LUCKY!!!!!!!!!! CONGRATS!!!');
      member.roles.add(feelinglucky);
    } else {
      message.reply("You didn't get lucky :(  byee!");
      setTimeout(function () {
        member.kick();
	      message.reply("was kicked :(")
      }, 3000);
    }
  } else {
    message.reply('You already are the admin, boss');
  }
}
	
    if (isNaN(message.content)) {
	     if (message.channel.name === 'counting'){
	     	message.delete();
		message.author.send("The counting channel is exclusively for counting.")
	     }
}
	
	
	//Give image memer role
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)) {
      let member = message.member;

      let imagememer = message.guild.roles.cache.find((role) => role.name === "Image memer");
      member.roles.add(imagememer);
    }
  }
});
	//Welcoming and role giving
client.on('guildMemberAdd', member => {
  var role = member.guild.roles.cache.find(role => role.name === 'Lvl 1 Crook');
  member.roles.add(role)
  const channel = member.guild.channels.cache.find(ch => ch.name === 'greeting-channel');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member} Make sure to subscribe to my channel! (if you aren't already) https://www.youtube.com/c/baneina`);
});

client.on('guildMemberRemove', member => {
const channel = member.guild.channels.cache.find(ch => ch.name === 'dock-of-shame');
  if (!channel) return;
	
	const embed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('Dock of Shame')
	.setDescription(`${member} has been eliminated and sent to the dock of shame`)
	.setImage('https://i.postimg.cc/qMB7Vxnv/Dock-of-shame.jpg')
	
  channel.send(embed);
});

client.login(process.env.TOKEN);
  
