require("dotenv").config();
const { Client } = require("discord.js");

// This client basically is the bot 
const client = new Client();

// The bot can listen to all the events that happens in the server such as message, reply etc
// ready is one such event when the bot starts running
client.on("ready", () => {
    console.log(`${client.user.tag} successfully logged in and running`);
});

client.on("message", (message) => {
    if (message.author.bot) return; // if the message was sent by the bot itself we have to ignore it
    console.log(`${message.author.tag} : ${message.content}`);
    if (message.content === "hello") {
        message.channel.send(`Hello ${message.author.tag}. Welcome to the test-server`);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

