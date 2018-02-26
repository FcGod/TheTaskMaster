//Library
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();
const Attachment = require('discord.js').Attachment
const prefix = "!";




client.on("ready", () => {
  // Tells if bot is online
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  
  client.user.setActivity(`on ${client.guilds.size} servers`);
});

//Auto-Welcomer
client.on("guildMemberAdd", member => {
  member.guild.channels.get('375956654849785857').send("Welcome! Do !general to get access to server and please assign the games you own: Overwatch - !ow, World of Warcraft -!wow, League of Legends -!lol, The Divison - !divison, ");
});







client.on("guildCreate", guild => {
  // For every guild bot joins, this number increases. Also tells the amount of channels + members and etc.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // When bot is kicked from guilt
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


 


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  
  // Avoiding botception.
  if(message.author.bot) return;
  
  // This is so it ignores messages that does not start with prefix. But zozo's request forced me to remove it. Kept it for good measure.
        //if(message.content.indexOf(.prefix) !== 0) return;
  
  // Command, arguments etc separator to avoid bugs.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  //Commands start
  
  if(message.content.startsWith(prefix + "ping")) {
   // Bot performance-reponse time calculator.
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
 
  
  if(message.content.startsWith(prefix + "kick")) {
    
    if(!message.member.roles.some(r=>["Admin", "Staff", "Darklight bot"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    //Verifies if the member exists, first line allows me to @ at user.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
  
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // off with the cuck
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(message.content.startsWith(prefix + "ban")) {
    // legit like kick. Discord uses .bannable or .kickable
    if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // removes all fucking messages to 100 why the fuck idkf
    if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0]);
    
    // OR conds.
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    //this is when the bot goes gypsy mod and steals the comments.
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(message.content.startsWith(prefix + "say")) {
    if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");
    // This deletes the original comment
    message.delete().catch(O_o=>{}); 
    // Here bot acctualy says what you wanted 
    message.channel.send(sayMessage);
}

      //What you see is the IDs of our emojis. Bots cannot use like :woah: so they use the IDs.
      if(message.content.startsWith(prefix + "emojis")){
        return message.reply("<:WOAH:376490001149460481> <:wide_eye_pepe:376539827610320897> <:wendy:376643492497063936> <:uhoh:404180486966083594> <:thonkeggplant:376645376180224011> <:skelebone:376647005038182412> <:shrek:376488325785059331> <:shocked:376645438150803466> <:scott:376539912142454784> <:sad2b:376491326461706241> <:sad_pepe:376539827878756352> <:ppap:376488864975552522> <:PLS:385154701848739840> <:pepeGaaah:376489523326091274> <:pepebanhammer:378516457627189248> <:pedopepe:376489361379688450> <:lennypuff:385156586886135829> <:Lennychu:387520479667159040> <:horo:377511531828477952> <:hitler:376645500985802752> <:hardplant:382964036502945792> <:Gun:404540722444763148> <:fuckyfucky:377950833830264832> <:ExcaliDab:392355778536800260> <:endme:387521755780218880> <:dancingpepe:376489170841108510> <:communismsmiley:387009799985954816> <:clem:376539911945191424> <:Byakuren_Hijiri__2:399622787351707649> <:boobs:385155499047256064> <:BinLaden:392088554890723329> <:bigping:386550649661292544> <:baro:376539912012300298> <:2bthink:404399797391458305> <:2bgasp:376491693408780298> <:2bclimax:376491019702632448>");
      }
        // VIIIKIIIIING
      if(message.content.startsWith(prefix + "bestperson")){
          return message.reply("Its vikin'");
        }
        //useless shit
      
      if(message.content.startsWith(prefix + "banana")){
        return message.reply(" just banana'd YOU!");
      }
      if(message.content.startsWith(prefix + "gifgod")){
        message.channel.sendMessage("It's a GIF Goddess actually, and it's Zozo obv");
      }
          
                


    if(message.content.startsWith(prefix + "help")){
      const embed = {
        "description": "DarkLight Bot help commands.",
        "color": 9467416,
        "timestamp": "2018-01-31T14:06:52.703Z",
        "thumbnail": {
          "url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        "fields": [
          {
            "name": "`!roles`",
            "value": "Information about self-assignable game roles."
          },
          {
            "name": "`!voice`",
            "value": "More information about temporary voice channels."
          },
          {
            "name": "`!ping`",
            "value": "Checks bot response time"
          },
          {
            "name": "`!invitelink`",
            "value": "Permanent invite link"
          },
          {
            "name": "`!bestperson`",
            "value": "`*Mandatory knowledge*`"
          }
        ]
      };
      message.channel.send({ embed });
    }

    if(message.content.startsWith(prefix + "roles")){
      const embed = {
        "description": "Information about self-assignable roles",
        "color": 9467416,
        "timestamp": "2018-01-31T14:06:52.703Z",
        "thumbnail": {
          "url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        "fields": [
          {
            "name": "`!ow`",
            "value": "Grants the overwatch role."
          },
          {
            "name": "`!wow`",
            "value": "Grants the World of Warcraft role."
          },
          {
            "name": "`!lol`",
            "value": "Grants the League of Legends rank."
          },
          {
            "name": "`!divison`",
            "value": "Grats The Divison role."
          }
        ]
      };
      message.channel.send({ embed });

    }
    if(message.content.startsWith(prefix + "voice")){
      const embed = {
        "description": "Information about temporary voice channels",
        "color": 9467416,
        "timestamp": "2018-01-31T14:06:52.703Z",
        "thumbnail": {
          "url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        "fields": [
          {
            "name": "`!tempX`",
            "value": "Instead of `x` put a number from 1 to 3 to create the respective temporary channel. Max 1 of each kind."
          },
          {
            "name": "`!deltempX`",
            "value": "Instead of `x` put a number from 1 to 3 to delete a respective temporayr channel. `Do NOT delete a channel that you didn't make, unless its empty. Trolling will have punishment"
          }
        ]
      };
      message.channel.send({ embed });

    }
      

      //like the banana shit
      
        // the first "let" searches for the rank we tell it too. And the second is just a defition I had to make because memeber can either be the one who said the command or a target.
      if(message.content.startsWith(prefix + "general")){
        let General = message.guild.roles.find("name", "General Member");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
        //This shit just repeats but one for each case so hecc off
      }
      if(message.content.startsWith(prefix + "lol")){
        let General = message.guild.roles.find("name", "League of Legends");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
        return message.reply('Role given!');
      }
      if(message.content.startsWith(prefix + "wow")){
        let General = message.guild.roles.find("name", "World of Warcraft");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
        return message.reply('Role given!');
      }
      if(message.content.startsWith(prefix + "ow")){
        let General = message.guild.roles.find("name", "Overwatch");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
        return message.reply('Role given!');
      }
      if(message.content.startsWith(prefix + "divison")){
        let General = message.guild.roles.find("name", "The Divison");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
          return message.reply('Role given!');
      }
      if(message.content.startsWith(prefix + "BOT")){
        let BOT = message.guild.roles.find("name", "Darklight bot");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(BOT).catch(console.error);
        return message.channel.bulkDelete(2);

      }

      
        //Modified command: Searches for the general member rank to remove it.
      if(message.content.startsWith(prefix + "timeout")){
        if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
        let General = message.guild.roles.find("name", "General Member");
        let member = message.mentions.members.first();
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.removeRole(General).catch(console.error);
      }
      // unmute or general are kinda the same, but general acts on 'author' when unmute acts on target
      if(message.content.startsWith(prefix + "undo")){
        if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
        let General = message.guild.roles.find("name", "General Member");
        let member = message.mentions.members.first();
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
      }
      
      
  
      if(message.content.startsWith(prefix + "temp1")){
        message.channel.bulkDelete(1);        
        message.guild.createChannel('temporary_channel1', 'voice').then(channel => channel.setParent(`375709825100939266`))
        message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
    .catch(console.error);
        } 
      if(message.content.startsWith(prefix + "deltemp1")){
        message.channel.bulkDelete(1);
        
       message.guild.channels.find('name', 'temporary_channel1').delete().catch(console.error);
       message.reply('Channel deleted');
      }  

      if(message.content.startsWith(prefix + "temp2")){
        message.channel.bulkDelete(1);
        message.guild.createChannel('temporary_channel2', 'voice').then(channel => channel.setParent(`375709825100939266`))
        message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
    .catch(console.error);
        } 
      if(message.content.startsWith(prefix + "deltemp2")){
        message.channel.bulkDelete(1);
        
       message.guild.channels.find('name', 'temporary_channel2').delete().catch(console.error);
       message.reply('Channel deleted');
      } 

      if(message.content.startsWith(prefix + "temp3")){
        message.channel.bulkDelete(1);
        message.guild.createChannel('temporary_channel3', 'voice').then(channel => channel.setParent(`375709825100939266`))
        message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
    .catch(console.error);
        } 
        
        if(message.content.startsWith(prefix + "deltemp3")){
        message.channel.bulkDelete(1);          
       message.guild.channels.find('name', 'temporary_channel3').delete().catch(console.error);
       message.reply('Channel deleted');
      } 
      if(message.content.startsWith(prefix + "pantsu")){
        message.channel.bulkDelete(1);
        message.channel.send({ files: [new Attachment('./BotBigEmotes/pk.png', 'pk.png')] });
      }
      if(message.content.startsWith(prefix + "pogchamp")){
    message.channel.bulkDelete(1);
        message.channel.send({ files: [new Attachment('./BotBigEmotes/pogchamp.png', 'pogchamp.png')] });
      }
      if(message.content.startsWith(prefix + "kappa")){
        message.channel.bulkDelete(1);
            message.channel.send({ files: [new Attachment('./BotBigEmotes/kappa.png', 'kappa.png')] });
          }
          if(message.content.startsWith(prefix + "smile")){
            message.channel.bulkDelete(1);
                message.channel.send({ files: [new Attachment('./BotBigEmotes/smile.png', 'smile.png')] });
              }
              if(message.content.startsWith(prefix + "fc")){
                message.channel.bulkDelete(1);
                    message.channel.send({ files: [new Attachment('./BotBigEmotes/fcgod.png', 'fcgod.png')] });
                  }
                  if(message.content.startsWith(prefix + "fu")){
                    message.channel.bulkDelete(1);
                        message.channel.send({ files: [new Attachment('./BotBigEmotes/fu.png', 'fu.png')] });
                      }
                      if(message.content.startsWith(prefix + "froggyban")){
                        message.channel.bulkDelete(1);
                            message.channel.send({ files: [new Attachment('./BotBigEmotes/ban.png', 'ban.png')] });
                          }
        if(message.content.startsWith(prefix + "invitelink")){
          message.channel.send("`Permanent invite link: Discord.me/dcwf`");
        }      
        if(message.content.startsWith(prefix + "sow")){
          message.channel.bulkDelete(1);
          message.guild.createChannel('shadow_of_war', 'text').then(channel => channel.setParent(`403905657142771713`))
          message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
      .catch(console.error);
          } 
          if(message.content.startsWith(prefix + "delsow")){
            message.channel.bulkDelete(1);          
           message.guild.channels.find('name', 'shadow_of_war').delete().catch(console.error);
           message.reply('Channel deleted');
          }  
/*
          if (!exp[message.author.id]) exp[message.author.id] = {
            exp: 0,
            level: 0
          };
          let userData = exp[message.author.id];
          userData.exp++;
        
          let curLevel = Math.floor(0.1 * Math.sqrt(userData.exp));
          if (curLevel > userData.level) {
            // level
            userData.level = curLevel;
            message.reply(`Levelup!**${curLevel}**!`);
          }
        
          if (message.content.startsWith(prefix + "level")) {
            message.reply(`Current level: ${userData.level} and your curent exp is ${userData.exp}`);
          }
          fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
            if (err) console.error(err)
          });
              
          if (message.content === 'Fuck you') {
            message.reply('Fuck you, too!');
          }
            if (message.content === 'fuck you') {
              message.reply('Fuck you, too!')
            }
              if (message.content === 'Fuck You') {
                message.reply('Fuck you, too!')
              } 
              */   
     if (message.content.startsWith(prefix+ 'masterofwaifus')){
        message.channel.send('Blakeeye is the master of waifus <:satanialaugh:412694899532627969>')
     }
     if (message.content.startsWith(prefix + 'forceupdate')){
       message.channel.send('Updated stats.')
     }
     if(message.content.startsWith(prefix + 'SummonRaishin')){
       message.channel.send('I summon thee, Staff Lord, Raishin! I bring thee thy offering. <:FeelsBaghettue:414149667304243202> @Raishin')
     }
     

// Checks if they have talked recently



// Checks if they have talked recently



  if(message.content.startsWith(prefix + 'Grant')){
    if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
        let Dev = message.guild.roles.find("name", "Dev");


      await member.addRole(Dev)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} was granted acces by ${message.author.tag}`);


  }

  if(message.content.startsWith(prefix + 'Restrict')){
    if(!message.member.roles.some(r=>["Admin", "Darklight bot"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
        let Dev = message.guild.roles.find("name", "Dev");


      await member.removeRole(Dev)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${message.author.tag} removed ${message.user.tag}'s access to bottest`);
  }

    //exports.run = message.channel.send(`your random number is ${random}`);
if(message.content.startsWith(prefix +'rename')){
      let member = message.mentions.members.first();
      let name = args.slice(1).join(' ');
      if(!name)
        return message.reply("Please indicate a new nickname!");
          member.setNickname(name)
          message.channel.send(`Renamed to ${name}`)
  }


  if(message.content.startsWith(prefix +"ram")){
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    message.channel.send(`Approx. RAM usage. ${Math.round(used * 100) / 100} MB`);
  }
   const used = process.memoryUsage().heapUsed / 1024 / 1024
  
  let x = client.uptime;
  let seconds=(x/1000)%60
  let minutes=(x/(1000*60))%60
  let hours=(x/(1000*60*60))%24
  
  
  if(message.content.startsWith(prefix + "info")){
      const embed = new Discord.RichEmbed()
      .setTitle('Info about: The TaskMaster')
      .setColor(0x00ffff)
      .addField(`Approx. current RAM usage.`, `${Math.round(used * 100) / 100} MB`)
      .addField(`Creator:`, `FcGod#8877`)
      .addField(`Current servers count:`,`${client.guilds.size}` )
      .addField(`Current uptime`, `${Math.round(hours)} hours, ${Math.round(minutes * 10)/10} minutes, ${Math.round(seconds * 100)/100} seconds.`)

      .setTimestamp()
      message.channel.send({embed});
//IF YOU DO MATH.ROUND(TARGET (* 100) / 100) YOU GET DECIMAL (FOR EVERY 0 YOU GET EXTRA DECIMAL, 3 DECIMALS 3 0S)

  }
  
  if(message.content.startsWith(prefix + "guild")){
    
    const embed = new Discord.RichEmbed()
  
    .setTitle('Guild info')
    .addField('Guild name:', `${message.guild.name}`)
    .addField('Guild owner:', `${message.guild.owner}`)
    .addField('Creation Date', `${message.guild.createdAt}`)
    .addField('Server location:', `${message.guild.region}`)
    .addField('Server ID', `${message.guild.id}`)
    .addField('Member count:', `${message.guild.memberCount}`)
    .addField('Is server online?: ', `${message.guild.available}`)
    .addField('Server Icon', `${message.guild.iconURL}`)
    .setTimestamp()
    message.channel.send({embed});
  }
  if(message.content.startsWith(prefix + "user")) {
  let user = message.mentions.users.first();
  let member = message.mentions.members.first();
    if(!user)
      return message.reply('Mention who you want to find more about')
    if(!member)
      return message.reply('Mention who you want to find more about')  
  const embed = new Discord.RichEmbed()
  .setTitle(`Info about ${user.tag}`)
  .setColor(0x00AE86)
  .addField(`Joined discord at:`,`${user.createdAt}`)
  .addField(`Joined server at:`, `${member.joinedAt}`)
  .addField('Nickname: ', `${member.displayName}`)
  .addField('Role:', `${member.highestRole}`)
  .addField('Mute status:', `${member.serverMute}`)
  .addField('Status:',`${user.presence.status}`)
  .addField('Pic:', `${user.displayAvatarURL}`)
  .setFooter(`ID: ${user.id}`)
  .setTimestamp()
  message.channel.send({embed});
 }

  




      


});



//THIS SHIT IS HOLY, ANYBODY WHO HAS YOUR TOKEN HAS ACCES TO BOT SO FUCC OFF TO AND MAKE YOUR OWN CONFIG WITH TOKEN MAH BOT
client.login(process.env.BOT_TOKEN);
