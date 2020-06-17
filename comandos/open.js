const Discord = require("discord.js"    );
const db      = require("megadb"        );

let MoneyDB   = new db.crearDB("Economy");
let DiamondDB = new db.crearDB("Diamond");
let EmeraldDB = new db.crearDB("Emerald");
let ChestDB   = new db.crearDB("Chests" );
let ChannelDB = new db.crearDB("Channel");
let VipDB     = new db.crearDB("Vip"    );
let BackLeDB  = new db.crearDB("BackLe" );

exports.run = async (client, message, args) => {
  
  const f   = client.emojis.cache.find(emoji => emoji.name === "errorbot");

  const box = args[0]
  if(!box) return message.channel.send(`${f} | Você precisa fornecer a box que deseja abrir! Exemplo: \`` + '&' + 'open C|R|L`')

  const rewardC = [
  "1",
  "2",
  "3",
  "4",
  "5"
  ]

  const rewardR = [
  "2",
  "3",
  "4",
  "4",
  "5"
  ]

  const rewardL = [
  "35",
  "36",
  "37",  
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "55",
  "60",
  "63",
  "65",
  "70",
  "75",
  "0" ,
  "http://getwallpapers.com/wallpaper/full/c/d/0/1019338-new-final-fantasy-7-advent-children-wallpaper-1920x1200-full-hd.jpg", // ff7
  "https://media.discordapp.net/attachments/696832082693062706/698239463167361094/20200410_153413.jpg?width=753&height=424", // eilonwy cat's
  "https://media.discordapp.net/attachments/696832082693062706/698242907093860403/e3290a78ec3dabd09c19dc1d27fc6908.jpg?width=678&height=424", // neverland
  "https://wallpapercave.com/wp/cbPIv41.jpg", // metal gear solid
  ]

  const commonR    = rewardC[Math.floor((Math.random() * rewardC.length))]
  const rareR      = rewardR[Math.floor((Math.random() * rewardR.length))]
  const legendaryR = rewardL[Math.floor((Math.random() * rewardL.length))]

 if(!MoneyDB.tiene(`${message.author.id}`))
      MoneyDB.establecer(`${message.author.id}  `, {
                            coins    : 0   
                          })

 if(!DiamondDB.tiene(`${message.author.id}`))
      DiamondDB.establecer(`${message.author.id}`, {
                            diamonds : 0   
                          })

 if(!EmeraldDB.tiene(`${message.author.id}`))
      EmeraldDB.establecer(`${message.author.id}`, {
                            emeralds : 0   
                          })

 if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`,     {
                            vip        : 'No'    ,
                            background : 'No'    ,
                            color      : 'ffe23d',
                            emoji      : '<a:starR:695362631472513095>'
                          })

if(!BackLeDB.tiene(`${message.author.id}`))
      BackLeDB.establecer(`${message.author.id}`,  {
                            ff7        : 'No'    ,
                            cat        : 'No'    ,
                            neverland  : 'No'    ,
                            mgs        : 'No'
                          })

  if(!ChestDB.tiene(`${message.author.id}`))
      ChestDB.establecer(`${message.author.id}`, {
                            common   : 0,
                            rare     : 0,
                            legendary: 0,
                            dev      : 0 
                          })

  const com     = await ChestDB.obtener(`${message.author.id}.common`    );

  const rar     = await ChestDB.obtener(`${message.author.id}.rare`      );

  const leg     = await ChestDB.obtener(`${message.author.id}.legendary` );

  const vipBack = await VipDB  .obtener(`${message.author.id}.background`);

  if (box === 'C') {

  if(com <= 0) return message.channel.send(`${f} | Você não tem **Common Box** suficientes!`)

    const rubyE   = client.emojis.cache.find(emoji => emoji.name === "diamondR" );
    const commonE = client.emojis.cache.find(emoji => emoji.name === "commonbox");
    
    const embed = new Discord.MessageEmbed()
      .setTitle(`${commonE} **Common Box Aberta!**`)
      .setDescription(`Você obteve: **${rubyE} ${commonR} Diamonds**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')

    let compra = await message.channel.send(embed);

    compra.react(rubyE.id)                           &&
    ChestDB.restar(`${message.author.id}.common`, 1) &&
    DiamondDB.sumar(`${message.author.id}.diamonds`, commonR);
  }

  if (box === 'R') {

  if(rar <= 0) return message.channel.send(`${f} | Você não tem **Rare Box** suficientes!`)

    const rareE = client.emojis.cache.find(emoji => emoji.name === "emerald");
    const rareB = client.emojis.cache.find(emoji => emoji.name === "rarebox");
    
    const embed = new Discord.MessageEmbed()
      .setTitle(`${rareB} **Rare Box Aberta!**`)
      .setDescription(`Você obteve: **${rareE} ${rareR} Emeralds**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
      .setColor("#be41f4")

    let compra = await message.channel.send(embed);

    compra.react(rareE.id)                         &&
    ChestDB.restar(`${message.author.id}.rare`, 1) &&
    EmeraldDB.sumar(`${message.author.id}.emeralds`, rareR);

  }

  if (box === 'L') {

  if(leg <= 0) return message.channel.send(`${f} | Você não tem **Legendary Box** suficientes!`)

    const legendaryE = client.emojis.cache.find(emoji => emoji.name === "emerald"     );
    const legendaryB = client.emojis.cache.find(emoji => emoji.name === "legendarybox");
    
    let Background = 'error'

   const embedBackground = new Discord.MessageEmbed()
      .setTitle(`${legendaryB} **Legendary Box Aberta!**`)
      .setDescription(`Você obteve: **🖼 ${Background} Background**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
      .setColor("#be41f4")

      if(legendaryR === 'http://getwallpapers.com/wallpaper/full/c/d/0/1019338-new-final-fantasy-7-advent-children-wallpaper-1920x1200-full-hd.jpg') 
        return message.channel.send(embedBackground.setDescription(`Você obteve: **🖼 Final Fantasy VII Background! Use \`&background extras\` para ver seus backgrounds de edição limitada obtidos**`))   &&
               BackLeDB.set(`${message.author.id}.ff7`, 'Yes');

      if(legendaryR === 'https://media.discordapp.net/attachments/696832082693062706/698239463167361094/20200410_153413.jpg?width=753&height=424')  
        return message.channel.send(embedBackground.setDescription(`Você obteve: **🖼 Eilonwy's Cat Background! Use \`&background extras\` para ver seus backgrounds de edição limitada obtidos**`))       &&
               BackLeDB.set(`${message.author.id}.cat`, 'Yes');
                                    
      if(legendaryR === 'https://media.discordapp.net/attachments/696832082693062706/698242907093860403/e3290a78ec3dabd09c19dc1d27fc6908.jpg?width=678&height=424')  
        return message.channel.send(embedBackground.setDescription(`Você obteve: **🖼 Neverland Background! Use \`&background extras\` para ver seus backgrounds de edição limitada obtidos**`))           &&
               BackLeDB.set(`${message.author.id}.neverland`, 'Yes');

      if(legendaryR === 'https://wallpapercave.com/wp/cbPIv41.jpg') 
        return message.channel.send(embedBackground.setDescription(`Você obteve: **🖼 Metal Gear - Raiden Background! Use \`&background extras\` para ver seus backgrounds de edição limitada obtidos**`)) &&
               BackLeDB.set(`${message.author.id}.mgs`, 'Yes');
    
    const embed = new Discord.MessageEmbed()
      .setTitle("**Legendary Box Aberta!**")
      .setDescription(`Você obteve: **${legendaryE} ${legendaryR} Emeralds**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/688408514053406747/721727354485080084/ChestCopia.gif')
      .setColor("#be41f4")

    let compra = await message.channel.send(embed)

    compra.react(legendaryE.id)                         &&
    ChestDB.restar(`${message.author.id}.legendary`, 1) &&
    EmeraldDB.sumar(`${message.author.id}.emeralds`, legendaryR);

  }

}