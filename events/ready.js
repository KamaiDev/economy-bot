module.exports = async Client => {
   
    console.log('Bot iniciado com ' + 
                Client.users.cache.size + 
                ' usuários, em ' + 
                Client.channels.cache.size + 
                ' canais de ' + 
                Client.guilds.cache.size + 
                ' servidores.');

}