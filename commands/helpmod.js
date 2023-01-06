const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;
    var help = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`:mailbox_with_mail: Need Help? Here are All My Commands`)
    .setDescription('I am the best')
    .addField(`MODERATION`, '\`ban\`, \`kick\`, \`mute\`, \`unmute\`, \`warn\`, \`warnings\`, \`checkwarn\`, \`clearwarnings\`, \`stealemoji\`, \`clearwarn\`')
    .addField(`FUN`, '\`fact\`')
    .addField(`UTILITIES`, '\`lock\`, \`unlock\`, \`bean\`, \`warm\`, \`userinfo\`, \`nickname\`, \`totalban\`, \`avatar\`, \`sm\`, \`maths\`, \`slowmode\`, \`snipe\`, \`ping\`, \`purge\`, \`clear\`, \`moderate\`')
    .addField(`ADMIN`, '\`lockdown\`, \`dmall\`')
    msg.channel.send(help)
}
