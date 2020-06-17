const Discord = require('discord.js');
const db = require('megadb');
const talkedRecently = new Set();

let MoneyDB   = new db.crearDB("Economy" );
let DiamondDB = new db.crearDB("Diamond" );
let EmeraldDB = new db.crearDB("Emerald" );
let ChestDB   = new db.crearDB("Chests"  );
let VipDB     = new db.crearDB("Vip"     );

exports.run = async (client, msg, args) => {


  const av = msg.author.avatarURL;

  const a = client.emojis.cache.find(emoji => emoji.name === "certoamora"  );
  const b = client.emojis.cache.find(emoji => emoji.name === "estrelaamora");
  
  let user;
if (msg.mentions.users.first()) {
  user = msg.mentions.users.first();
} else {
    user = msg.author;
}

 if(!MoneyDB.tiene(`${user.id}`))
      MoneyDB.establecer(`${user.id}`, {
                            coins      : 0   
                          })

 if(!DiamondDB.tiene(`${user.id}`))
      DiamondDB.establecer(`${user.id}`, {
                            diamonds   : 0   
                          })

 if(!EmeraldDB.tiene(`${user.id}`))
      EmeraldDB.establecer(`${user.id}`, {
                            emeralds   : 0   
                          })

 if(!VipDB.tiene(`${user.id}`))
      VipDB.establecer(`${user.id}`,     {
                            vip        : 'No'    ,
                            background : 'No'    ,
                            color      : 'ffe23d',
                            emoji      : '<a:starR:695362631472513095>'
                          })

 if(!ChestDB.tiene(`${user.id}`))
      ChestDB.establecer(`${user.id}`,   {
                            common     : 0,
                            rare       : 0,
                            legendary  : 0,
                            dev        : 0 
                          })

  let vip        = await VipDB    .obtener(`${user.id}.vip`       );

  let vipEmoji   = await VipDB    .obtener(`${user.id}.emoji`     );

  let vipColor   = await VipDB    .obtener(`${user.id}.color`     );
  let color      = 'be41f4'
  if( vip === 'Yes') color = vipColor

  let vipBack    = await VipDB    .obtener(`${user.id}.background`);
  let background = ' '
  if( vip        === 'Yes') background = vipBack
  if( background === 'No' ) background = ' '
  let thumbnail  = ' '
  if( vip === 'Yes') thumbnail = 'https://cdn.discordapp.com/emojis/698234760396537917.gif?v=1'
 
  let ruby    = await MoneyDB  .obtener(`${user.id}.coins`     );

  let diamond = await DiamondDB.obtener(`${user.id}.diamonds`  );

  let emerald = await EmeraldDB.obtener(`${user.id}.emeralds`  );

  let comubox = await ChestDB  .obtener(`${user.id}.common`    );

  let rarebox = await ChestDB  .obtener(`${user.id}.rare`      );

  let legebox = await ChestDB  .obtener(`${user.id}.legendary` );

  let devebox = await ChestDB  .obtener(`${user.id}.dev`       );
  const s1 = client.emojis.cache.find(emoji => emoji.name === "1amora"   );
  const s2 = client.emojis.cache.find(emoji => emoji.name === "2amora"   );
  const s3 = client.emojis.cache.find(emoji => emoji.name === "3amora"   );
  const s4 = client.emojis.cache.find(emoji => emoji.name === "4amora"   );
  const vt = client.emojis.cache.find(emoji => emoji.name === "setaamora");

  let title = 'Perfil: ' + user.tag;
  if(vip === 'Yes') title = vipEmoji + ' Perfil: ' + user.tag

  let perf = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription("Reaja no emoji da opção desejada!")
    .addField(`${s1} | Stock \n` +
              `${s2} | Daily \n` +
              `${s3} | Shop  \n` +
              `${s4} | Chests`,
              `** **`)
    .setThumbnail(thumbnail)	
    .setColor(color)
    .setImage(background)
    .setTimestamp()
    
    msg.channel.send(perf).then(c => {

    c.react(s1.id).then(() => {
    c.react(s2.id).then(() => {
    c.react(s3.id).then(() => {
    c.react(s4.id).then(() => {
    c.react(vt.id).then(() => {

    })
    })
    })
    })
    })

        let StockFilter    = (reaction, user, )   => reaction.emoji.id === s1.id && user.id === msg.author.id;
        let DailyFilter    = (reaction, user, )   => reaction.emoji.id === s2.id && user.id === msg.author.id;
        let ShopFilter     = (reaction, user, )   => reaction.emoji.id === s3.id && user.id === msg.author.id;
        let ChestsFilter   = (reaction, user, )   => reaction.emoji.id === s4.id && user.id === msg.author.id;
        let VoltarFilter   = (reaction, user, )   => reaction.emoji.id === vt.id && user.id === msg.author.id;
		
        let Stock          = c.createReactionCollector(StockFilter,       { time: 80000 });
		    let Daily          = c.createReactionCollector(DailyFilter,       { time: 80000 });
        let Shop           = c.createReactionCollector(ShopFilter,        { time: 80000 });
        let Chests         = c.createReactionCollector(ChestsFilter,      { time: 80000 });
        let Voltar         = c.createReactionCollector(VoltarFilter,      { time: 80000 });

        Stock.on('collect', r2 => { 

        const rubyE = client.emojis.cache.find(emoji => emoji.name === "ruby"    );
        const dimaE = client.emojis.cache.find(emoji => emoji.name === "diamondR");
        const emerE = client.emojis.cache.find(emoji => emoji.name === "emerald" );

            let stock = new Discord.MessageEmbed()
                .setTitle(`${s1} | Seu Stock`)
                .setDescription(
                `${rubyE} **${ruby} Rubis**\n`      +
                `${dimaE} **${diamond} Diamonds**\n` +
                `${emerE} **${emerald} Emeralds**`)
                .setColor(color)
                .setFooter(user.tag + " • Pág. 1/4", av)
            c.edit(stock) && r2.users.remove(msg.author.id)
        });

        Daily.on('collect', r2 => { 

        let error = new Discord.MessageEmbed()
                .setTitle(`${s2} | Seu Daily`)
                .setDescription(`${a} **||** Aguarde **24 Horas** para usar esse comando novamente!`)
                .setColor(color)
                .setFooter(user.tag + " • Pág. 2/4", av)

        let sucess = new Discord.MessageEmbed()
                .setTitle(`${s2} | Seu Daily`)
                .setDescription(`${a} **||** Você coletou sua recompensa diária com sucesso! Recebeu: **75 Rubis** e **1 Common Box**`)
                .setColor(color)
                .setFooter(user.tag + " • Pág. 2/4", av)

        if (talkedRecently.has(msg.author.id)) {
            c.edit(error) && r2.users.remove(msg.author.id);
        } else {

        MoneyDB.sumar(`${user.id}.coins`, 75) && ChestDB.sumar(`${user.id}.common`, 1).then(
          c.edit(sucess) && r2.users.remove(msg.author.id)
        )

        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 86400000);
            
        }
        });

        Shop.on('collect', r2 => { 

        const rubyE = client.emojis.cache.find(emoji => emoji.name === "ruby"        );
        const dimaE = client.emojis.cache.find(emoji => emoji.name === "diamondR"    );
        const emerE = client.emojis.cache.find(emoji => emoji.name === "emerald"     );
        const commE = client.emojis.cache.find(emoji => emoji.name === "commonbox"   );
        const rareE = client.emojis.cache.find(emoji => emoji.name === "rarebox"     );
        const legeE = client.emojis.cache.find(emoji => emoji.name === "legendarybox");
        const devbE = client.emojis.cache.find(emoji => emoji.name === "devbox"      );
        const vippE = client.emojis.cache.find(emoji => emoji.name === "starR"       );
        const coolE = client.emojis.cache.find(emoji => emoji.name === "certoamora"  );

            let Shop = new Discord.MessageEmbed()
                .setTitle(`${s3} | Seu Shop`)
                .setDescription(
                `${coolE} | Use o comando \`&buy C|R|L|D|Vip\` para comprar o item desejado.\n\n` +

                `**${commE} Common Box - ${rubyE} 300**\n`      +
                `**${rareE} Rare Box - ${dimaE} 40 **\n`      +
                `**${legeE} Legendary Box - ${emerE} 60**\n`       +
                `**${devbE} Dev Box - ${emerE} 99999**\n`    +
                `**${vippE} Vip User - ${emerE} 250**`
                )
                .setColor(color)
                .setFooter(user.tag + " • Pág. 3/4", av)
            c.edit(Shop) && r2.users.remove(msg.author.id)
        });

        Chests.on('collect', r2 => { 

        const commE = client.emojis.cache.find(emoji => emoji.name === "commonbox"   );
        const rareE = client.emojis.cache.find(emoji => emoji.name === "rarebox"     );
        const legeE = client.emojis.cache.find(emoji => emoji.name === "legendarybox");
        const devbE = client.emojis.cache.find(emoji => emoji.name === "devbox"      );

            let chst = new Discord.MessageEmbed()
                .setTitle(`${s4} | Suas Chests`)
                .setDescription(
                `${commE} **${comubox} Common Box**\n`    +
                `${rareE} **${rarebox} Rare Box**\n`      +
                `${legeE} **${legebox} Legendary Box**\n` +
                `${devbE} **${devebox} Dev Box**`
                )
                .setColor(color)
                .setFooter(user.tag + " • Pág. 4/4", av)
            c.edit(chst) && r2.users.remove(msg.author.id)
        });

        Voltar.on('collect', r2 => {
            c.edit(perf) && r2.users.remove(msg.author.id)
    })
  })
}