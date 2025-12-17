//Libraries and constants

const fs = require("fs");
const Discord = require("discord.js");

const token = process.env.DISCORD_TOKEN;

const client = new Discord.Client({
partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const prefix = "!";
const swearwords = [
  "fuck",
  "shit",
  "asshole",
  "cunt",
  "bitch",
  "kurwa",
  "scheiße",
  "scheisse",
  "whore"
];
const hardswearwords = [
  "nigga",
  "nigger",
  "fag",
  "faggot",
  "niggas",
  "niggers",
  "n!gga",
  "n!gger",
  "n!ggas",
  "n!ggers",
  "n8gger",
  "n8gga",
  "n8ggas",
  "n8ggers"
];

const baneinaID = 405050037186330624;

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

//declare useful functions

function attachIsImage(msgAttach) {
  var url = msgAttach.url;
  return (
    url.indexOf(
      "jpg" | "png" | "jpeg",
      url.length - ("jpg" | "png" | "jpeg").length
    ) !== -1
  ); //return true if it's an image
}

client.on("ready", () => {
  client.user.setActivity("Help me", {
    type: "WATCHING",
    url: "https://www.youtube.com/c/baneina"
  });

  const testingbotchannel = client.channels.cache.get("559312894815240202");
  testingbotchannel.send(`BANEINA'S SLAVE UPDATED`);
});

client.on("message", (message) => {
  if (message.guild === null) {
    return;
  }
  if (message.channel.id == 881158694396633108) {
    if (!message.content.toLowerCase().includes("ñ")) {
      message.delete();
      message.author.send(
        "The #ñ channel is exclusively for ñ. DO NOT DO THAT AGAIN OR I WILL FIND YOU"
      );
    }
  }

  if (
    message.content.toLowerCase().includes("earth is flat") ||
    message.content.toLowerCase().includes("earth's flat")
  ) {
    message.channel.send(`${message.author}, your brain is flat.`);
  }

  if (
    swearwords.some((word) => message.toString().toLowerCase().includes(word))
  ) {
    let admin_role = message.guild.roles.cache.find(
      (role) => role.id == 759034196235911210
    ); //admin
    if (message.member.roles.highest.position < admin_role.position) {
      message.channel.send(`${message.author}, language.`);
    }
  }

  if (
    hardswearwords.some((word) =>
      message.toString().toLowerCase().includes(word)
    )
  ) {
    message.author.send(
      `${message.author} that word is not permitted. You will be banned if you continue using it.`
    );
    message.delete();
  }

  if (isNaN(message.content)) {
    //
    if (message.channel.id == 785909768379301940) {
      //Counting channel
      message.delete();
      message.author.send(
        "The counting channel is exclusively for counting. Do not do that again, I am living in your walls."
      );
    }
  }

  if (Number(message.content) < 2500) {
    if (message.channel.id == 785909768379301940) {
      //Counting channel
      message.delete();
    }
  }

  //Give image memer role
  if (message.attachments.size > 0) {
    if (message.attachments.every(attachIsImage)) {
      let imagememer = message.guild.roles.cache.find(
        (role) => role.id == 559311593020588032
      );
      message.member.roles.add(imagememer);
    }
  }

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
    }
  }

  if (message.content.toLowerCase() === "am i god?") {
    if (message.author.id == baneinaID) {
      message.channel.send("Yes, you are, my lord");
    } else {
      message.channel.send("Step aside, peasant");
    }
  }
});

//Welcoming
client.on("guildMemberAdd", (member) => {
  const newbie_role = member.guild.roles.cache.find(
    (role) => role.id == 539113230581104644
  );
  const channel = member.guild.channels.cache.find(
    (ch) => ch.id == 552852895704547328
  ); //welcoming channel

  channel.send(
    `Welcome to the server, ${member}. Accept the rules to gain access to the server, and subscribe to my channel! https://www.youtube.com/c/baneina`
  );
  member.roles.add(newbie_role);
});

client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id == 782674407713144842
  ); //dock of shame
  const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Dock of Shame")
    .setDescription(
      `${member.user.tag} has been eliminated and sent to the dock of shame. Coward.`
    )
    .setImage("https://i.postimg.cc/qMB7Vxnv/Dock-of-shame.jpg");

  channel.send(embed);
});

client.login(token);
