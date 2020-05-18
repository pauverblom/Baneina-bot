//Inicializar variables.
//no tocar nada de esto a no ser que se quiera añadir alguna función nueva que requiera una nueva librería

//---------------------------------------------------------------------------------------------------------
//librerías
const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();



//Variable existencia.
var Existence = 1;

//---------------------------------------------------------------------------------------------------------
//recibir ping.
//---------------------------------------------------------------------------------------------------------
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
//---------------------------------------------------------------------------------------------------------
//declarar funciones

function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //
    return url.indexOf(("jpg"|"png"|"jpeg"), url.length - ("jpg"|"png"|"jpeg").length /*or 3*/) !== -1;
}


//ESTOY LISTO!

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//si se envia mensaje


client.on('message', message => {
  
  if (message.content === '!OOF'){
    message.reply('Whoah! You just commited die!');
  }
if (message.content === '!Exist'){
        Existence = Existence + 1;
	
	if (Existence == 1)
	{
		message.reply('Whoah! You exist! ' + Existence + ' person exists!');
	}

	if (Existence > 1)
	{
		message.reply('Whoah! You exist! ' + Existence + ' people exist!');
	}
  }
if (message.content === '!Unexist'){
	if (Existence > 0){Existence = Existence - 1;}

	if (Existence == 1)
	{
		message.reply('You commited sewer side! You unexisted! ' + Existence + ' person exists! '+'Congrats! '+'You are the only survivor!');
	}
	if (Existence > 1)
	{
		message.reply('You commited sewer side! You unexisted! ' + Existence + ' people exist!');
	}
	if (Existence == 0)
	{
		message.reply('You commited sewer side! '+'You unexisted! '+'No-one exists. '+'This is so sad.');
  }
}
  if (message.content === '!Meme') {
    var number1 = 6
    var random = Math.floor(Math.random() * 6) + 1
    switch (random) {
      case 1: message.reply('Sopa do macaco uma delicia kkkk'); break;
      case 2: message.reply("It ain't much but it's honest work"); break;
      case 3: message.reply("Watch out!! Oh no, he has airpods on, he can't hear us!! OMG"); break;
      case 4: message.reply("Carefully. He's a hero"); break;
      case 5: message.reply("Ahh. I see you're a man of culture as well"); break;
      case 6: message.reply("Wait... IS THIS?!?  |  | |  | |  |_"); break;
      
                  }
  }
  
  if (message.content === '!Subscribe') {
   message.reply("SUBSCRIBE TO MY CHANNEL https://www.youtube.com/channel/UCHDfM2CVCqRR5XhncqNgcuw?sub_confirmation=1")
  }    
  if (message.content === '!Bitchlasagna'){
    message.reply('DO YOUR PART! '+' https://www.youtube.com/watch?v=6Dh-RL__uN4');
  }
    if (message.content === '!Cykablyat') {
    var number2 = 5
    var random = Math.floor(Math.random() * 5) + 1
    switch (random) {
      case 1: message.reply('Stay Cheeki Breeki Comrade'); break;
      case 2: message.reply("https://www.youtube.com/watch?v=OUHVRWdVQCI"); break;
      case 3: message.reply("https://www.youtube.com/watch?v=U06jlgpMtQs"); break;
        case 4: message.reply("https://cdn.discordapp.com/attachments/539112946509545475/554747539279314954/c05b9da.jpg"); break;
        case 5: message.reply("https://cdn.discordapp.com/attachments/539112946509545475/554747539279314955/22e6d09.png"); break;
                  }
      
    }
if (message.content.startsWith('!avatar')) {
    const user = message.mentions.users.first();
    message.reply(user + "es a quien has etiquetado")
        }
 
  
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)){
      
    let member = message.member;
    
    let imagememer = message.guild.roles.find(role => role.name === "Image memer");
    
     member.addRole(imagememer);    
    }
  }


});
client.on('guildMemberAdd', member => {
    member.guild.channels.get("552852895704547328").send("Hello, "+member+". Make sure to subscribe to my channel if you aren't already! https://www.youtube.com/channel/UCHDfM2CVCqRR5XhncqNgcuw?sub_confirmation=1"); 
   
  
let lvl1 = member.guild.roles.find(role => role.name === "Lvl 1 Crook");
  
  member.addRole(lvl1);
  
  
});

client.login(process.env.TOKEN);
  
