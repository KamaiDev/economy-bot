const Discord = require("discord.js"    );
const db      = require("megadb"        );

const VipDB   = new db.crearDB("Vip"    );
let BackLeDB  = new db.crearDB("BackLe" );

exports.run = async (client, message, args) => {

  const f = client.emojis.cache.find(emoji => emoji.name === "errorbot");

   if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
                            vip        : 'No',
                            background : 'No',
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

    let vip = await VipDB.obtener(`${message.author.id}.vip`);

    if(vip === 'No') return message.channel.send(`${f} | Apenas usuários **Vip Users** podem usar esse comando!`)

  let { res, res2, res3, res4 } = {
    res : await BackLeDB.obtener(`${message.author.id}.ff7`      ),
    res2: await BackLeDB.obtener(`${message.author.id}.cat`      ),
    res3: await BackLeDB.obtener(`${message.author.id}.neverland`),
    res4: await BackLeDB.obtener(`${message.author.id}.mgs`      )
  }

  if(res  === 'Yes') res  = 'Obtido'
  if(res2 === 'Yes') res2 = 'Obtido'
  if(res3 === 'Yes') res3 = 'Obtido'
  if(res4 === 'Yes') res4 = 'Obtido'

  if(res  === 'No') res  = 'Não Obtido'
  if(res2 === 'No') res2 = 'Não Obtido'
  if(res3 === 'No') res3 = 'Não Obtido'
  if(res4 === 'No') res4 = 'Não Obtido'

  let command = args[0];

  if (!command) {

  const a = client.emojis.cache.find(emoji => emoji.name === "certoamora");

    let info = new Discord.MessageEmbed()
        .setTitle("Animes Backgroud & Códigos", message.author.avatarURL)
        .setDescription(
                        `${a} Use o comando \`&background <código>\` para escolher o background desejado! \n\n` +

                        "Bleach: `YLT9pW`\n"                                                                    +
                        "Naruto: `GK8fyA`\n"                                                                    +
                        "Pokémon: `GR8Hbj`\n"                                                                   +
                        "Hellsing: `w3Q94p`\n"                                                                  +
                        "No Game No Life: `7b9ANC`\n"                                                           +
                        "One Piece: `HtW2XZ`\n"                                                                 +
                        "Kimetsu no Yaiba: `uMkA9v`\n"                                                          +
                        "Goblin Slayer: `a95Ra8`\n"                                                             +
                        "Jojo: `J3VEut`\n"                                                                      +
                        "Fullmetal Alchemist: `euVV7t`\n"                                                       +
                        "Overlord: `c2qERB`\n"                                                                  +
                        "Steins Gate: `4BWcuZ`\n"                                                               +
                        "Death Note: `Qx35UC`"
                       )
        .setColor("#be41f4")

      message.channel.send(info)

  }

  if (command === 'extras') {

  const a = client.emojis.cache.find(emoji => emoji.name === "certoamora");

    let info = new Discord.MessageEmbed()
        .setTitle("Animes Backgroud & Códigos", message.author.avatarURL)
        .setDescription(
                        `${a} Use o comando \`&background F|E|N|M\` para escolher o background desejado! \n\n` +

                        "**F**inal Fantasy VII: `" + res + "`\n"                                                    +
                        "**E**ilonwy's Cat: `" + res2 + "`\n"                                                       +
                        "**N**everland: `" + res3 + "`\n"                                                           +
                        "**M**etal Gear - Raiden: `" + res4 + "`"                                                                
                       )
        .setColor("#be41f4")

    message.channel.send(info)

  }

  if (command === 'YLT9pW') {

    // <-- Bleach -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("http://getwallpapers.com/wallpaper/full/6/4/f/742619-vertical-cool-bleach-wallpapers-1920x1080-for-tablet.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'http://getwallpapers.com/wallpaper/full/6/4/f/742619-vertical-cool-bleach-wallpapers-1920x1080-for-tablet.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'GK8fyA') {

    // <-- Naruto -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://i.ytimg.com/vi/-I7pty3LU98/maxresdefault.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://i.ytimg.com/vi/-I7pty3LU98/maxresdefault.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'GR8Hbj') {

    // <-- Pokémon -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://images7.alphacoders.com/551/551009.png")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://images7.alphacoders.com/551/551009.png').then(
      message.channel.send(embed)
    )

  }

  if (command === 'w3Q94p') {

    // <-- Hellsing -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://www.blogsolute.com/img/2012/09/hellsing.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://www.blogsolute.com/img/2012/09/hellsing.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === '7b9ANC') {

    // <-- No Game No Life -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://images3.alphacoders.com/819/thumb-1920-819294.png")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://images3.alphacoders.com/819/thumb-1920-819294.png').then(
      message.channel.send(embed)
    )

  }

  if (command === 'HtW2XZ') {

    // <-- One Piece -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://www.desktopbackground.org/download/1440x900/2011/06/20/222148_one-piece-hd-wallpapers_1920x1080_h.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://www.desktopbackground.org/download/1440x900/2011/06/20/222148_one-piece-hd-wallpapers_1920x1080_h.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'uMkA9v') {

    // <-- Kimetsu No Yaiba -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://images2.alphacoders.com/100/1007550.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://images2.alphacoders.com/100/1007550.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'a95Ra8') {

    // <-- Goblin Slayer -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://th.bing.com/th?id=OIP.uLPn0f3Yq1MeSQOBbcI1BgHaEK&pid=Api&rs=1")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://th.bing.com/th?id=OIP.uLPn0f3Yq1MeSQOBbcI1BgHaEK&pid=Api&rs=1').then(
      message.channel.send(embed)
    )

  }

  if (command === 'J3VEut') {

    // <-- JOJO -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("http://wallur.com/wp-content/uploads/2016/12/jojo-background-12.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'http://wallur.com/wp-content/uploads/2016/12/jojo-background-12.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'euVV7t') {

    // <-- Fullmetal Alchemist -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://cosmicanvilrecommends.files.wordpress.com/2015/06/fullmetal-alchemist-brotherhood-wallpaper-1920x1080.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://cosmicanvilrecommends.files.wordpress.com/2015/06/fullmetal-alchemist-brotherhood-wallpaper-1920x1080.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'c2qERB') {

    // <-- Overlord -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://wallpapertag.com/wallpaper/full/8/5/b/114945-overlord-anime-wallpaper-1920x1080-for-4k-monitor.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://wallpapertag.com/wallpaper/full/8/5/b/114945-overlord-anime-wallpaper-1920x1080-for-4k-monitor.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === '4BWcuZ') {

    // <-- Steins Gate -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("http://wallpapercave.com/wp/wp1858910.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'http://wallpapercave.com/wp/wp1858910.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'Qx35UC') {

    // <-- Death Note -->

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("http://wallpapercave.com/wp/RNhLMNR.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'http://wallpapercave.com/wp/RNhLMNR.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'F') {

    // <-- Final Fantasy VII: Advent Children - LEGENDARY EDITION -->

    if(res === 'Não Obtido') return message.channel.send(`${f} | Você não tem esse background para equipar! Use \`&background extras\` para verificar seus backgrounds limitados.`)

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("http://getwallpapers.com/wallpaper/full/c/d/0/1019338-new-final-fantasy-7-advent-children-wallpaper-1920x1200-full-hd.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'http://getwallpapers.com/wallpaper/full/c/d/0/1019338-new-final-fantasy-7-advent-children-wallpaper-1920x1200-full-hd.jpg').then(
      message.channel.send(embed)
    )

  }

  if (command === 'E') {

    // <-- Eilonwy's Cat - LEGENDARY EDITION -->

    if(res2 === 'Não Obtido') return message.channel.send(`${f} | Você não tem esse background para equipar! Use \`&background extras\` para verificar seus backgrounds limitados.`)

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://media.discordapp.net/attachments/696832082693062706/698239463167361094/20200410_153413.jpg?width=753&height=424")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://media.discordapp.net/attachments/696832082693062706/698239463167361094/20200410_153413.jpg?width=753&height=424').then(
      message.channel.send(embed)
    )

  }

  if (command === 'N') {

    // <-- Neverland - LEGENDARY EDITION -->

    if(res3 === 'Não Obtido') return message.channel.send(`${f} | Você não tem esse background para equipar! Use \`&background extras\` para verificar seus backgrounds limitados.`)

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://media.discordapp.net/attachments/696832082693062706/698242907093860403/e3290a78ec3dabd09c19dc1d27fc6908.jpg?width=678&height=424")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://media.discordapp.net/attachments/696832082693062706/698242907093860403/e3290a78ec3dabd09c19dc1d27fc6908.jpg?width=678&height=424').then(
      message.channel.send(embed)
    )

  }

  if (command === 'M') {

    // <-- Metal Gear - Raiden - LEGENDARY EDITION -->

    if(res4 === 'Não Obtido') return message.channel.send(`${f} | Você não tem esse background para equipar! Use \`&background extras\` para verificar seus backgrounds limitados.`)

    let embed = new Discord.MessageEmbed()
        .setDescription("Background Alterado Com Sucesso!")
        .setImage("https://wallpapercave.com/wp/cbPIv41.jpg")
        .setColor("#be41f4")

    VipDB.set(`${message.author.id}.background`, 'https://wallpapercave.com/wp/cbPIv41.jpg').then(
      message.channel.send(embed)
    )

  }

}