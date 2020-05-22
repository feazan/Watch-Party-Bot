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
  msg.channel.send(`${msg.author.username} wants to see ${bot_args.join(" ")}`);
  let movie = bot_args.join("+");

  // GET movie plot 
  let movieData = async () => {
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${movie}`
    );
    console.log(`http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${movie}`);
    return response.data;
  };
  let data = await movieData();
  console.log(data.Plot);
  msg.channel.send(`${data.Plot}`);

  // GET movie trailer
  let movieTrailer = async () => {
    let response = await axios.get("search", {
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        q: `${movie}+trailer`,
        part: "snippet",
        type: "video",
        maxResults: 1,
        key: config.youtube_key,
      },
    });
    console.log(response.data.items[0].id.videoId);
    return response.data.items[0].id.videoId;
  };
  let trailerLink = await movieTrailer();
  msg.channel.send(`http://youtu.be/${trailerLink}`);


});

client.login(token);
