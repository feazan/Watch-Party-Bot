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
  let movie = bot_args.join("+");

  // GET movie plot 
  let movieData = async () => {
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${movie}`
    );
    return response.data;
  };

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
    return response.data.items[0].id.videoId;
  };

  
  let data = await movieData();
  let trailerLink = await movieTrailer();
  console.log(data.Plot);
  // msg.channel.send(`${msg.author.username} wants to see ${bot_args.join(" ")}`);
  msg.channel.send(`${msg.author.username} wants to see ${bot_args.join(" ")}
  \nhttp://youtu.be/${trailerLink}
  \n${data.Plot}`);
});

client.login(token);
