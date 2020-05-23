const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");
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

  // GET movie data
  let movieData = async () => {
    let movie = escape(bot_args);
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${movie}`
    );
    return response.data;
  };

  // GET movie trailer
  let movieTrailer = async () => {
    let movie = bot_args.join(" ");
    let response = await axios.get("search", {
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        q: `${movie} trailer`,
        part: "snippet",
        type: "video",
        maxResults: 1,
        key: config.youtube_key,
      },
    });
    return response.data.items[0].id.videoId;
  };

  let data = await movieData();
  const embed = new Discord.MessageEmbed()
  
  if (!data.Error) {
    let trailerLink = await movieTrailer();
    console.log(data.Plot);
      embed
      .setTitle("Watch Party")
      .addField("Title", `${data.Title}`)
      .addField("Trailer", `http://youtu.be/${trailerLink}`)
      .addField("Plot", `${data.Plot}`)
      .setColor("0x6C3483")
      .setThumbnail(`${data.Poster}`);
  } else {
      embed
      .setTitle("Watch Party")
      .addField("Error", "Movie not found, please check spelling. Usage:\n > !wp [movie name]")
      .setColor("0x6C3483")
      .setThumbnail("https://image-cdn.neatoshop.com/styleimg/57039/none/black/default/346304-20;1489525731t.jpg");
  }
  msg.channel.send(embed);
});

client.login(token);
