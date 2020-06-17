const Discord = require("discord.js");
const db = require("megadb");
const talkedRecently = new Set();

let MoneyDB = new db.crearDB("Economy");

exports.run = async (client, msg) => {
  const a = client.emojis.cache.find(emoji => emoji.name === "errorbot");

  if (!MoneyDB.tiene(`${msg.author.id}`))
    MoneyDB.establecer(`${msg.author.id}`, { coins: 0 });

  let ruby = await MoneyDB.obtener(`${msg.author.id}.coins`);

  if (ruby <= "49")
    return msg.channel.send(
      `${a} || Você não tem rubis o suficiente para girar a gacha! Necessários: **50 Rubis**`
    );

  let user = msg.author;

  if (talkedRecently.has(msg.author.id)) {
    msg.channel.send(
      `${a} || Espere 10 segundos para poder usar a gacha novamente - ${msg.author}`
    );
  } else {
    let roll = [
      "🍌",
      "🍓",
      "🍒",
      "🍊",
      "🍏",
      "🍉",
      "🍇"
      ];

    let reels = Math.floor(Math.random() * roll.length);
    let reels1 = Math.floor(Math.random() * roll.length);
    let reels2 = Math.floor(Math.random() * roll.length);

    let result = "Desculpa, você perdeu.";
    if (reels === reels1 && reels1 === reels2) {
      result = "Parabéns! Você ganhou.";
      MoneyDB.sumar(`${user.id}.coins`, "250");
      user.send(
        "Foi adicionada a quantia de `250 Rubis` a sua carteira por você ter ganho no comando `r!gacha`. Para verificar sua balança, use `r!bal`."
      );
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("🎰 Slot Machine 🎰")
      .setDescription(
        "[ " + roll[reels] + " | " + roll[reels1] + " | " + roll[reels2] + " ]"
      )
      .setColor("#be41f4")
      .setFooter(` ${result}`)
      .setTimestamp();

    await msg.channel.send(embed);

    if (result === "Desculpa, você perdeu.")
      return MoneyDB.restar(`${user.id}.coins`, "50").then(
        msg.channel.send(
          "Você perdeu... Retirei 50 Rubis da sua carteira pela derrota."
        )
      );

    talkedRecently.add(msg.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(msg.author.id);
    }, 10000 /* 300000 */);
  }
};
