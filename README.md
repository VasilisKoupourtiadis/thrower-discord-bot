# Discord Thrower Bot

I, like many others, play video games. One of many terms that are thrown (no pun intended) around, is "throwing". To put it simply, throwing can mean one of two things:

- Someone is purposely playing bad so that your team loses/fails
- Someone is playing so bad that they might as well be losing on purpose

This bot was specifically made with the latter scenario in mind. Since me and my friends use the word "throwing" on more or less a daily basis when we play together, I thought it could be a fun idea to make a bot that keeps track of our poor performances.

#

#### Uses [MongoDB](https://www.mongodb.com/) for storing data

#### Uses [Mongoose ODM](https://mongoosejs.com/) for writing queries to the database

#### Written in [TypeSCript](https://www.typescriptlang.org/)

#### Hosted on [Cybrancee](https://cybrancee.com/)

## Commands

```
/throwing @user
```

![Alt Text](https://i.imgur.com/5dFtn0C.png)

Takes a discord User object as an argument and a counter is then updated and saved to the database for that user. Returns the following message.

![Alt Text](https://i.imgur.com/ompMmkf.png)

#

```
/check @user
```

![Alt Text](https://i.imgur.com/zz5TRxH.png)

Takes a discord User object as an argument and fetches the specific user information from the database. Returns the following message.

![Alt Text](https://i.imgur.com/2p7RVKE.png)

#

```
/leaderboard
```

![Alt Text](https://i.imgur.com/fdQHVw4.png)

Takes no arguments and returns a list in descending order of the top 3 users that have the most registered throws in the server.

![Alt Text](https://i.imgur.com/myuHsUq.png)

> [!NOTE]
> Any and all blurred information is server-specific information, such as names and IDs, which I did not want to include in this showcase.

> [!IMPORTANT]
> The bot is publicly available so you could techincally invite it to your server if you had an invite-link. However, since this bot's purpose was only to be used in our server, it is tightly coupled to it. If you however did want to download the bot and use it yourself, follow these steps.

## Run Locally

Clone the project

```bash
  git clone https://github.com/VasilisKoupourtiadis/thrower-discord-bot.git
```

Install dependencies

```bash
  npm i
```

Set the following environment variables

`DISCORD_TOKEN` = Your secret bot token

`GUILD_ID` = Discrod server id

`CLIENT_ID` = Your bots id

`CHANNEL_ID` = Primary channel bot posts to

`CONNECTION_STRING` = MongoDB connection string

Build the solution

```bash
  npm run build
```

Start the projet

```bash
  npm run dev
```
