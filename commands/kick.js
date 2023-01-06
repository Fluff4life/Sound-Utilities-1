const Discord = require("discord.js");
const randomString = require('randomstring')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return;
    
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if(!member) return msg.channel.send({embed: 
    {color: "YELLOW",
    description: `Please provide the user to ban!`
    }});


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
    if(!reason) return msg.reply('I cannot Punish the User Without a Reason!')
    var channel = msg.guild.channels.cache.find(c => c.id === '');//ADD YOUR log hcannel id here
    var log = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle("A Member Was Banned")
    .setDescription("Banned Information Displayed Below:")
    .addField("Member Banned:", `${user}> **|** \`${user}\``)
    .addField("Moderator:", `<@${authorID}> **|** \`${authorID}\``)
    .addField("Reason:", `\`${reason}\``)
    .addField("Punishment ID:", `\`${punishmentID}\``)
    .addField("Time", time)
    channel.send(log)

    var userLog = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`You were Banned by <@${authorID}>`)
    .addField("Server:", '')
    .addField("Reason:", `${reason}`)
    .addField("Punishment ID:", `\`${punishmentID}\``)
    .addField("Time", time)
    try {
        await user.send(userLog);
    } catch(err) {
        console.warn(err);
    }
    msg.guild.members.kick(user);
    var confir = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setDescription(`**<@${member.user.id}> **has been **Banned** | \`${member.user.id}\``)

msg.channel.send(confir);
msg.delete();
}
