<h1 align=center>Watch Party Bot</h1>
<h5 align=center>Let's start watching together.</h5>
<br>

## Overview

This project is an implementation of a **discord bot** which informs the a particular channel on a **discord server** of a **watch party** they'd like to start. The bot **makes API GET requests to OMDb** taking a **movie title** and the response generated contains various data about the film including plot, director, actors, etc. The bot takes **plot** details and returns it to the **server channel** along with a message stating that a user has requested to start a watch party at a specified time.

## Installation

### 1. Clone this repository.

```
git clone https://github.com/Feazan/Watch-Party-Bot.git
```

### 2. Install dependencies.

```
npm install
```

- :zap: [Discord.js](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------) - An NPM package for interacting with discord bots.
- :globe_with_meridians: [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js .
- :🎬: [OMDb](http://www.omdbapi.com/) - The OMDb API is a RESTful web service to obtain movie information.
