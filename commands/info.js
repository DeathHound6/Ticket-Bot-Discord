const { Bot, Command } = require("../classes.js");
const { MessageEmbed, Message } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

/**
 * Represents an information command
 */
class InfoCommand extends Command {
    /**
     * @param {Bot} client 
     */
    constructor(client) {
        super(client, { name: "info", description: "View information of the bot", userPerms: [], clientPerms: [], aliases: [] });
    }
    /**
     * Run the command
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(message, args) {
        const now = Date.now();
        message.reply({ embed: 
            new MessageEmbed()
            .setTitle("Information")
            .setColor(this.client.config.colours.yellow)
            .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
            .addField("Bot Client", `${this.client.user.tag} (${this.client.user.id})`)
            .addField("Guild Count", this.client.guilds.cache.size)
            .addField("User Count", this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b))
            .addField("Discord API Ping", `${this.client.ws.ping}ms`)
            .addField("Message-Round Ping", `${Date.now() - now}ms`)
            .addField("Uptime", moment.duration(this.client.uptime).format("D [days], H [hours], m [minutes and] s [seconds]"))
        });
    }
}

module.exports = InfoCommand;
