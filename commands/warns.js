const mongo = require('../mongo')
const Discord = require('discord.js')
const warningsSchema = require('../schema/warnSchema')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
        var target = msg.member 
          if(msg.mentions.users.first() || args[0]) {
                return msg.reply("You do not have permission to view the warnings of other users!")
          }
          var member;
    try {
            member = await msg.guilde.members.fetch(target);
        } catch(err) {
            member = null;
        }
        var userID = target.id
    member = msg.guild.members.cache.get(userID)

        await mongo().then(async (mongoose) => {

            var results = await warningsSchema.find({
             guildID: guildID,
            userID: userID,
            })

         var Array2 = []
        
            var num = results.length + 1 
        for(let i = 1; i < num; i++) {
            
            Array2.push({
                reason: results[i - 1]["warningInfo"][0]["reason"],
                authorID: results[i - 1]["warningInfo"][0]["authorID"],
                time: results[i - 1]["warningInfo"][0]["time"],
                punishmentID: results[i - 1]["warningInfo"][0]["punishmentID"],
            })
        }





            let reply = `Tip: Use the \`>clearwarn\` command to clear all warnings for a user!\n\n`
        
        for (const warningObject of Array2) {
            const { authorID, time, reason, punishmentID } = warningObject

            reply += `**Warn author:** Undisclosed Information Due To Lack Of Permission: \`MANAGE MESSAGES\`\n\n**Time** **${time}**\n\n **Reason for warn:** \`${reason}\`\n\n**Punishment ID:** \`${punishmentID}\`\n\n\n`

            var warne = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`All Warning Information For ${member.user.tag}:`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${reply}`)
            .setFooter(`${client.user.username}`)
            .setTimestamp();
        }
            msg.channel.send(warne).catch(error => {
                if(error.code == 50006) {
                    msg.channel.send("User have no strikes.")
                }
            })


        
        })
    }
    if(msg.member.hasPermission('MANAGE_MESSAGES')) {
        
        var target = msg.guild.members.cache.get(args[0])
        if (!target) {
            target = msg.member
        }
        var member;
        try {
                member = await msg.guild.members.fetch(target);
        } catch(err) {
            member = null;
        }
        var guildID = msg.guild.id
        var mentione = msg.mentions.users.first()
        var mention = mentione ? mentione.id : args[0]
       var userID = mention ? mention : msg.author.id

       member = msg.guild.members.cache.get(userID)

       if(!msg.guild.member(userID)) {
           return msg.reply("Please specify a valid user mention or ID!")
       }

       await mongo().then(async (mongoose) => {
           try {
             var results = await warningsSchema.find({
                 guildID: guildID,
                userID: userID,
             })

             var Array2 = []

                var num = results.length + 1
            for(let i = 1; i < num; i++) {

                Array2.push({
                    reason: results[i - 1]["warningInfo"][0]["reason"],
                    authorID: results[i - 1]["warningInfo"][0]["authorID"],
                    time: results[i - 1]["warningInfo"][0]["time"],
                    punishmentID: results[i - 1]["warningInfo"][0]["punishmentID"],
                })
            }





            let reply = `Tip: Use the \`>clearwarn\` command to clear all warnings for a user!\n\n`

        for (const warningObject of Array2) {
            const { authorID, time, reason, punishmentID } = warningObject

            reply += `**Punishment ID:** \`${punishmentID}\` | **Moderator:** <@${authorID}>\n**Strike:** ${reason} - **${time}**\n\n`

            var warne = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`All Warning Information For ${member.user.tag}:`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${reply}`)
            .setFooter(`${client.user.username}`)
            .setTimestamp();
    }
            msg.channel.send(warne).catch(error => {
                if(error.code == 50006) {
                    msg.channel.send("User have no strikes.")
                }
            })




        } finally {
            mongoose.connection.close()
        }


    })
}
}