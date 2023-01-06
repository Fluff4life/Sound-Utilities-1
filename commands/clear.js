const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_CHANNELS')) return;
    if(!args[0]) return msg.reply('Please Mention The Number For Messages For Me To Clear');
    if(isNaN(args[0])) return msg.reply("Please specify a valid Number")

    if(args[0] > 100) return msg.reply("Please Specify A Number Below 100!");
    if(args[0] < 1) return msg.reply("Please specify a number greater than 0!");

    msg.delete()
    await msg.channel.messages.fetch({limit: args[0]}).then (messages => {
        msg.channel.bulkDelete(messages);

        var embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`${args[0]} Messages cleared`);
        msg.channel.send(embed);
    })
    

}
                                        