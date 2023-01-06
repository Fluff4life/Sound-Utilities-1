const mongo = require('../mongo')
const Discord = require('discord.js')
const warnSchema = require('../schema/warnSchema')
const { Mongoose } = require('mongoose')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;


    const punishmentID = args[0];
    if(!punishmentID) return msg.reply("Please Specify a punishment ID to Clear!")

    await mongo().then(async (mongoose) => {
        try {
            const results = await warnSchema.findOne({
                punishmentIDE: [`${punishmentID}`]
            })

            if(results == null) {
                return msg.channel.send("That is not a Valid ID")
            }
            await warnSchema.deleteMany({
                punishmentIDE: [`${punishmentID}`],

            })
            var punishmentgone = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Punishment has been Cleared!')
            .setDescription(`The warnings with the punishment ID: **${punishmentID}** has been cleared!`)
            .setFooter('Punishment Removed!')
            .setTimestamp()
            msg.channel.send(punishmentgone)


            try {

            } catch(err) {
                console.log(err)
            }
        } finally {
            mongoose.connection.close
        }
    })
}