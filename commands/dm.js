const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { ownerID } = require('../owner.json');
const {ServerName, BotName} = require("../config.json")

module.exports = {
      name: "dm",
      description: "DM a user in the guild",
      aliases: [],
      run: async (bot, message, args) => {
        message.delete();
//If command not working, change "run" above to "execute", if still not working, this command will not work with your bot.
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !ownerID.includes(message.author.id)) return;


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send({embed: 
            {color: "RED",
            description: "Please provide the user's ID, or mention the User."
            }})
            .then(msg => {
              msg.delete({ timeout: 4000 });
                  });
      if (!args.slice(1).join(" "))
        return message.channel.send({embed: 
            {color: "RED",
            description: "You did not specified the message!"
            }})
            .then(msg => {
              msg.delete({ timeout: 4000 });
                  });

      let DMEmbed = new MessageEmbed()
      .setColor("PURPLE")
      .setAuthor(`${BotName}`, bot.user.displayAvatarURL({ dynamic : true }))
      .setTitle(`You've got a message from ${ServerName}`)
      .addField("Message:", `${args.slice(1).join(" ")}`)
      .addField("Moderator:", `${message.author.tag}`)
      .setFooter(`Your account ID: ${user.user.id}`)
      .setTimestamp();
    
      user.user.send(DMEmbed)

      
        //.send(args.slice(1).join(""))
        .catch(() => message.channel.send({embed: 
            {color: "GRAY",
            description: "Cannot send the message to the user!\n\nPopular Reasons: `User's Dms Off` / `API Error`"
            }}))
        .then(() => message.channel.send({embed: 
            {color: "GREEN",
            description: `Succesfully Sent a Message to <@${user.user.id}>. | \`${user.user.id}\``
            }}));
    },
}
