const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'totalban',
    description: "Shows the number of people who are banned from the server",
    usage: ">totalbans",
    category: "Moderator",
	run: async (client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return msg.reply('You do not have Permission to Use this Command')
		message.guild.fetchBans().then((bans) => {
			message.channel.send(`${bans.size} Members Are Banned From the server `);
		});
	},
};