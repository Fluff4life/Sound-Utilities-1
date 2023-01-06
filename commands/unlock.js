const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return;
    const channels = msg.guild.channels.cache.filter(ch => ch.type !== 'category');

    (channels.forEach(channel => {
        channel.updateOverwrite(msg.guild.roles.everyone, {
            SEND_MESSAGES: true

        })
    }))

    var embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`${msg.author}, I have Successfully unlocked all previously locked channels!`)

    msg.channel.send(embed);
}