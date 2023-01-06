const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nickname',
    aliases: ['nick'],
    timeout: '0.1',
    usage: '@user <nickname>',
    description: 'Nicknames a user/ Resets nickname of a user.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.reply('Please provide a valid user!');
        var member;
        try {
            member = await msg.guild.members.fetch(user)
        } catch (err) {
            member = null;
        }
        if (member) {
            if (member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You cannot change nickname of a moderator bruh')
        }

        let nickname = args.slice(1).join(" ")
        if (nickname) {
            await user.setNickname(nickname)
            message.channel.send(`Nickname set to \`${nickname}\` of ${user.user.tag}`);
        }

        const channel = message.guild.channels.cache.get('')
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Nicknamed a member.')
        .addField('User:', `${user}`)
        .addField('Nicknamed by:', `${message.author}`)
        .addField('New nickname:', `${nickname}`)
        channel.send(embed)



    }
}