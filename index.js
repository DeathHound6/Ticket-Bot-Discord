const { Bot } = require("./classes.js");
const { Intents } = require("discord.js");
const req = require("require-all");
require("dotenv").config({ path: `${__dirname}/.env`});

const client = new Bot({
  intents: ["GUILD_MEMBERS", Intents.NON_PRIVILEGED] 
});

client.login(client.config.bot.token);

// load all commands
for (let command of Object.values(req(`${__dirname}/commands`))) {
  if (typeof command != "function") continue;
  command = new command(client);
  client.commands.set(command.name, command);
}

// listen to events
for (let event of Object.values(req(`${__dirname}/events`))) {
  if (typeof event != "function") continue;
  event = new event(client);
  event.emitter[event.emit](event.name, (...args) => event.run(...args));
}
