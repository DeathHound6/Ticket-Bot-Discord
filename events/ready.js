const { Bot, Event } = require("../classes.js");
const { connect } = require("mongoose");

/**
 * Represents an event to handle the Discord client becoming ready
 */
class ReadyEvent extends Event {
  /**
   * @param {Bot} client 
   */
  constructor(client) {
    super(client, {
      name: "ready",
      emit: "on",
      emitter: client
    });
  }
  /**
   * Run the listener
   */
  async run() {
    await connect(this.client.config.db.uri, this.client.config.db.opts);
    console.log(`Ready as ${this.client.user.tag}`);
  }
}

module.exports = ReadyEvent;
