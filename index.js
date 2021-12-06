//Libraries and constants
const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const prefix = '!';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

//declare functions

function attachIsImage(msgAttach) 
{
	var url = msgAttach.url;
	return (url.indexOf('jpg' | 'png' | 'jpeg', url.length - ('jpg' | 'png' | 'jpeg').length) !== -1); //return true if it's an image
}

//I'm Ready :)

client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
});

//Message Sent
client.on('message', (message) => {

        if (message.author.bot) return; //Ignore the bot's messages


	if (message.content.toLowerCase().includes('earth is flat'))
	{
		message.channel.send('${member}, your brain is flat.');
	}
	
        if (isNaN(message.content)) { //
                if (message.channel.id == 785909768379301940) { //Counting channel
                        message.delete();
                        message.author.send('The counting channel is exclusively for counting. Do not do that again, I am living in your walls.');
                }
        }

        if (Number(message.content) < 2500) {
                if (message.channel.id == 785909768379301940) { //Counting channel
                        message.delete();
                }
        }

        //Give image memer role
        if (message.attachments.size > 0) {
                if (message.attachments.every(attachIsImage)) {
                        let member = message.member;

                        let imagememer = message.guild.roles.cache.find((role) => role.id == 559311593020588032);
                        member.roles.add(imagememer);
                }
        }

        if (message.content.startsWith(prefix)) 
		{
			const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            if (!client.commands.has(command)) return;
                
			try 
			{     	
				client.commands.get(command).execute(message, args);
                } catch (error) {
                 console.error(error);
             }
        }
	
	if (message.content.toLowerCase() === 'am i god?')
	{
		if (message.author.id == 405050037186330624)
		{
			message.channel.send('Yes, you are, my lord');
		}
		else
		{
			message.channel.send('Step aside, peasant');
		}
	}
});

//Welcoming
client.on('guildMemberAdd', (member) => {
        const channel = member.guild.channels.cache.find((ch) => ch.id == 552852895704547328); //welcoming channel
        channel.send(`Welcome to the server, ${member}. IMPORTANT!! Accept the #rules-📜 by reacting to the message to enter the server. Subscribe to my channel! https://www.youtube.com/c/baneina`
 	);
});


client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.channel.id == 778542590592679967) //rules channel
        {
			let member = reaction.message.guild.members.cache.get(user.id);
        	const role = reaction.message.guild.roles.cache.find((role) => role.id == 539113230581104644); //Starter role (Lvl 1 Crook ATM)
            member.roles.add(role);
        }
});


client.on('guildMemberRemove', (member) => {
        const channel = member.guild.channels.cache.find(
                (channel) => channel.id == 782674407713144842 //dock of shame
        );

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
