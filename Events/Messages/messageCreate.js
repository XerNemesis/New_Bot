const { EmbedBuilder, RequestManager } = require("discord.js");
const Levels = require("discord.js-leveling");
const canvafy = require("canvafy");

module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (!message.guild || message.author.bot) return;
     //   if (message.content.length < 3) return;

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);

            const levelUp = await new canvafy.LevelUp()
            .setAvatar(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", "https://cdnb.artstation.com/p/assets/images/images/035/460/893/large/leaphymoon-ahjin-guild4.jpg?1615020451")
            .setUsername(message.author.username)
            .setBorder("#000000")
            .setAvatarBorder("#ff0000")
            .setOverlayOpacity(0.7)
            .setLevels((user.level -1), user.level)
            .build();

            message.reply({ files: [{attachment: levelUp, name: `levelUp-${message.author.id}.png`}]});
        }
    }
}