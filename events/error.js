const { Bot, Event } = require("../classes.js");
const { MessageEmbed } = require("discord.js");

/**
 * Represents an event to handle errors
 */
class ErrorEvent extends Event {
    /**
     * @param {Bot} client 
     */
    constructor(client) {
        super(client, { name: "error", emitter: client, emit: "on" });
    }
    /**
     * Run the listener
     * @param {Error} error 
     */
    async run(error) {
        const channel = this.client.channels.cache.get(this.client.config.channels.errors);
        channel.send({ embed:
            new MessageEmbed()
            .setTitle("Error")
            .setColor(this.client.config.colours.red)
            .addField("Error Message", error.message)
            .setTimestamp()
        });
    }
}

module.exports = ErrorEvent;
