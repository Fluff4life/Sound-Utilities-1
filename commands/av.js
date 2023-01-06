const { Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
  name: "av",
  /**
  * @param {Client] client
  * @param {message} message 
  * @param {String[]} args
  */
  run: async(client, message, args) => {
    const member = message.mentions.members.first() || message.member;

    message.channel.send(
        new MessageEmbed()
            .setTitle(`${member.user.tag}'s avatar`)
            .setImage(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('RANDOM')
    )
    }
  }