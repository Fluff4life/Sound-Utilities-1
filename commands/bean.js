const { MessageEmbed } = require('discord.js')

module.exports = {
        name: "bean",
        description: "bean members",
        usage: ">bean <mention member/member id> [reason]",
        aliases: [],
        run: async (bot, message, args) => {
        message.delete();
        
        let warnPermErr = new MessageEmbed()
        .setColor("RED")
        .setDescription("You are not allowed to use this command.")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
            
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.channel.send({embed: 
            {color: "RED",
            description: `Please provide the user to bean!`
            }});
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "[No Reason Provided]";
            
            member.send(`🌱 You have been **beaned**!!!11!1!!!1!11 \n\n__Reason:__ \`${reason}\``)
            .catch(error => message.channel.send({embed: 
            {color: "RED",
            description: `Couldn't Bean the user.`
            }}));
            let warnEmbed = new MessageEmbed()
            .setDescription(`**<@${member.user.id}> **has been **beaned** | \`${member.user.id}\``)
            .setColor("ORANGE")

            //message.channel.send(warnEmbed)
            var msg = await message.channel.send(warnEmbed)

            await msg.react('🌱');
    
        }
}
