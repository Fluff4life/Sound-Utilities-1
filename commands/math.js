const { Client, Message, MessageEmbed } = require("discord.js")
const math = require("mathjs")

module.exports = {
  name: 'math',
  run: async(client, message, args) => {
    try {
      message.channel.send(
        new MessageEmbed()
        .setColor('RANDOM')
        .addField('Question', args.join(" "))
        .addField('Solution', math.evaluate(args.join(" ")))
      )
    } catch (err) {
      return message.channel.send(
        new MessageEmbed()
        .setDescription(':x: | Your question is not valid')
      )
    }
  }
}