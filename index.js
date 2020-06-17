/* 

DDDDDDD        EEEEEEEEE  VVV             VVV
DDDDDDDDDD     EEEEEEEEE   VVV           VVV
DDDD    DDD    EEE          VVV         VVV
DDDD      DDD  EEEEEE        VVV       VVV
DDDD      DDD  EEEEEE         VVV     VVV
DDDD    DDD    EEE             VVV   VVV
DDDDDDDDD      EEEEEEEEE        VVV VVV
DDDDDD         EEEEEEEEE          VVV

🍷 Desenvolvido por: NotDev
💸 Source de economia básica com database megadb em .json e fácil de usar/configurar
🗳️ Sugestões de Scripts? Me add: NotDev'ᴮᴸ⁰#0666

💳 Também Vendo 💳
• Script de divulgação
• Apagar mensagens canais/privado
• Bot Anti Raid privado pro seu servidor
• Vendo entrada para a banca R$ 400,00 ( meme, Iroh. Casa comigo )

📚 Como Usar 📚

1 • Coloque a token da conta na pasta config.json
2 • Configure o prefixo desejado na config.json
3 • Seja feliz :)

[Nota] Reclamações/dúvidas? Faça na aba de issues do GitHub! Link: https://github.com/LucianoDeveloper

*/

const Discord = require("discord.js");
const { Client, RichEmbed } = require("discord.js");
const client  = new Discord.Client();
const config  = require("./config.json");
const fs      = require("fs");
const Enmap   = require("enmap");
const db      = require("megadb");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./comandos/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./comandos/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.on("message", async message => {

  let client = Client
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;
  let args    = message.content.split(" ").slice(1);
  let comando = message.content.split(" ")[0];
  comando     = comando.slice(config.prefix.length);

  try {
    let commandFile = require("./comandos/" + comando + ".js");
    commandFile.run(client, message, args);
  } catch (err) {
    console.log(
      `O comando **${comando}** usado por **${message.author.tag} | ${message.author.id}** não existe*`
    );
  }
});

client.on("guildCreate", async guild => {
  console.log(`Entrei no servidor ${guild.name}`);
});

if(!config.token) config.token = "Nothing";
client.login(config.token).catch(() => { console.log(`Token Inválida ::: [${config.token}]`)});
