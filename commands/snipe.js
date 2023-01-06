const Discord = require('discord.js')
const snipe = new Discord.Collection()
const snipes = new Discord.Collection()
exports.run = async(client,msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return;


    client.on('messageDelete', msg => {
        snipes.set(msg.channel.id, msg)
    })
    
let sniped = snipes.get(msg.channel.id)
if(!sniped) return msg.channel.send("There's nothing to snipe!")

const snipeEmbed = new Discord.MessageEmbed()
.setAuthor(`Message By ${sniped.author.username}`, sniped.author.displayAvatarURL())
.setColor("PURPLE")
.setDescription(sniped.content)
.setFooter('CAUGHT ON 4K CAMERA')
.setTimestamp();

msg.channel.send(snipeEmbed)
}