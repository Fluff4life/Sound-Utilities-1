const config = require('./config.json');
const Discord = require('discord.js')
const ms = require('ms');
const client = new Discord.Client();
const Fs = require('fs');
const { sinDependencies } = require('mathjs');
const db = require ('quick.db')



client.on('ready',  async() => {
    console.log('Bot is now Online!')
    const statusArray = ['the news, LISTENING', `Spotify, LISTENING` , 'Mods in the closet, WATCHING' , 'for rule breakers,  WATCHING', `out for staff apps, WATCHING` , 'Giveaways, WATCHING', 'COVID-19, WATCHING' ,`#general chat, WATCHING`, 'LATEST COVID-19 info, WATCHING', `no, PLAYING`]
    setInterval(() => {
    const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
    const status = random[0]
    const mode = random[1]
    client.user.setActivity(status, {type: mode})
    }, 16000)
    
}) 

client.events = new Discord.Collection();
require('./handlers/event_handler')(client);
 

client.on('message', async(msg) => {
        
    if(msg.content.length >= 300 && !msg.member.hasPermission('ADMINISTRATOR')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
    msg.delete();
    msg.reply(`${animebonk} sending bulks messages is probhited. Continuing will result in a mute.`)
    var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

    if(!warnsJSON[msg.author.id]) {
        warnsJSON[msg.author.id] = {
            warns: 0
        }

        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
    }

    warnsJSON[msg.author.id].warns += 1
    Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


    setTimeout(function() {

        warnsJSON[msg.author.id].warns -= 1
        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
    }, ms('24h'))

    var warnEm = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle(`You've been warned in ${msg.guild.name}`)
    .setDescription('You have recieved a warning from the moderation system')
    .addField('Reason' , '[AutoMod] Sending bulks.')
    .addField('Expires' , '1 day')

    try {
        msg.author.send(warnEm)

    } catch(err) {

    }


    if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
        var mutedEm = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
        msg.channel.send(mutedEm)

        const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
        const user = msg.member
        user.roles.add(muteRole.id)

        var yougotmuted = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`You've been muted in ${msg.guild.name}`)
        .setDescription('You have been muted after 3 infractions')
        .addField('Reason' , '[Automod] Exceeding 3 warnings.')
        .addField('Expires' , '6 hours')

        try {

            msg.author.send(yougotmuted)

        }catch(err) {

        }

        setTimeout(function () {
            user.roles.remove(muteRole.id)
        }, ms('6h'));

    }
return;
}

if(msg.content === "!verify" && msg.channel.id === "") { //ADD YOUR VERIFY CHANNEL ID HERE
    msg.delete()
    const verified = msg.guild.roles.cache.find(r => r.name === "Verified")
    msg.member.roles.add(verified)
}
if(msg.channel.id === "" && msg.content !== "!verify") {
    return msg.delete()
}


if(msg.mentions.users.size > 4 && !msg.member.hasPermission('MANAGE_MESSAGES')) {
    var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
    var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')


msg.delete()
 msg.reply(`${animebonk} you are not allowed mention more than **4** people. Continuing will result in a mute.`)
var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
        

if(!warnsJSON[msg.author.id]) {
    warnsJSON[msg.author.id] = {
        warns: 0
    }

    Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
}

warnsJSON[msg.author.id].warns += 1
Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


setTimeout(function() {

    warnsJSON[msg.author.id].warns -= 1
    Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
}, ms('24h'))

var warnEm2 = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTitle(`You've been warned in ${msg.guild.name}`)
.setDescription('You have recieved a warning from the moderation system')
.addField('Reason' , '[Automod] Mentioning more than 4 people.')
.addField('Expires' , '1 day')

try {
    msg.author.send(warnEm2)

} catch(err) {

}


if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
    var mutedEm2 = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
    msg.channel.send(mutedEm)

    const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
    const user = msg.member
    user.roles.add(muteRole.id)

    var yougotmuted2 = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle(`You've been muted in ${msg.guild.name}`)
    .setDescription('You have been muted after 3 infractions')
    .addField('Reason' , '[Automod] Exceeding 3 warnings.')
    .addField('Expires' , '6 hours')

    try {

        msg.author.send(yougotmuted2)

    }catch(err) {

    }

    setTimeout(function () {
        user.roles.remove(muteRole.id)
    }, ms('6h'));

}
return;
} 





//ANTI LINE SPAM
try {
    var lineArray = msg.content.match(/\n/g);
    var number = lineArray.length
     if(number >= 5 && !msg.member.hasPermission('MANAGE_MESSAGES')) {
        var animeBonk = msg.guild.emojis.cache.find(emoji => emoji.name === 'animebonk');
     
     
        msg.delete() 
        msg.reply(`${animebonk} sending text blocks or large messages is prohibited. Continuing will result in a mute.`)
    
        var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
        
    
        if(!warnsJSON[msg.author.id]) {
            warnsJSON[msg.author.id] = {
                warns: 0
            }
    
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }
    
        warnsJSON[msg.author.id].warns += 1
        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
    
    
        setTimeout(function() {
    
            warnsJSON[msg.author.id].warns -= 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }, ms('24h'))
    
        var warnEm3 = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`You've been warned in ${msg.guild.name}`)
        .setDescription('You have recieved a warning from the moderation system')
        .addField('Reason' , '[AutoMod] Sending text blocks or large messages.')
        .addField('Expires' , '1 day')

        try {
            msg.author.send(warnEm3)

        } catch(err) {

        }


        if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
            var mutedEm3 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
            msg.channel.send(mutedEm)

            const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
            const user = msg.member
            user.roles.add(muteRole.id)

            var yougotmuted3 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You've been muted in ${msg.guild.name}`)
            .setDescription('You have been muted after 3 infractions')
            .addField('Reason' , '[Automod] Exceeding 3 warnings.')
            .addField('Expires' , '6 hours')

            try {

                msg.author.send(yougotmuted3)

            }catch(err) {

            }

            setTimeout(function () {
                user.roles.remove(muteRole.id)
            }, ms('6h'));
  
        }
      }
        
    }catch(err){
         
    } 

    function isValidURL(string) {
        var res = string.match(/(https(s)?:\/\/)?(tenor|tenorr)(\.com|(app)?\.com\/)\/([^ ]+)\/?/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('CHANGE_NICKNAME') && msg.channel.id  !==('')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
 
 
        msg.delete()
         msg.reply(`${animebonk} you are not allowed to send tenor links in this channel. Continuing will result in a mute.`)
         var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

         if(!warnsJSON[msg.author.id]) {
             warnsJSON[msg.author.id] = {
                 warns: 0
             }

             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }

         warnsJSON[msg.author.id].warns += 1
         Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


         setTimeout(function() {

             warnsJSON[msg.author.id].warns -= 1
             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }, ms('24h'))

         var warnEm5 = new Discord.MessageEmbed()
         .setColor('YELLOW')
         .setTitle(`You've been warned in ${msg.guild.name}`)
         .setDescription('You have recieved a warning from the moderation system')
         .addField('Reason' , '[AutoMod] Sending tenor links')
         .addField('Expires' , '1 day')

         try {
             msg.author.send(warnEm5)

         } catch(err) {

         }


         if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
             var mutedEm5 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
             msg.channel.send(mutedEm5)

             const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
             const user = msg.member
             user.roles.add(muteRole.id)

             var yougotmuted4 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setTitle(`You've been muted in ${msg.guild.name}`)
             .setDescription('You have been muted after 3 infractions')
             .addField('Reason' , '[Automod] Exceeding 3 warnings.')
             .addField('Expires' , '6 hours')

             try {

                 msg.author.send(yougotmuted4)

             }catch(err) {

             }

             setTimeout(function () {
                 user.roles.remove(muteRole.id)
             }, ms('6h'));
   
         }
     return;
     }
    
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/)?(discord|dsc)(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('MANAGE_MESSAGES') && msg.channel.id  !==('')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
 
 
        msg.delete()
         msg.reply(`${animebonk} you are not allowed to send invite links in this channel. Continuing will result in a mute.`)
         var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

         if(!warnsJSON[msg.author.id]) {
             warnsJSON[msg.author.id] = {
                 warns: 0
             }

             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }

         warnsJSON[msg.author.id].warns += 1
         Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


         setTimeout(function() {

             warnsJSON[msg.author.id].warns -= 1
             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }, ms('24h'))

         var warnEm6 = new Discord.MessageEmbed()
         .setColor('YELLOW')
         .setTitle(`You've been warned in ${msg.guild.name}`)
         .setDescription('You have recieved a warning from the moderation system')
         .addField('Reason' , '[AutoMod] Sending Tenor links.')
         .addField('Expires' , '1 day')

         try {
             msg.author.send(warnEm6)

         } catch(err) {

         }


         if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
             var mutedEm6 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
             msg.channel.send(mutedEm6)

             const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
             const user = msg.member
             user.roles.add(muteRole.id)

             var yougotmuted4 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setTitle(`You've been muted in ${msg.guild.name}`)
             .setDescription('You have been muted after 3 infractions')
             .addField('Reason' , '[Automod] Exceeding 3 warnings.')
             .addField('Expires' , '6 hours')

             try {

                 msg.author.send(yougotmuted4)

             }catch(err) {

             }

             setTimeout(function () {
                 user.roles.remove(muteRole.id)
             }, ms('6h'));
   
         }
     return;
     }
    
    
    
    

      function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/)?(discord|dsc)(\.gg|(app)?\.gift\/giift|\.gaft)\/([^ ]+)\/?/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('MANAGE_MESSAGES') && msg.channel.id  !==('')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')

        msg.delete()
        msg.reply(`${animebonk} you are not allowed to send nitro links in this channel. Continuing will result in a mute.`)
        var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

        if(!warnsJSON[msg.author.id]) {
            warnsJSON[msg.author.id] = {
                warns: 0
            }

            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }

        warnsJSON[msg.author.id].warns += 1
        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


        setTimeout(function() {

            warnsJSON[msg.author.id].warns -= 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }, ms('24h'))

        var warnEm5 = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`You've been warned in ${msg.guild.name}`)
        .setDescription('You have recieved a warning from the moderation system')
        .addField('Reason' , '[AutoMod] Sending nitro gift.')
        .addField('Expires' , '1 day')

        try {
            msg.author.send(warnEm5)

        } catch(err) {

        }


        if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
            var mutedEm5 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
            msg.channel.send(mutedEm)

            const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
            const user = msg.member
            user.roles.add(muteRole.id)

            var yougotmuted16 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You've been muted in ${msg.guild.name}`)
            .setDescription('You have been muted after 3 infractions')
            .addField('Reason' , '[Automod] Exceeding 3 warnings.')
            .addField('Expires' , '6 hours')

            try {

                msg.author.send(yougotmuted16)

            }catch(err) {

            }

            setTimeout(function () {
                user.roles.remove(muteRole.id)
            }, ms('6h'));
  
        }
    return;
    }

      function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/)?(youtube|youtube)(\.com|(com)?\.watch\/watch|\?v=)\/([^ ]+)\/?/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('EMBED_LINKS') && msg.channel.id  !==('')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
 
        msg.delete()
        msg.reply(`${animebonk} you are not allowed to send youtube links in this channel. Continuing will result in a mute.`)
        var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

        if(!warnsJSON[msg.author.id]) {
            warnsJSON[msg.author.id] = {
                warns: 0
            }

            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }

        warnsJSON[msg.author.id].warns += 1
        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


        setTimeout(function() {

            warnsJSON[msg.author.id].warns -= 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }, ms('24h'))

        var warnEm10 = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`You've been warned in ${msg.guild.name}`)
        .setDescription('You have recieved a warning from the moderation system')
        .addField('Reason' , '[AutoMod] Sending youtube links.')
        .addField('Expires' , '1 day')

        try {
            msg.author.send(warnEm10)

        } catch(err) {

        }


        if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
            var mutedEm5 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
            msg.channel.send(mutedEm)

            const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
            const user = msg.member
            user.roles.add(muteRole.id)

            var yougotmuted130 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You've been muted in ${msg.guild.name}`)
            .setDescription('You have been muted after 3 infractions')
            .addField('Reason' , '[Automod] Exceeding 3 warnings.')
            .addField('Expires' , '6 hours')

            try {

                msg.author.send(yougotmuted130)

            }catch(err) {

            }

            setTimeout(function () {
                user.roles.remove(muteRole.id)
            }, ms('6h'));
  
        }
    return;
    }
    
    

      function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/)?(discord|dsc)(\.gg|(app)?\.gift\/giift|\.gaft)\/([^ ]+)\/?/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('MANAGE_MESSAGES') && msg.channel.id  !==('')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
 
        msg.delete()
        msg.reply(`${animebonk} you are not allowed to send nitro links in this channel. Continuing will result in a mute.`)
        var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

        if(!warnsJSON[msg.author.id]) {
            warnsJSON[msg.author.id] = {
                warns: 0
            }

            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }

        warnsJSON[msg.author.id].warns += 1
        Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


        setTimeout(function() {

            warnsJSON[msg.author.id].warns -= 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        }, ms('24h'))

        var warnEm8 = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(`You've been warned in ${msg.guild.name}`)
        .setDescription('You have recieved a warning from the moderation system')
        .addField('Reason' , '[AutoMod] Sending nitro links')
        .addField('Expires' , '1 day')

        try {
            msg.author.send(warnEm8)

        } catch(err) {

        }


        if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
            var mutedEm5 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
            msg.channel.send(mutedEm)

            const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
            const user = msg.member
            user.roles.add(muteRole.id)

            var yougotmuted13 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You've been muted in ${msg.guild.name}`)
            .setDescription('You have been muted after 3 infractions')
            .addField('Reason' , '[Automod] Exceeding 3 warnings.')
            .addField('Expires' , '6 hours')

            try {

                msg.author.send(yougotmuted13)

            }catch(err) {

            }

            setTimeout(function () {
                user.roles.remove(muteRole.id)
            }, ms('6h'));
  
        }
    return;
    }

    
    
    
    
    
    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.hasPermission('MANAGE_MESSAGES') && msg.channel.id  !==('ADMINISTRATOR')) {
        var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
        var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')

          msg.delete();
         msg.reply(`${animebonk} you are not allowed to send links in this channel. Continuing will result in a mute.`)
         var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

         if(!warnsJSON[msg.author.id]) {
             warnsJSON[msg.author.id] = {
                 warns: 0
             }

             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }

         warnsJSON[msg.author.id].warns += 1
         Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


         setTimeout(function() {

             warnsJSON[msg.author.id].warns -= 1
             Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
         }, ms('24h'))

         var warnEm8 = new Discord.MessageEmbed()
         .setColor('YELLOW')
         .setTitle(`You've been warned in ${msg.guild.name}`)
         .setDescription('You have recieved a warning from the moderation system')
         .addField('Reason' , '[AutoMod] Sending links.')
         .addField('Expires' , '1 day')

         try {
             msg.author.send(warnEm8)

         } catch(err) {

         }


         if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
             var mutedEm9 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
             msg.channel.send(mutedEm9)

             const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
             const user = msg.member
             user.roles.add(muteRole.id)

             var yougotmuted19 = new Discord.MessageEmbed()
             .setColor('YELLOW')
             .setTitle(`You've been muted in ${msg.guild.name}`)
             .setDescription('You have been muted after 3 infractions')
             .addField('Reason' , '[Automod] Exceeding 3 warnings.')
             .addField('Expires' , '6 hours')

             try {

                 msg.author.send(yougotmuted19)

             }catch(err) {

             }

             setTimeout(function () {
                 user.roles.remove(muteRole.id)
             }, ms('6h'));
   
         }
     return;
     }
    
    
    
    
    
    
    

        try{
            var mentionedUser = msg.mentions.users.first()
    
            if(mentionedUser.id === '688608113997381640' && !msg.member.hasPermission('MANAGE_MESSAGES')) {
    var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
    var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')
                msg.delete()
                msg.reply(`${animeBonk}  you are not allowed to ping this user. He is unable to respond to all pings here.`)
    
                var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

                if(!warnsJSON[msg.author.id]) {
                    warnsJSON[msg.author.id] = {
                        warns: 0
                    }
        
                    Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
                }
        
                warnsJSON[msg.author.id].warns += 1
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
        
        
                setTimeout(function() {
        
                    warnsJSON[msg.author.id].warns -= 1
                    Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
                }, ms('24h'))
        
                var warnEm0 = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setTitle(`You've been warned in ${msg.guild.name}`)
                .setDescription('You have recieved a warning from the moderation system')
                .addField('Reason', 'Pinging user')
                .addField('Additional Information' , 'You are not allowed to ping this user. Due to some other work. he does not have the time to respond to pings.')
                .addField('Expires' , '1 day')
        
                try {
                    msg.author.send(warnEm0)
        
                } catch(err) {
        
                }
        
        
                if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                    var mutedEm3 = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
                    msg.channel.send(mutedEm)
        
                    const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
                    const user = msg.member
                    user.roles.add(muteRole.id)
        
                    var yougotmuted0 = new Discord.MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle(`You've been muted in ${msg.guild.name}`)
                    .setDescription('You have been muted after 3 infractions')
                    .addField('Reason' , '[Automod] Exceeding 3 warnings.')
                    .addField('Expires' , '6 hours')
        
                    try {
        
                        msg.author.send(yougotmuted0)
        
                    }catch(err) {
        
                    }
        
                    setTimeout(function () {
                        user.roles.remove(muteRole.id)
                    }, ms('6h'));
          
                }
              }
                
            }catch(err){
                 
            } 
        
    
         var array = ['nigga',]
 
           if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `) && !msg.member.hasPermission('MANAGE_MESSAGES'))){
            var emojiGuild = client.guilds.cache.find(guild => guild.name === '')//ADD YOUR CHANNEL NAME HERE
            var animebonk = emojiGuild.emojis.cache.find(emoji => emoji.name === 'animebonk')


            msg.delete()
            msg.reply(`${animebonk} you are not allowed to send prohibited words in this channel. Continuing will result in a mute.`)
            var warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'))
            

            if(!warnsJSON[msg.author.id]) {
                warnsJSON[msg.author.id] = {
                    warns: 0
                }

                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }

            warnsJSON[msg.author.id].warns += 1
            Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))


            setTimeout(function() {

                warnsJSON[msg.author.id].warns -= 1
                Fs.writeFileSync('./warnInfo.json' , JSON.stringify(warnsJSON))
            }, ms('24h'))

            var warnEm1 = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`You've been warned in ${msg.guild.name}`)
            .setDescription('You have recieved a warning from the moderation system')
            .addField('Reason' , '[AutoMod] Sending prohibited words.')
            .addField('Expires' , '1 day')

            try {
                msg.author.send(warnEm1)

            } catch(err) {

            }


            if(Number.isInteger(warnsJSON[msg.author.id].warns / 3)) {
                var mutedEm8 = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setDescription(`${msg.member.user.username} has been muted for continuous infractions`)
                msg.channel.send(mutedEm8)

                const muteRole = msg.guild.roles.cache.find(r => r.name === 'Muted')
                const user = msg.member
                user.roles.add(muteRole.id)

                var yougotmuted16 = new Discord.MessageEmbed()
                .setColor('YELLOW')
                .setTitle(`You've been muted in ${msg.guild.name}`)
                .setDescription('You have been muted after 3 infractions')
                .addField('Reason' , '[Automod] Exceeding 3 warnings.')
                .addField('Expires' , '6 hours')

                try {

                    msg.author.send(yougotmuted16)

                }catch(err) {

                }

                setTimeout(function () {
                    user.roles.remove(muteRole.id)
                }, ms('12h'));
			
            }
        return;
        }
            
        
        
    
    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;
 
    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
 
    }catch(err) {
    

       


client.on('guildMemberAdd' , async(member) => {

let warnsJSON = JSON.parse(Fs.readFileSync('./warnInfo.json'));
  warnsJSON[member.id] = {
                warns: 0
            }
            Fs.writeFileSync('./warnInfo.json', JSON.stringify(warnsJSON));

})
    }
})


client.login(config.token);