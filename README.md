# TicketBot Discord
## Setup
This bot was initially created with the MongoDB Database Provider. Switching to another may require some alterations to the base code. 

Ensure you first create a `.env` file, with two string variables named as `token` and `dbURI`. In the place of `token`, place your own [Discord bot token](https://www.writebots.com/discord-bot-token/). 

Also change any of the ID values located at `./config.js`. Each owner ID should be string, being it's own element within the array. Any of the other IDs in this file should be listed as a value in it's object, where the key describes what the ID is for.

If you wish to set this up yourself using mongo, there is a guide [here](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/) to create a mongo cluster, and one [here](https://docs.atlas.mongodb.com/connect-to-cluster/) to find the connection URI (place this value as string inside the `.env` file, in a variable named as `dbURI`).