const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return;
    const channels = msg.guild.channels.cache.filter(ch => ch.type !== 'category');

    (channels.forEach(channel => {
        channel.updateOverwrite(msg.guild.roles.everyone, {
            SEND_MESSAGES: false

        })
    }))

    var embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`${msg.author}, I have Successfully locked all channels! User the unlock Command to Unlock them!`)

    msg.channel.send(embed);
}