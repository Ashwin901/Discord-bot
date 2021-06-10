require("dotenv").config();
const { Client } = require("discord.js");

// This client basically is the bot 
const client = new Client();
const PREFIX = "$"; // The prefix for all the commands. So when a message starts with this prefix it means that it is a command

// The bot can listen to all the events that happens in the server such as message, reply etc
// ready is one such event when the bot starts running
client.on("ready", () => {
    console.log(`${client.user.tag} successfully logged in and running`); // client.user.tag is just the name of the bot
});

client.on("message", (message) => {
    if (message.author.bot) return; // if the message was sent by the bot itself we have to ignore it
    console.log(`${message.author.tag} : ${message.content}`);
    if (message.content === "hello") {
        message.channel.send(`Hello ${message.author.tag}. Welcome to the test-server`);
    }

    // for a command the prefix will be followed by the command name and all the arguments following the command name will be separated by spaces
    if (message.content.startsWith(PREFIX)) {
        const [cmd_name, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // ignores all the whitespace among arguments

        if (cmd_name == 'kick') {
            if (args.length === 0) return message.reply("Please enter the user id to kick the user");
            const member = message.guild.members.cache.get(args[0]); // guild just means the server
            if (!member) return message.channel.send("User not found");

            member.kick();
            return message.channel.send("Member kicked from the server");
        }

    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

