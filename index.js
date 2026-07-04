// ============================================================
// Libraries
// ============================================================

const fs = require("fs");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

// ============================================================
// Config & Constants
// ============================================================

const token = process.env.DISCORD_TOKEN;
const prefix = "!";

// Channel IDs
const TESTING_BOT_CHANNEL_ID  = "559312894815240202";
const HONEYPOT_CHANNEL_ID     = "1523053085763833876";
const HONEYPOT_ALERT_CHANNEL_ID = "1523055165383512165";
const ENYE_CHANNEL_ID         = "881158694396633108";
const COUNTING_CHANNEL_ID     = "785909768379301940";
const WELCOMING_CHANNEL_ID    = "552852895704547328";
const DOCK_OF_SHAME_CHANNEL_ID = "782674407713144842";

// Role IDs
const ADMIN_ROLE_ID       = "759034196235911210";
const IMAGE_MEMER_ROLE_ID = "559311593020588032";
const NEWBIE_ROLE_ID      = "539113230581104644";

// User IDs
const BANEINA_ID = "405050037186330624";

// Other values
const COUNTING_MIN_VALUE = 2830;

// Moderation word lists
const SWEARWORDS = [
  "fuck", "shit", "asshole", "cunt", "bitch",
  "kurwa", "scheiße", "scheisse", "whore",
];

const HARD_SWEARWORDS = [
  "nigga", "nigger", "fag", "faggot",
  "niggas", "niggers",
  "n!gga", "n!gger", "n!ggas", "n!ggers",
  "n8gger", "n8gga", "n8ggas", "n8ggers",
];

// ============================================================
// Honeypot Ban Persistence
// ============================================================

const BANS_FILE = "/app/data/honeypot_bans.json";
let honeypotBans = new Set();

try {
  if (fs.existsSync(BANS_FILE)) {
    honeypotBans = new Set(JSON.parse(fs.readFileSync(BANS_FILE, "utf8")));
  }
} catch (err) {
  console.error("Error loading honeypot bans file:", err);
}

function saveBans() {
  try {
    fs.writeFileSync(BANS_FILE, JSON.stringify(Array.from(honeypotBans)));
  } catch (err) {
    console.error("Error saving honeypot bans file:", err);
  }
}

// ============================================================
// Discord Client Setup
// ============================================================

const client = new Client({
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

// ============================================================
// Load Commands
// ============================================================

client.commands = new Collection();

fs.readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
  });

// ============================================================
// Helper Functions
// ============================================================

/**
 * Returns true if a message attachment is an image.
 */
function attachIsImage(attachment) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(attachment.url);
}

/**
 * Permabans a user from the guild, wipes their matching messages
 * across all channels, and sends an alert.
 */
async function honeypotBan(message) {
  const { author, guild, content: offendingContent } = message;

  honeypotBans.add(author.id);
  saveBans();

  await message.delete().catch(() => {});

  const alertChannel = client.channels.cache.get(HONEYPOT_ALERT_CHANNEL_ID);
  if (alertChannel) {
    alertChannel.send(
      `User ${author.tag} (${author.id}) was permabanned for BEING A FUCKING CLANKER.`
    );
  }

  // Delete their matching messages from the last 100 in every text channel
  const textChannels = guild.channels.cache.filter((c) => c.isTextBased());
  for (const [, channel] of textChannels) {
    try {
      const fetched = await channel.messages.fetch({ limit: 100 });
      for (const [, msg] of fetched.filter(
        (m) => m.author.id === author.id && m.content === offendingContent
      )) {
        await msg.delete().catch(() => {});
      }
    } catch { }
  }

  try {
    await guild.members.ban(author.id, { reason: "Fucking Clanker" });
  } catch (e) {
    console.error("Failed to ban user:", e);
  }
}

/**
 * Enforces the ñ-only rule in the ñ channel.
 */
async function handleEnye(message) {
  if (!message.content.toLowerCase().includes("ñ")) {
    await message.delete().catch(() => {});
    message.author.send(
      "The #ñ channel is exclusively for ñ. DO NOT DO THAT AGAIN OR I WILL FIND YOU"
    ).catch(() => {});
  }
}

/**
 * Warns non-admin users who use soft swear words.
 */
function handleSwearwords(message) {
  const lowerContent = message.content.toLowerCase();
  if (!SWEARWORDS.some((word) => lowerContent.includes(word))) return;

  const adminRole = message.guild.roles.cache.get(ADMIN_ROLE_ID);
  if (adminRole && message.member.roles.highest.position < adminRole.position) {
    message.channel.send(`${message.author}, language.`);
  }
}

/**
 * Deletes messages containing hard slurs and warns the user via DM.
 */
async function handleHardSwearwords(message) {
  const lowerContent = message.content.toLowerCase();
  if (!HARD_SWEARWORDS.some((word) => lowerContent.includes(word))) return;

  await message.delete().catch(() => {});
  message.author.send(
    `${message.author} that word is not permitted. You will be banned if you continue using it.`
  ).catch(() => {});
}

/**
 * Enforces sequential counting in the counting channel.
 * Deletes any message that is not the next integer in sequence.
 */
async function handleCounting(message) {
  const currentContent = message.content.trim();
  const currentNumber = Number(currentContent);

  if (currentContent === "" || isNaN(currentNumber)) {
    await message.delete().catch(() => {});
    message.author.send(
      "The counting channel is exclusively for counting. Do not do that again, I am living in your walls."
    ).catch(() => {});
    return;
  }

  try {
    const history = await message.channel.messages.fetch({
      limit: 10,
      before: message.id,
    });
    const lastValidMsg = history.find(
      (m) => m.content.trim() !== "" && !isNaN(Number(m.content))
    );

    if (lastValidMsg) {
      const lastNumber = Number(lastValidMsg.content);
      if (currentNumber !== lastNumber + 1) {
        await message.delete().catch(() => {});
      }
    } else if (currentNumber < COUNTING_MIN_VALUE) {
      await message.delete().catch(() => {});
    }
  } catch (e) {
    console.error("Failed to fetch counting channel history:", e);
  }
}

/**
 * Awards the "image memer" role to users who post images.
 */
function handleImageMemer(message) {
  if (message.attachments.size === 0) return;
  if (!message.attachments.every(attachIsImage)) return;

  const imageMemer = message.guild.roles.cache.get(IMAGE_MEMER_ROLE_ID);
  if (imageMemer) {
    message.member.roles.add(imageMemer).catch(() => {});
  }
}

/**
 * Dispatches !commands from the Commands/ directory.
 */
async function handleCommand(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  try {
    await client.commands.get(commandName).execute(message, args);
  } catch (error) {
    console.error(`Error executing command "${commandName}":`, error);
  }
}

// ============================================================
// Event: Bot Ready
// ============================================================

client.on("clientReady", () => {
  client.user.setActivity("Help me", {
    type: ActivityType.Watching,
    url: "https://www.youtube.com/c/baneina",
  });

  client.channels.cache.get(TESTING_BOT_CHANNEL_ID)?.send("BANEINA'S SLAVE UPDATED");
});

// ============================================================
// Event: Message Received
// ============================================================

client.on("messageCreate", async (message) => {
  // Ignore DMs and bot messages
  if (!message.guild || message.author.bot) return;

  const channelId = message.channel.id;

  // --- Honeypot ---
  if (channelId === HONEYPOT_CHANNEL_ID) {
    await honeypotBan(message);
    return;
  }

  // --- Channel-specific rules ---
  if (channelId === ENYE_CHANNEL_ID) {
    await handleEnye(message);
    return; // No further processing in this channel
  }

  if (channelId === COUNTING_CHANNEL_ID) {
    await handleCounting(message);
    return; // No further processing in this channel
  }

  // --- Server-wide moderation ---
  if (message.content.toLowerCase().includes("earth is flat") ||
      message.content.toLowerCase().includes("earth's flat")) {
    message.channel.send(`${message.author}, your brain is flat.`);
  }

  handleSwearwords(message);
  await handleHardSwearwords(message);

  // --- Roles ---
  handleImageMemer(message);

  // --- Commands ---
  if (message.content.startsWith(prefix)) {
    await handleCommand(message);
    return;
  }

  // --- Easter eggs ---
  if (message.content.toLowerCase() === "am i god?") {
    const reply = message.author.id === BANEINA_ID
      ? "Yes, you are, my lord"
      : "Step aside, peasant";
    message.channel.send(reply);
  }
});

// ============================================================
// Event: Member Joined
// ============================================================

client.on("guildMemberAdd", (member) => {
  const newbieRole = member.guild.roles.cache.get(NEWBIE_ROLE_ID);
  const welcomeChannel = member.guild.channels.cache.get(WELCOMING_CHANNEL_ID);

  welcomeChannel?.send(
    `Welcome to the server, ${member}. Accept the rules to gain access to the server, and subscribe to my channel! https://www.youtube.com/c/baneina`
  );

  if (newbieRole) {
    member.roles.add(newbieRole).catch(() => {});
  }
});

// ============================================================
// Event: Member Left / Kicked / Banned
// ============================================================

client.on("guildMemberRemove", (member) => {
  // Skip the "Dock of Shame" if this is a honeypot ban
  if (honeypotBans.has(member.id)) {
    honeypotBans.delete(member.id);
    saveBans();
    return;
  }

  const dockChannel = member.guild.channels.cache.get(DOCK_OF_SHAME_CHANNEL_ID);
  if (!dockChannel) return;

  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("Dock of Shame")
    .setDescription(
      `${member.user.tag} has been eliminated and sent to the dock of shame. Coward.`
    )
    .setImage("https://i.postimg.cc/qMB7Vxnv/Dock-of-shame.jpg");

  dockChannel.send({ embeds: [embed] });
});

// ============================================================
// Login
// ============================================================

client.login(token);
