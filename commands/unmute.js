const Discord = require('discord.js');
const ms = require('ms');
const randomString = require('randomstring')

exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;
    var target = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!target) return msg.reply('You need to mention a user to Mute')
var targetID = msg.guild.members.cache.get(target.id)

var muteRole = msg.guild.roles.cache.find(role => role.name === 'Muted');

targetID.roles.remove(muteRole)
function formatAMPM(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >12 ? 'pm' : 'am';
    hours = hours % 12
    hours = hours ? hours : 12;
    minutes = minutes <10 ? '0' + minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

    const authorID = msg.author.id
    const today = new Date()
    const time = (today.getMonth()+ 1) + '/' + today.getDate() + '-' + today.getFullYear() + " at " + formatAMPM(new Date)

    const punishmentID = randomString.generate(20)
    punishmentIDE = [`${punishmentID}`]
    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('I cannot Unmuted the User Without a Reason!')
var channel = msg.guild.channels.cache.find(c => c.id === '');//ADD YOUR log hcannel id here
var log = new Discord.MessageEmbed()
.setColor('RED')
.setTitle("A Member Was Unmuted")
.setDescription("Unmuted Information Displayed Below:")
.addField("Member Unmuted:", `<@${targetID.user.id}> **|** \`${targetID.user.id}\``)
.addField("Moderator:", `<@${authorID}> **|** \`${authorID}\``)
.addField("Reason:", `\`${reason}\``)
.addField("Punishment ID:", `\`${punishmentID}\``)
.addField("Time", time)
channel.send(log)

var userLog = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTitle(`You were Unmuted by <@${authorID}> `)
.addField("Server:", '')
.addField("Reason:", `${reason}`)
.addField("Punishment ID:", `\`${punishmentID}\``)
.addField("Time", time)

try {
    await target.send(userLog);
} catch(err) {
    console.warn(err);
}
    var confir = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setDescription(`**<@${targetID.user.id}>** has been **Unmuted** | \`${targetID.user.id}\``)
msg.channel.send(confir);
msg.delete();
}
