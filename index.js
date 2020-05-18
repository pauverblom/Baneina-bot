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

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
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


client.on('message', msg => {
  
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
}
  if (msg.content === '!Meme') {
    var number1 = 6
    var random = Math.floor(Math.random() * 6) + 1
    switch (random) {
      case 1: msg.reply('Sopa do macaco uma delicia kkkk'); break;
      case 2: msg.reply("It ain't much but it's honest work"); break;
      case 3: msg.reply("Watch out!! Oh no, he has airpods on, he can't hear us!! OMG"); break;
      case 4: msg.reply("Carefully. He's a hero"); break;
      case 5: msg.reply("Ahh. I see you're a man of culture as well"); break;
      case 6: msg.reply("Wait... IS THIS?!?  |  | |  | |  |_"); break;
      
                  }
  }
  
  if (msg.content === '!Subscribe') {
   msg.reply("SUBSCRIBE TO MY CHANNEL https://www.youtube.com/channel/UCHDfM2CVCqRR5XhncqNgcuw?sub_confirmation=1")
  }    
  if (msg.content === '!Bitchlasagna'){
    msg.reply('DO YOUR PART! '+' https://www.youtube.com/watch?v=6Dh-RL__uN4');
  }
    if (msg.content === '!Cykablyat') {
    var number2 = 5
    var random = Math.floor(Math.random() * 5) + 1
    switch (random) {
      case 1: msg.reply('Stay Cheeki Breeki Comrade'); break;
      case 2: msg.reply("https://www.youtube.com/watch?v=OUHVRWdVQCI"); break;
      case 3: msg.reply("https://www.youtube.com/watch?v=U06jlgpMtQs"); break;
        case 4: msg.reply("https://cdn.discordapp.com/attachments/539112946509545475/554747539279314954/c05b9da.jpg"); break;
        case 5: msg.reply("https://cdn.discordapp.com/attachments/539112946509545475/554747539279314955/22e6d09.png"); break;
                  }
      
    }
  if (msg.content === '!Avatar'){
   msg.reply(msg.author.avatarURL);
  }
    if (msg.content === '!AvatarUser') {
      // Remove the "var" line; it isn't necessary.
      let embed = new Discord.RichEmbed()
      // Replace "message.member" with "message.author"
    .setImage(message.author.avatarURL)
    .setColor('#275BF0')
      message.channel.send(embed)
    }
  
  if (msg.attachments.size > 0) {
    if (msg.attachments.every(attachIsImage)){
      
    let member = msg.member;
    
    let imagememer = msg.guild.roles.find(role => role.name === "Image memer");
    
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
  
