//Librerías
//No tocar nada de esto a no ser que se quiera añadir alguna función nueva que requiera una nueva librería
const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();

//Inicializar variables.
var Existence = 1;

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
	//!OOF
  if (message.content === "!OOF") {
    message.reply("Whoah! You just commited die!");
  }

	//!Exist
  if (message.content === "!Exist") {
    Existence = Existence + 1;

    if (Existence == 1) {
      message.reply("Whoah! You exist! " + Existence + " person exists!");
    }

    if (Existence > 1) {
      message.reply("Whoah! You exist! " + Existence + " people exist!");
    }
  }
	//!Unexist
  if (message.content === "!Unexist") {
    if (Existence > 0) {
      Existence = Existence - 1;
    }

    if (Existence == 1) {
      message.reply(
        "You commited sewer side! You unexisted! " +
          Existence +
          " person exists! " +
          "Congrats! " +
          "You are the only survivor!"
      );
    }
    if (Existence > 1) {
      message.reply(
        "You commited sewer side! You unexisted! " +
          Existence +
          " people exist!"
      );
    }
    if (Existence == 0) {
      message.reply(
        "You commited sewer side! " +
          "You unexisted! " +
          "No-one exists. " +
          "This is so sad."
      );
    }
  }
	//!Meme
  if (message.content === "!Meme") {
    var number1 = 6;
    var random = Math.floor(Math.random() * 6) + 1;
    switch (random) {
      case 1:
        message.reply("Sopa do macaco uma delicia kkkk");
        break;
      case 2:
        message.reply("It ain't much but it's honest work");
        break;
      case 3:
        message.reply(
          "Watch out!! Oh no, he has airpods on, he can't hear us!! OMG"
        );
        break;
      case 4:
        message.reply("Carefully. He's a hero");
        break;
      case 5:
        message.reply("Ahh. I see you're a man of culture as well");
        break;
      case 6:
        message.reply("Wait... IS THIS?!?  |  | |  | |  |_");
        break;
    }
  }
	//!Subscribe
  if (message.content === "!Subscribe") {
    message.reply(
      "SUBSCRIBE TO MY CHANNEL https://www.youtube.com/channel/UCHDfM2CVCqRR5XhncqNgcuw?sub_confirmation=1"
    );
  }
	//!Bitchlasagna
  if (message.content === "!Bitchlasagna") {
    message.reply(
      "DO YOUR PART! " + " https://www.youtube.com/watch?v=6Dh-RL__uN4"
    );
  }
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
if (message.content = /^\d+$/.test(message)) {
	if (message.channel.id === 'counting')	{
		console.log('it is');
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
  
