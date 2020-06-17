const Discord = require("discord.js"    );
const db      = require("megadb"        );

let MoneyDB   = new db.crearDB("Economy");
let DiamondDB = new db.crearDB("Diamond");
let EmeraldDB = new db.crearDB("Emerald");
let ChestDB   = new db.crearDB("Chests" );

exports.run = async (client, message, args) => {

  const f   = client.emojis.cache.find(emoji => emoji.name === "errorEi");

  const item = args[0]
  if(!item) return message.channel.send(`${f} | Você precisa fornecer o item que deseja comprar! Exemplo: \`` + '&' + 'buy C|R|L|D|Vip`')

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

  if(!ChestDB.tiene(`${message.author.id}`))
      ChestDB.establecer(`${message.author.id}`, {
                            common   : 0,
                            rare     : 0,
                            legendary: 0,
                            dev      : 0 
                          })

  const ruby = await MoneyDB  .obtener(`${message.author.id}.coins`    );

  const dima = await DiamondDB.obtener(`${message.author.id}.diamonds` );

  const emer = await EmeraldDB.obtener(`${message.author.id}.emeralds` );

  const com  = await ChestDB  .obtener(`${message.author.id}.common`   );

  const rar  = await ChestDB  .obtener(`${message.author.id}.rare`     );

  const leg  = await ChestDB  .obtener(`${message.author.id}.legendary`);

  if (item === 'C') {

  if(ruby <= 39) return message.channel.send(`${f} | Você não tem **Rubis** suficientes!`)

    const rubyE = client.emojis.cache.find(emoji => emoji.name === "ruby"        );
    const commE = client.emojis.cache.find(emoji => emoji.name === "commonbox"   );
    const rareE = client.emojis.cache.find(emoji => emoji.name === "rarebox"     );
    const legeE = client.emojis.cache.find(emoji => emoji.name === "legendarybox");

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **${commE} x1** por **${rubyE} 300 Rubies**`)
      .setThumbnail('http://www.gifmania.co.uk/Objects-Animated-Gifs/Animated-Jewelry/Gemstones/Rubies/Ruby-Diamond-88757.gif')
      .setColor("#be41f4")

    let compra = await message.channel.send(embed);

    compra.react(rubyE.id)                          &&
    ChestDB.sumar(`${message.author.id}.common`, 1) &&
    MoneyDB.restar(`${message.author.id}.coins`, 300);
  }

  if (item === 'R') {

  if(dima <= 39) return message.channel.send(`${f} | Você não tem **Diamonds** suficientes!`)

    const dimaE = client.emojis.cache.find(emoji => emoji.name === "diamondR"    );
    const rareE = client.emojis.cache.find(emoji => emoji.name === "rarebox"     );
    const legeE = client.emojis.cache.find(emoji => emoji.name === "legendarybox");

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **${rareE} x1** por **${dimaE} 40 Diamonds**`)
      .setThumbnail('http://bestanimations.com/Money/Gems/sparkling-diamond-bling-animated-gif-24.gif')
      .setColor("#be41f4")

    let compra = await message.channel.send(embed);

    compra.react(dimaE.id)                          &&
    ChestDB.sumar(`${message.author.id}.rare`, 1)   &&
    DiamondDB.restar(`${message.author.id}.diamonds`, 40);

  }

  if (item === 'L') {

  if(emer <= 59) return message.channel.send(`${f} | Você não tem **Emeralds** suficientes!`)

    const emerE = client.emojis.cache.find(emoji => emoji.name === "emerald"     );
    const legeE = client.emojis.cache.find(emoji => emoji.name === "legendarybox");

    const embed = new Discord.MessageEmbed()
      .setTitle("**Box Comprada**")
      .setDescription(`Você comprou: **${legeE} x1** por **${emerE} 60 Emeralds**`)
      .setThumbnail('http://vignette3.wikia.nocookie.net/sonic/images/3/37/Masteremerald.gif/revision/latest?cb=20150426095505')
      .setColor("#be41f4")
      
    let compra = await message.channel.send(embed);

    compra.react(legeE.id)                               &&
    ChestDB.sumar(`${message.author.id}.legendary`, 1)   &&
    EmeraldDB.restar(`${message.author.id}.emeralds`, 60);

  }

  if (item === 'Vip') {

    const starE = client.emojis.cache.find(emoji => emoji.name === "starR"  );
    const emerE = client.emojis.cache.find(emoji => emoji.name === "emerald");

    if(emer <= 249) return message.channel.send(`${f} | Você não tem **Emeralds** suficientes!`)
    
    const db = require('megadb');

    let VipDB     = new db.crearDB("Vip");

     if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
                            vip        : 'No',
                            background : 'No'
                          })

    const vip = VipDB.obtener(`${message.author.id}.vip`);

    console.log(vip)

    if(vip === 'Yes') return message.channel.send(`${f} | Você já é um usuário Vip!`);

    const embed = new Discord.MessageEmbed()
      .setTitle("**Vip User Comprado**")
      .setDescription(`Você comprou: **${starE} Vip User** por **${emerE} 250 Emeralds**`)
      .setThumbnail('https://cdn.discordapp.com/emojis/695362631472513095.gif?v=1')
      .setColor("#be41f4")

    let compra = await message.channel.send(embed);

    compra.react(starE.id)                       &&
    VipDB.set(`${message.author.id}.vip`, 'Yes') &&
    EmeraldDB.restar(`${message.author.id}.emeralds`, 250)

  }

  if (item === 'D') {
  
    message.channel.send(`${f} | **Você não tem poder suficiente para suportar tal força...**`)

  }
}
