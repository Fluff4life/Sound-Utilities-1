const Discord = require('discord.js');
 exports.run = (client, msg, args) => {
if(!msg.member.hasPermission('MANAGE_NICKNAMES')) return;
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    if(!member) return msg.reply('You didn\'t mention anyone!');

    const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
    randomID(10)
    member.setNickname("Moderated Nickname " + randomID(10))
    msg.channel.send(`Moderated name to \`${member.user.id}\``)
    msg.delete();

    const logChannel = msg.guild.channels.cache.find(c => c.id === '') //ADD YOUR log channel name here
    const logEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle("A Members username was Moderated!")
    .setDescription(`**User:**${member} | \`${member.user.id}\`\n**Author:**${msg.author} | \`${msg.author.id}\``)
    logChannel.send(logEmbed)
    
    const userLog = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('⚙ Your Nickname was Moderated!\n')
    .setThumbnail(msg.guild.iconURL())
    .setDescription(`📜Important Info\n Your nickname has been change by ${msg.author} in ${msg.guild.name}`)
    .addField('**❯ Possible Reasons**\n ❯ Your nickname had curse words\n ❯ Your nickname was not able to be mentioned\n ❯ Your name contains words that may offend others\n If you want to change your nickname please message the staff member.')
    .addField(`**❯ User ID:** ${member.user.id}`)
    .addField(`**❯ New nickname:** \`${member.nickname}\``)
    .addField(`**❯ How to appeal?:** message the staff member that changed your nickname and send them a message with all the info they need.`)
    try{
         member.send(userLog);
    } catch(err){
    }
    

    }