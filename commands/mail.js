const Discord = require('discord.js')

exports.run = async(client, msg, args) =>  {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return;
    let user = msg.mentions.users.first()

    if(!user) return msg.channel.send('Mention a user for me to mail')

    var dm = args.slice(1).join(" ")
   let holla = new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`${dm}`)
if(!dm) return msg.channel.send("I can't Modmail an empty message")

try {
    await user.send(holla)
} catch (error) {
    return msg.channel.send('This user had their DMS closed i can\'t Mail him/her')
}

msg.channel.send('Modmail successfully sent')
}