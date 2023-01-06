const discord = require("discord.js")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("BAN_MEMBERS")) return
    if(!message.member.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`i don't have perm to do this!`)

    let reason = args.slice(1).join(" ")
    let userId = args[0]

    if(!reason) reason = 'No reason provided';
    if(!userId) return message.channel.send('Please provide a ID to unban')
    if(isNaN(userId)) return message.channel.send("Please provide a valid ID that is numbers")

    message.guild.fetchBans().then(async bans => {
        if(bans.size === 0) return message.channel.send("No one is banned in this server")
        let BannedUser = bans.find(ban => ban.user.id == userId)
        if(!BannedUser) return message.channel.send('This user isnt banned!')
        await message.guild.members.unban(BannedUser.user, reason).catch(err =>{
            return message.channel.send("Something went wrong!")
        }).then(() => {
            message.channel.send(`successfully unbanned ${userId}`)
        })
    })
    var channel = message.guild.channels.cache.find(c => c.id === '1055548447719166012');
    var log = new MessageEmbed()
    .setColor('0x05ff4c')
    .setTitle("A Member Was unbanned")
    .setDescription("Banned Information Displayed Below:")
    .addField("Member Unbanned:", `${userID}> **|** \`${userID}\``)
    .addField("Moderator:", `<@${message.author}> **|** \`${message.author}\``)
    channel.send(log);
}

module.exports.help = {
    name: 'unban',
    aliases: []
}
