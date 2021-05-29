const { Bot, Event } = require("../classes.js");
const { Message, MessageEmbed } = require("discord.js");

/**
 * Represents an event to handle Discord messages
 */
class MessageEvent extends Event {
  /**
   * @param {Bot} client 
   */
  constructor(client) {
    super(client, {
      name: "message",
      emit: "on",
      emitter: client
    });
  }
  /**
   * Run the listener
   * @param {Message} message
   */
  async run(message) {
    if (message.channel.type == "dm") return;

    let settings = await this.client.db.settings.findOne({ guild: message.guild.id });
    if (!settings) settings = await new this.client.db.settings({ guild: message.guild.id, prefix: this.client.config.bot.prefix }).save();

    const prefix = settings.prefix;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = this.client.commands.find((cmd)=>{ return cmd.aliases.includes(commandName) || cmd.name == commandName });
    if (!command) return;

    // Check author has all permissions
    const cannotUser = [];
    for await (const perm of command.userPerms) 
      if (!message.channel.permissionsFor(message.member).has(perm)) cannotUser.push(perm);
    if (cannotUser.length > 0) 
      return message.reply({ 
        embed: new MessageEmbed()
        .setTitle("Missing Permissions")
        .setColor(this.client.config.colours.red)
        .setDescription("You do not have all the required permissions in this channel")
        .addField("Missing Permissions", cannotUser.map(e => this.client.config.Permissions[e]).join("\n"))
        .setTimestamp()
      });

    // Check client has all permissions
    const cannotClient = [];
    for await (const perm of command.clientPerms) 
      if (!message.channel.permissionsFor(message.guild.me).has(perm)) cannotClient.push(perm);
    if (cannotClient.length > 0) 
      return message.reply({ 
        embed: new MessageEmbed()
        .setTitle("Missing Permissions")
        .setColor(this.client.config.colours.red)
        .setDescription("I do not have all the required permissions in this channel")
        .addField("Missing Permissions", cannotClient.map(e => this.client.config.Permissions[e]).join("\n"))
        .setTimestamp()
      });

    await command.run(message, args).catch(err => this.client.emit("error", err));
  }
}

module.exports = MessageEvent;
