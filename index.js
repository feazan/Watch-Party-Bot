const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const config = require("./config.json");

const token = config.token;
const prefix = "!wp";

client.on("ready", () => {
  console.log("Bot online...");
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }
  const bot_args = msg.content.slice(prefix.length).trim().split(/ +/g);
  console.log(bot_args);
  let movie = bot_args[0];
  let time = bot_args[1];

  msg.channel.send(`${msg.author.username} wants to see ${movie} at ${time}`);

  let movieData = async () => {
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${movie}`
    );
    return response.data;
  };
  let data = await movieData();
  console.log(data.Plot);
  msg.channel.send(`Plot: ${data.Plot}`);
});

client.login(token);
