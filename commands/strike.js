const Discord = require('discord.js');
const mongo = require("../mongo")
const warnSchema = require('../schema/warnSchema');
const randomString = require('randomstring')
 

 
exports.run = async(client, msg, args) => {
if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You do not have permission to use this command!')
    var user = msg.mentions.users.first() ||msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You didn\'t mention anyone!');

    const punishmentID = randomString.generate(20)
    punishmentIDE = [`${punishmentID}`]
 
    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
 
if(!member) return msg.reply('The user that you mentioned is not in the server');

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

    const guildID = msg.guild.id
    const userID = user.id
    const authorID = msg.author.id
    const today = new Date()
    const time = (today.getMonth()+ 1) + '/' + today.getDate() + '-' + today.getFullYear() + " at " + formatAMPM(new Date)

const reason = args.splice(1).join(' ');
if (reason.length > 100) {
    return msg.reply("Please for me to strike this User in Less than 100 characters!")
}

    if(!reason) return msg.reply('You forgot to include a Reason');
    if(msg.author.id === user.id) return msg.reply('You cannot strike yourself!')

    const warningInfoObject = {
        authorID: authorID,
        time: time,
        punishmentID: punishmentID,
        reason: reason,
    }

    var warnEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`${user} has been successfully strike.`)
        .setFooter('This message will auto-delete in 10 seconds.')
      var sendEmbed= await msg.channel.send(warnEmbed);
       msg.delete()
       setTimeout(() => {
       sendEmbed.delete()
        }, 10000);


        const Channel = msg.guild.channels.cache.find(c => c.id === '1055548447719166012') //ADD YOUR CHANNEL NAME HERE
        const logEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle("A Member Was strike")
        .setDescription("striked Information Displayed Below:")
        .addField("Member strike:", `<@${userID}> **|** \`${userID}\``)
        .addField("strike Author:", `<@${authorID}> **|** \`${authorID}\``)
        .addField("Reason:", `\`${reason}\``)
        .addField("Punishment ID:", `\`${punishmentID}\``)
        .addField("Time", time)
        Channel.send(logEmbed)


        await mongo().then(async (mongoose)=> {
            try {
                const warnData = {
                    guildID,
                    userID,
                    punishmentIDE: punishmentIDE,
                    warningInfo: warningInfoObject,
                }
                await new warnSchema(warnData).save()
            } finally {
                mongoose.connection.close()
            }
        })
    

    var embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle("You were strike by Alone Utilities")
    .addField("Server:", 'Alone\'s World')
    .addField("Reason:", `${reason}`)
    .addField("Punishment ID:", `\`${punishmentID}\``);
    try {
    user.send(embed)
    }catch(err) {
    console.warn(err);
        }
        }