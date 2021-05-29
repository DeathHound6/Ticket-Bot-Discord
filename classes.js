const { Client, Collection, ClientOptions } = require("discord.js");
const EventEmitter = require("events");

/**
 * A custom made Discord client
 */
class Bot extends Client {
  /**
   * @param {ClientOptions} clientOptions 
   */
  constructor(clientOptions) {
    super(clientOptions);
    this.commands = new Collection();
    this.config = new (require("./config.js"))();
    this.db = require("./db.js");
  }
}

/**
 * Represents a bot command
 */
class Command {
  /**
   * @param {Bot} client The Discord client
   * @param {Object} opts Options for the Command
   * @param {String} opts.name
   * @param {String} opts.description
   * @param {String[]} opts.userPerms
   * @param {String[]} opts.clientPerms
   * @param {String[]} opts.aliases
   */
  constructor(client, { name, description = "None", userPerms = [], clientPerms = [], aliases = [] }) {
    if (!(client instanceof Bot)) throw new TypeError("Command clients must be an instance of the Bot class");
    this.client = client;

    if (typeof name != "string") throw new TypeError("Command names must be string");
    this.name = name;

    if (typeof description != "string") throw new TypeError("Command descriptions must be string");
    this.description = description;

    if (!Array.isArray(userPerms) || !userPerms.every(e => typeof e == "string")) 
      throw new TypeError("Command user permissions must be arrays containing only strings");
    this.userPerms = userPerms;

    if (!Array.isArray(clientPerms) || !clientPerms.every(e => typeof e == "string")) 
      throw new TypeError("Command client permissions must be arrays containing only strings");
    this.clientPerms = clientPerms;

    if (!Array.isArray(aliases) || !aliases.every(e => typeof e == "string")) 
      throw new TypeError("Command alaises must be arrays containing only strings");
    this.aliases = aliases;
  }
}

/**
 * Represents an event listener
 */
class Event {
  /**
   * @param {Bot} client The Discord client
   * @param {Object} opts Options for the Event
   * @param {String} opts.name 
   * @param {String} opts.emit
   * @param {EventEmitter} opts.emitter
   */
  constructor(client, { name, emit = "on", emitter = client }) {
    if (!(client instanceof Bot)) throw new TypeError("Event clients must be an instance of the Bot class");
    this.client = client;

    if (typeof name != "string") throw new TypeError("Event names must be string");
    this.name = name;

    if (typeof emit != "string" || !["on", "once"].includes(emit.toLowerCase())) 
      throw new TypeError("Event emits must be either `on` or `once`");
    this.emit = emit.toLowerCase();

    if (!(emitter instanceof EventEmitter)) throw new TypeError("Event emitter must be an instance of an EventEmitter");
    this.emitter = emitter;
  }
}

module.exports = {
  Bot,
  Command,
  Event
}
