const Discord = require('discord.js') // scaricare nel terminale, facendo *  npm i discord.js  * 
const client = new Discord.Client({ 
    intents: 32767
});


client.login("OTc3MTEyMzMyNzg4NDUzMzc2.Gam6Rf.coy9vXTpSL6s2hlaGtfAFWIXQ_Hr-GJ-h0lIT4") //inserire al posto della parola "token" il token del bot

client.on("ready", () => {
    console.log("Il bot è andato online!")
})



///////////////////////MESSAGGIO CON LI8NK ED ECC SEMPRE DA COMPILARE SENNò è SEMPRE UGUALE/////////////////////////////////////

client.on("messageCreate", message => {
    if (message.content == "!embed") { // Scrivendo il comando *personalizzabile* verrà mandato l'embed
        const embed = new Discord.MessageEmbed()
            .setTitle("Titolo") //Titolo dell'embed
            .setColor("#34a42d") // Colore principale
            //.setURL("UrlTitolo") //Link sul titolo *opzionale*
            // .setAuthor("Autore") /*OPPURE*/.setAuthor("Autore", "LinkImmagine") //Autore, entrambi opzionali
            .setDescription("Descrizione") //Descrizione dell'embed
            .setThumbnail("https://media.discordapp.net/attachments/1001198743477035059/1003316528541872268/119067387_163742022080838_1791077233205348264_n.png") //Copertina dell'embed piccola in alto
            //Aggiungere elementi
            .setImage("https://media.discordapp.net/attachments/1001198743477035059/1003316528541872268/119067387_163742022080838_1791077233205348264_n.png") //Immagine grande al centro dell'embed *mettere o setImage o setThumbnail*
            .setFooter({text: "TIGER TEAM BOT"}) // Testo piccolino in fondo *opzionale*
            .setTimestamp() //Se mettere o no l'orario di arrivo del messaggio *opzionale*
        message.channel.send({embeds: [embed]})
    }
})

//////////////////KICK////////////////////////////////

client.on("messageCreate", message => {
    if (message.content.startsWith("!kick")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.kickable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.kick()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} kickato`)
                    .setDescription(`Utente kickato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }
})

//////////////////////////BAN//////////////////////////////

client.on("messageCreate", message => {
    if (message.content.startsWith("!ban")) {
        let utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.bannable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.ban()
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} bannato`)
                    .setDescription(`Utente bannato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
    }
})

/////////////////////////UNBAN///////////////////////

client.on("messageCreate", async message => {
    if (message.content.startsWith("!unban")) {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }

        let args = message.content.split(/\s+/);
        let idUtente = args[1]

        if (!idUtente) {
            return message.channel.send("Non hai scritto l'id di nessun utente");
        }

        message.guild.members.unban(idUtente)
            .then(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Utente sbannato")
                    .setDescription("Questo utente è stato sbannato")

                message.channel.send({ embeds: [embed] })
            })
            .catch(() => { message.channel.send("Utente non valido o non bannato") })
    }
})

//BENVENUTO
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    let embed = new Discord.MessageEmbed()
        .setTitle("WELCOME")
        .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)

    client.channels.cache.get("1003049199971082320").send({embeds: [embed]}); 
})
//ADDIO
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    let embed = new Discord.MessageEmbed()
        .setTitle("GOODBYE")
        .setDescription(`Ciao ${member.toString()}, ci rivediamo presto qua in ${member.guild.name}`)

    client.channels.cache.get("1003052640613171240").send({embeds: [embed]}); 
})

//////////////////////MESSAGGIO CHE TI RISCRIVE IL BOT////////////////////////////////////////////////////

client.on("messageCreate", message => {
    if (message.content.startsWith("!custom")) {
        const args = message.content.split(/\s+/);
        let testo;
        testo = args.slice(1).join(" ");
        if (!testo) {
            return message.channel.send("Inserire un messaggio");
        }
        if (message.content.includes("@everyone") || message.content.includes("@here")) {
            return message.channel.send("Non taggare everyone o here");
        }
        message.delete()

        //Messaggio classico
        message.channel.send(testo)

        //Embed
        let embed = new Discord.MessageEmbed()
            .setTitle(`Dice: - ${message.author.username}`)
            .setDescription(testo)

        message.channel.send({embeds: [embed]})
    }
})





