//Library
const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();
const Attachment = require('discord.js').Attachment
const prefix = "!";
let fs = require(`fs`);
//let exp = JSON.parse(fs.readFileSync("./exp.json", "utf8"));
//const YTDL = require("ytdl-core");
const token = "NDE4MDc0NDI0NjQ2OTU5MTE2.DXcRwA._IMunyVdAYzZ7syMY49ZJ82_ysU";
const weather = require('weather-js')
//You'll require to go to discord developers, create a new app, set it as bot user and insert the token to the "token" var to make the bot work.




client.on("ready", () => {
  // Tells if bot is online
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  //Shows in bot's activity on how many servers its currently active on.
  client.user.setActivity(`on ${client.guilds.size} servers`);
});

//Welcomes all newcomers to the discord.
client.on("guildMemberAdd", member => {
  member.guild.channels.get('418076040859090945').send(`Welcome, <@${member.id}>! to my bot show-off discord. To find more about the bot do !help for more commands.`);
});







client.on("guildCreate", guild => {
  // Each time the bot joins a "guild"/server/whatever it'll inform me via console that it has joined that guild + its name, membercount and id. and then it ill update the guild count.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("guildDelete", guild => {
  // When the bot is removed from a guild to inform me and decrease guild count.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


 


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  
  // Avoiding botception.
  if(message.author.bot) return;
  
  // This is so it ignores messages that does not start with prefix. I don't need it but I keep it for good measure.
        //if(message.content.indexOf(.prefix) !== 0) return;
  
  // ARGS = arguments so my commands can get arguments easily. Command just lets me do if(command ==== "commandname"){} so easier commmand making.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  //Commands start
  
  
  
 
  
  if(message.content.startsWith(prefix + "kick")) {
    
    //This line limits the command to the 3 ranks mentioned.
    if(!message.member.roles.some(r=>["Admin", "Staff", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    //Verified for a tagged user.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
        //So I know why the user was kicked, good for tracking of events.
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    //Now we acctualy kick the target. If it fails i'll inform so.
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(message.content.startsWith(prefix + "ban")) {
    // Identical to kick. but its .ban instead of .kick (thanks d.js library)
    if(!message.member.roles.some(r=>["Admin", "Helper"].includes(r.name)) )
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
        //Purge commands deletes a given amount of lines.
    if(!message.member.roles.some(r=>["Admin", "Helper"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    // Gets delete count.
    const deleteCount = parseInt(args[0]);
    
    // This conditions are so the person can't delete only 1 line (aka the command itself), but cannot delete more then 100. If conditions aren't met it'll inform the user.
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    //Here the bot fetches the amount of given messages and then deletes it.
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(message.content.startsWith(prefix + "say")) {
    if(!message.member.roles.some(r=>["Admin", "Helper"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");

    //Takes the argument aka what we want to say.
    const sayMessage = args.join(" ");
    // Deletes the !say command
    message.delete().catch(O_o=>{}); 
    // Says what we wanted for it to say.
    message.channel.send(sayMessage);
}

            //This was my first command acctualy. It's just a simple reply command.
      if(message.content.startsWith(prefix + "ping")){
          return message.reply("pong");
        }
      
          
                

        //Help command to inform the user about all feature it has.
    if(message.content.startsWith(prefix + "help")){
        //Makes an embed.
        const embed = new Discord.RichEmbed()
        .setTitle(`Taskmaster command information panel.`)
        .setColor(9467416)
        .addField(`!roles`, 'A list of all self-assignable roles.')
        .addField(`!voice`, 'More information about temporary voice channels.')
        .addField(`!info`, 'Check bot stats.')
        .addField(`!guild`, `More information about the guild.`)
        .addField(`!user @user`, `More information about the pinged user.`)
        .addField(`!play -YoutubeLink- and !stop`, `Bot joins your voice chat and plays the link given. !stop stops the music playing.`)
        .addField(`!admininfo`, `Shows all staff commands.`)
        message.channel.send({ embed });
    }

    if(message.content.startsWith(prefix + "admininfo")){
      const embed = new Discord.RichEmbed()
      .setTitle(`Admin commands list.`)
      .setColor(9467416)
      .addField(`!ban @user`, `Bans the target. Cannot rejoin.`)
      .addField(`!kick @user`, `Kicks the target out of guild. Can rejoin.`)
      .addField(`!rename @user`, `Changes target's nickname.`)
      .addField('!purge number', `Deletes the amount of messages specified.`)
      .addField(`!say`, `Makes the bot say what you said.`)
      message.channel.send({ embed });
    }




  
    

        //Embed for information about roles. This one was made in second style. (Uglier to do, but wanted to try.)
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
      

     
      
        //Self-assignable roles.
      if(message.content.startsWith(prefix + "general")){
        let General = message.guild.roles.find("name", "General Member");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
        message.reply('Role added!')
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
      //Grants the role needed to acces Dev commands. Will delete the message afterwards.
      if(message.content.startsWith(prefix + "BOT")){
        let BOT = message.guild.roles.find("name", "Helper");
        let member = message.member;
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(BOT).catch(console.error);
        return message.channel.bulkDelete(2);

      }

      
        //Modified command: Searches for the general member rank and removes it. General Member rank is needed to gain acces to server.
      if(message.content.startsWith(prefix + "timeout")){
        if(!message.member.roles.some(r=>["Admin", "Helper"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
        let General = message.guild.roles.find("name", "General Member");
        let member = message.mentions.members.first();
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.removeRole(General).catch(console.error);
      }
      //Unndo and general are kind of similar. However general affects the message author while undo affects the target.
      if(message.content.startsWith(prefix + "undo")){
        if(!message.member.roles.some(r=>["Admin", "Helper"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
        let General = message.guild.roles.find("name", "General Member");
        let member = message.mentions.members.first();
        if(!member)
      return message.reply("Please mention a valid member of this server");
        member.addRole(General).catch(console.error);
      }
      
      
          //Creates temporary channels.
        //Creates temporary 1 voice channel.
      if(message.content.startsWith(prefix + "temp1")){
        message.channel.bulkDelete(1);       

        message.guild.createChannel('temporary_channel1', 'voice').then(channel => channel.setParent(`418072952702238763`))
        message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
    .catch(console.error);
        } 
        //Deletes temporary 1 voice channel.
      if(message.content.startsWith(prefix + "deltemp1")){
        message.channel.bulkDelete(1);
        
       message.guild.channels.find('name', 'temporary_channel1').delete().catch(console.error);
       message.reply('Channel deleted');
      }  

      if(message.content.startsWith(prefix + "temp2")){
        message.channel.bulkDelete(1);
        message.guild.createChannel('temporary_channel2', 'voice').then(channel => channel.setParent(`418072952702238763`))
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
        message.guild.createChannel('temporary_channel3', 'voice').then(channel => channel.setParent(`418072952702238763`))
        message.reply('Channel created! Please use 1 channel per group (Max amount: 3) and delete it afterwards using !deltemp to delete this voice channel. Abusing the command will have consenquences.  ')
    .catch(console.error);
        } 
        
        if(message.content.startsWith(prefix + "deltemp3")){
        message.channel.bulkDelete(1);          
       message.guild.channels.find('name', 'temporary_channel3').delete().catch(console.error);
       message.reply('Channel deleted');
      } 

      
      
        //Uploads files.
          if(message.content.startsWith(prefix + "ichc")){
            message.channel.bulkDelete(1);
                message.channel.send({ files: [new Attachment('./Logo/Logo.png', 'Logo.png')] });
              }
              
        if(message.content.startsWith(prefix + "invitelink")){
          message.channel.send("`Permanent invite link: Discord.me/dcwf`");
        }      
        
          /*
          //EXP system, for every message a person sends they are given 1 point. Once they have enough points, they level up.
          //If they don't have an exp profile in exp.json this will create 1.
          if (!exp[message.author.id]) exp[message.author.id] = {
            exp: 0,
            level: 0
          };
          //Adds exp.
          let userData = exp[message.author.id];
          userData.exp++;
        //level formula
          let curLevel = Math.floor(0.1 * Math.sqrt(userData.exp));
          if (curLevel > userData.level) {
            // level up
            userData.level = curLevel;
            message.reply(`Levelup!**${curLevel}**!`);
          }
            //So you can see your level.
          if (message.content.startsWith(prefix + "level")) {
            message.reply(`Current level: ${userData.level} and your curent exp is ${userData.exp}`);
          }
          //Writes in the exp.json file.
          fs.writeFile("./exp.json", JSON.stringify(exp), (err) => {
            if (err) console.error(err)
          });
          */

          




    //exports.run = message.channel.send(`your random number is ${random}`); Nothing important. Just a fix I wanted to keep.


        //Changes an user's nickname
if(message.content.startsWith(prefix +'rename')){
      let member = message.mentions.members.first();
      let name = args.slice(1).join(' ');
      if(!name)
        return message.reply("Please indicate a new nickname!");
          member.setNickname(name)
          message.channel.send(`Renamed to ${name}`)
  }

    //Current RAM usage information only.
  if(message.content.startsWith(prefix +"ram")){
    const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    message.channel.send(`Approx. RAM usage. ${Math.round(used * 100) / 100} MB`);
  }
   const used = process.memoryUsage().heapUsed / 1024 / 1024

   //MS to human time converter.
  let x = client.uptime;
  let seconds=(x/1000)%60
  let minutes=(x/(1000*60))%60
  let hours=(x/(1000*60*60))%24
  
      //Bot information. 
  if(message.content.startsWith(prefix + "info")){
      const embed = new Discord.RichEmbed()
      .setTitle('Info about: The TaskMaster')
      .setColor(0x00ffff)
      .addField(`Creator:`, `FcGod#8877`)
      .addField(`Approx. current RAM usage.`, `${Math.round(used * 100) / 100} MB`)
      .addField(`Current performance`, `Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
      .addField(`Current servers count:`,`${client.guilds.size}` )
      .addField(`Current uptime`, `${Math.round(hours)} hours, ${Math.round(minutes * 10)/10} minutes, ${Math.round(seconds * 100)/100} seconds.`)

      .setTimestamp()
      message.channel.send({embed});


  }

      //guild information
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

  //user information.
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


 /*
                                     //Memories of music bot. "toLowerCase()" suddenly broke the whole code, I don't know why. It works on my other bots.
                var servers = {}; //universal queue list

                function play(connection, message) {
                    var server = servers[message.guild.id];
                
                    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly" })); /
                    //audioonly filter to save bandwith
                
                    server.queue.shift(); 
                
                    server.dispatcher.on ("end", function() { //Execute function when song is over.
                        if(server.queue[0]) play(connection, messsage); //If there's another song present, play  it.
                        else connection.disconnect(); //If not disconnect from server.
                    });
                }
                switch (args[0].toLowerCase()){ 
                    case "play": //play command
                    message.channel.sendMessage("Playing song") //Informs.
            
                    if(!args[1]) { //If there's no argument..
                        message.channel.sendMessage("No link found. Please give a YT link.");
                        return;
                    }
            
                    if (!message.member.voiceChannel) { //if message sent from someone not in voicechannel return this message
                        message.channel.sendMessage("Please be in a voice channel first or else I cannot play music to you.");
                        return;
                    }
                    if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue: []
                    };
            
                    var server = servers[message.guild.id];
            
                    server.queue.push(args[1]); //adds song to queue
            
                    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                        //if not already connected to voice channel, connect to voicechannel
                        play(connection, message);
                    });
                    
                    break;
            
                    case "skip": //skip case for music
                    var server = servers[message.guild.id];
            
                       if (server.dispatcher) server.dispatcher.end(); 
                
                    break;
            
                    case "stop": //Stop the musicccc.
                    var server = servers[message.guild.id];
                    
                    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                    message.channel.sendMessage("kbye")
                    break;
                };         
    
*/
let cont = message.content.slice(prefix.length).split(" "); // Gets rid of prefix and makes it more readable for bot.
let args1 = cont.slice(1); // In the cont string it gets rid of the command itself, leaving args only
if (message.content.startsWith(prefix + 'weather')) { 

  weather.find({search: args1.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);

      if (result.length === 0){ 
          //Input verifier.
  
          message.reply('**I think this location might not be on planet Earth. Probably in your Fantasy? Please give an existing location!**') 
          return; 
      }

      var current = result[0].current;  
      var location = result[0].location; 
      const embed = new Discord.RichEmbed()
                .setTitle(`ðŸ¤– **Weather for ${current.observationpoint}**`) //Sets title.
                .setFooter(`Weather, Requested by ${message.author.username}`, `${message.author.avatarURL}`) //Message author info.
                .setColor(0x00ffff) 
                .addField('\u200b','**Location Info**') 
                .addField('ðŸ—“ Date', `${current.date}, ${current.shortday}`, true) 
                .addField('ðŸ• Timezone',`UTC ${location.timezone}`, true)
                .addField('ðŸŒ Latitude/Longitude',`Lat ${location.lat}Â° / Long ${location.long}Â°`, true)


                .addField('\u200b','**Weather Conditions**') 
                //\u always calls upon a special character, 200b is a blank one, making a space not as big as blankfield
                .addField('Sky Condition', `${current.skytext}`, true)
                .addField('ðŸŒ¡ Temperature',`${current.temperature} Â°C`, true)
                .addField('ðŸ’© Feels Like', `${current.feelslike} Â°C`, true)
                .addField('ðŸŒŠ Humidity', `${current.humidity} %`, true)
                .addField('ðŸŒ¬ Winds',`${current.winddisplay}`, true)
                .addField('ðŸš¤ Windspeed', `${current.windspeed}`, true)

                .addBlankField()

                message.channel.send({embed});
        });
    }

  





      


});



//THIS SHIT IS HOLY, ANYBODY WHO HAS YOUR TOKEN HAS ACCES TO BOT SO FUCC OFF TO AND MAKE YOUR OWN CONFIG WITH TOKEN MAH BOT
client.login(process.env.BOT_TOKEN);
