const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'lockdown',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client , message , args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        
        const role = message.guild.roles.everyone;

        if(!args.length) return message.reply('Please specify a query');

        const query = args[0].toLowerCase();

        if(!['true','false'].includes(query)) 
            return message.reply('The query you specified is not valid');

        const perms = role.permissions.toArray();

        if (query === 'false') {
            perms.push("SEND_MESSAGES");
            console.log(perms)
            await role.edit({ permissions: perms});
            message.channel.send('Unlocked the server.')
        } else{
            let reason = args.slice(1).join(' ') || 'No reason given'

            if(!reason) return message.reply('You must specify a reason to lock channels.!')
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            console.log(newPerms);

            await role.edit({ permissions: newPerms })
           const embed = new Discord.MessageEmbed()
           .setColor('RED')
           .setTitle('Channels are locked down.')
           .setDescription ('You guys are not muted... No one can talk!')
           .addField('Reason:', `${reason}`)
           message.channel.send(embed)

            

        };       
    },
};  