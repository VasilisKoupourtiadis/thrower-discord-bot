# Discord Thrower Bot

I, like many others, play video games. One of many terms that are thrown (no pun intended) around, is "throwing". To put it simply, throwing can mean one of two things:

- Someone is purposely playing bad so that your team loses/fails
- Someone is playing so bad that they might as well be losing on purpose

This bot was specifically made with the latter scenario in mind. Since me and my friends use the word "throwing" on more or less a daily basis when we play together, I thought it could be a fun idea to make a bot that keeps track of our poor performances.

#

#### Uses [MongoDB](https://www.mongodb.com/) for storing data

#### Uses [Mongoose ODM](https://mongoosejs.com/) for querying the database

#### Written in [TypeSCript](https://www.typescriptlang.org/)

#### Hosted on [Cybrancee](https://cybrancee.com/)

## Commands

```
/throwing @counter-to-update @user-throwing
```

Takes an option of either normal or raid counter which will be incremented as well as a Discord User Object. If the entity exists in the database, the subsequent counter is updated. If not, a new entity is added.

![Alt Text](https://i.imgur.com/dFfsQ2B.png)

#

```
/check @counter-to-check @user-to-be-checked
```

Takes an option of either normal or raid counter as well as a Discord User Object. If the entity does exist in the database, it is fetched regardless of the counter value (could be 0).

![Alt Text](https://i.imgur.com/7wGdM5X.png)

#

```
/leaderboard
```

Takes no arguments and returns a emebed with list in descending order of the top 3 users that have the most registered throws in the server.

![Alt Text](https://i.imgur.com/DtMmrU0.png)

#

```
/reset @counter-to-reset @user-to-reset
```

Takes an option of either normal or raid counter as well as a Discord User Object. The subsequent user's counter will be reset. In order to run this command you either need to be a Guild Owner (the one who owns the server) or have administrator privileges.

![Alt Text](https://i.imgur.com/Sx3FgNb.png)

#

```
/reset-all
```

Takes no arguments. Basically purges your users counters and resets everything back to 0. In order to run this command you either need to be a Guild Owner (the one who owns the server) or have administrator privileges.

![Alt Text](https://i.imgur.com/QzURdgV.png)

#

> [!IMPORTANT]
> The bot is publicly available so you could techincally invite it to your server if you had an invite-link. However, since this bot's purpose was only to be used in our server, it is tightly coupled to it and wouldn't function properly in another server.
