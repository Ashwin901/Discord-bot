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

client.on("message", async (message) => {
    if (message.author.bot) return; // if the message was sent by the bot itself we have to ignore it
    if (message.content === "hello") {
        message.channel.send(`Hello ${message.author.tag}. Welcome to the test-server`);
    }

    // for a command the prefix will be followed by the command name and all the arguments following the command name will be separated by spaces
    if (message.content.startsWith(PREFIX)) {
        const [cmd_name, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // ignores all the whitespace among arguments

        // Kick users(give bots proper admissions in the server)
        if (cmd_name === 'kick') {

            // We check if the member who requested to kick a user actually has that permission or not
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                return message.reply("You do not have permission to kick users");
            }

            if (args.length === 0) return message.reply("Please enter the user id to kick the user");
            const member = message.guild.members.cache.get(args[0]); // guild just means the server
            if (!member) return message.channel.send("User not found");

            member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch(e => message.channel.send("I cannot kick this user :("))
        } else if (cmd_name === "ban") {
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply("You do not have permission to ban users");
            }

            if (args.length === 0) return message.reply("Please enter the user id to kick the user");
            try {
                const bannedUser = await message.guild.members.ban(args[0]);
                message.channel.send("The member was successfully banned from the server");
            } catch (e) {
                message.reply("Some error occurred. Either I don't have permissions or the user is not found");
            }
        }


    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

