const Discord = require("discord.js");
const db = require("megadb");
const talkedRecently = new Set();
const math = require("mathjs");
const cooldown = new Set();

let MoneyDB = new db.crearDB("Economy");

exports.run = async (client, message, args) => {

  const f = client.emojis.cache.find(emoji => emoji.name === "errorbot");

  let user = message.author;

  let random = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let work  = ["Garçom", "DJ", "Traficante", "Secretário", "Caçador", "Entregador", "Gari", "Pedreiro", "Illuminati"];
  
  let workresult  = Math.floor(Math.random() * work .length);
  let randomresult = Math.floor(Math.random() * random.length);

  let trab = work[workresult];
  
  let answer;
  try {
    answer = random[randomresult] * 10;
  } catch (err) {
    return message.reply(`**Quantia inválida** ${err}`);
  }

  if (!MoneyDB.tiene(`${message.author.id}`))
    MoneyDB.establecer(`${message.author.id}`, { coins: 0 })
  if (cooldown.has(message.author.id)) {
      message.delete();
     return message.channel.send(
      `${f} || **Você precisa esperar 5 minutos para usar esse comando!**`
    ); }
  else {     //esse else tem valor de AI
    cooldown.add(message.author.id); //aqui ele tem valor se nao
    setTimeout(() => {
    cooldown.delete(message.author.id);
  },  1000 * 360)
  
  }
  

  let bal = await MoneyDB.obtener(`${user.id}.coins`);

  let perf = new Discord.MessageEmbed()
    .setColor("#be41f4")
    .setDescription(
      message.author.tag       +
        ` | Você trabalhou **` +
        random[randomresult]   +
        ` dias** de **`        +
        trab                   +
        `** e recebeu **`      +
        answer                 +
        ` Rubis**`
    )
    .setTimestamp();

  message.channel.send(perf);

  MoneyDB.sumar(`${user.id}.coins`, answer);

  
};
