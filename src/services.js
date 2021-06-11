const kickUsers = async (message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply("You do not have permission to kick users");
    }

    if (args.length === 0) return message.reply("Please enter the user id to kick the user");
    const member = message.guild.members.cache.get(args[0]); // guild just means the server
    if (!member) return message.channel.send("User not found");

    try {
        const kickedUser = await member.kick();
        message.channel.send(`${kickedUser} was kicked`);
    } catch (e) {
        message.reply("I cannot kick this user :(")
    }
}

const banUsers = async (message, args) => {
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

module.exports = {
    kickUsers,
    banUsers
}