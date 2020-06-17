const Discord = require("discord.js");
const db = require("megadb");
const talkedRecently = new Set();
const math = require("mathjs");

let MoneyDB = new db.crearDB("Economy");

exports.run = async (client, message, args) => {
  const a = client.emojis.cache.find(emoji => emoji.name === "errorbot");

  let user = message.author;

  let pesca = ["1", "2", "3", "4", "5"];

  let pescaresult = Math.floor(Math.random() * pesca.length);

  if (talkedRecently.has(message.author.id)) {
    message.channel.send(
      `${a} || Espere alguns minutos para poder usar o comando **pescar** novamente! - ${message.author}`
    );
  } else {
    let answer;
    try {
      answer = math.evaluate(pesca[pescaresult] + " * 10");
    } catch (err) {
      return message.reply(`**Quantia inválida** ${err}`);
    }

    let perf = new Discord.MessageEmbed()
      .setColor("be41f4")
      .setThumbnail(message.author.avatarURL())
      //.setImage('https://media0.giphy.com/media/2HvoTVcuSOnS0/giphy.gif')
      .setDescription(
        "**" +
          message.author.tag +
          `** | Parabéns, Você pescou \`` +
          pesca[pescaresult] +
          ` pokémon(s) aquático(s)\`!! \nQuantia recebida pela venda dos pokémons: \`${answer} Rubis\``
      )
      .setTimestamp();

    message.channel.send(perf);
    MoneyDB.sumar(`${message.author.id}.coins`, answer);
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 300000);
};
