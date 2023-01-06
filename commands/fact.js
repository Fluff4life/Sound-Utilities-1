const Discord = require('discord.js');
const urFact = require('random-facts')

exports.run = (client, msg, args) => {

const RandomFact = new Discord.MessageEmbed()
.setTitle('Random Fact:') 
.setColor('GOLD')
.setDescription(urFact.randomFact())
.setFooter('This Fact is Usefull!')
.setTimestamp();
msg.channel.send(RandomFact)
}