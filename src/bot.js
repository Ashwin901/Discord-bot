require("dotenv").config();
const { Client } = require("discord.js");
const { kickUsers, banUsers } = require('./services');

// This client basically is the bot 
const client = new Client();
const PREFIX = "$"; // The prefix for all the commands. So when a message starts with this prefix it means that it is a command

// The bot can listen to all the events that happens in the server such as message, reply etc
// ready is one such event when the bot starts running
client.on("ready", () => {
    console.log(`${client.user.tag} successfully logged in and running`); // client.user.tag is just the name of the bot
});


client.on("message", async (message) => {
    if (message.author.bot) return; // if the message was sent by the bot itself we have to ignore it
    if (message.content === "hello") {
        message.channel.send(`Hello ${message.author.tag}. Welcome to the test-server`);
    }

    // for a command the prefix will be followed by the command name and all the arguments following the command name will be separated by spaces
    // before giving any command to bots make sure to give the respective permissions
    if (message.content.startsWith(PREFIX)) {
        const [cmd_name, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // ignores all the whitespace among arguments

        if (cmd_name === 'kick') {
            await kickUsers(message, args);

        } else if (cmd_name === "ban") {
            await banUsers(message, args);
        } else {
            message.reply("Unknown command");
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

