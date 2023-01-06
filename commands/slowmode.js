const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return;
    if(!args[0]) return msg.reply('You need to specify a time for me to set slowmode!');
    if(isNaN(args[0])) return msg.reply("That's not a valid number! Please specify a valid Number!");
    var time = args[0]
    if(args[0] < 0) return msg.reply("Please tell me a Positive Slowmode to set to!");
    if(args[0] > 21600) return msg.reply("I cannot Set Slowmode to more than 6 hours!");
    msg.channel.setRateLimitPerUser(time)

    var emojiGuild = client.guilds.cache.find(guild => guild.name === '') //ADD YOUR CHANNEL NAME HERE
    var yes = emojiGuild.emojis.cache.find(emoji => emoji.name === 'yes')//MUST HAVE EMOJI NAME YES

    var embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`${yes} I have succesfully set slowmode to ${time}!`)
    msg.channel.send(embed)
}
