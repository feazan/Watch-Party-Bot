const Discord = require("discord.js");
const client = new Discord.Client();

const token = "";

client.on("ready", () => {
  console.log("Bot online...");
});

client.on("message", (msg) => {
  if (msg.content === "Hello") {
    msg.reply("Hello, Feazan");
  }
});

client.login(token);
