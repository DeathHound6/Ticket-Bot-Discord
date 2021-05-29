/**
 * The Discord client's configuration data
 */
class Config {
  constructor() { }

  /**
   * Returns basic configuration explicitly for the Discord client
   */
  get bot() {
    return {
      token: process.env.token,
      // !! Replace the list of owner IDs if you are setting up a clone for yourself !!
      ownerID: ["571283749652660225"],
      prefix: "."
    }
  }

  /**
   * 
   */
  get channels() {
    return {
      "errors": "848149962483302421"
    }
  }

  /**
   * Returns colour hex codes for embed use
   */
  get colours() {
    return {
      red: "#FF0000",
      yellow: "#FEDD00"
    }
  }

  /**
   * Return all settings for connecting to the database
   */
  get db() {
    return {
      uri: process.env.dbURI,
      opts: {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    }
  }

  /**
   * Return all guild permissions in an easily readable format
   */
  get Permissions() {
    return {
      "ADMINISTRATOR": "Admin",
      "CREATE_INSTANT_INVITE": "Create Invites",
      "KICK_MEMBERS": "Kick Members",
      "BAN_MEMBERS": "Ban Members",
      "MANAGE_CHANNELS": "Manage Channels",
      "MANAGE_GUILD": "Manage Guild",
      "ADD_REACTIONS": "Add Reactions",
      "VIEW_AUDIT_LOG": "View Audit Log",
      "PRIORITY_SPEAKER": "Priority Speaker",
      "STREAM": "Stream",
      "VIEW_CHANNEL": "View Channel",
      "SEND_MESSAGES": "Send Messages",
      "SEND_TTS_MESSAGES": "Send Text-To-Speech",
      "MANAGE_MESSAGES": "Manage Messages",
      "EMBED_LINKS": "Embed Links",
      "ATTACH_FILES": "Attach Files",
      "READ_MESSAGE_HISTORY": "Read Message History",
      "MENTION_EVERYONE": "Mention Everyone",
      "USE_EXTERNAL_EMOJIS": "Use External Emojis",
      "VIEW_GUILD_INSIGHTS": "View Guild Insights",
      "CONNECT": "Connect To Voice",
      "SPEAK": "Speak",
      "MUTE_MEMBERS": "Mute Members",
      "DEAFEN_MEMBERS": "Deafen Members",
      "MOVE_MEMBERS": "Move Members Voice",
      "USE_VAD": "Voice Activity Detection",
      "CHANGE_NICKNAME": "Change Nickname",
      "MANAGE_NICKNAMES": "Manage Nicknames",
      "MANAGE_ROLES": "Manage Roles",
      "MANAGE_WEBHOOKS": "Manage Webhooks",
      "MANAGE_EMOJIS": "Manage Emojis",
      "USE_APPLICATION_COMMANDS": "Use Slash Commands",
      "REQUEST_TO_SPEAK": "Request To Speak"
    }
  }
}

module.exports = Config;
