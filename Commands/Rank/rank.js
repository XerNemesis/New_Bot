const { SlashCommandBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");
const canvafy = require("canvafy");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Get info about someone's rank")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Select the user to get info about their rank.")
        ),

    async execute(interaction) {
        const { options, guildId, user } = interaction;

        const member = options.getMember("user");
        const targetUser = member ? member.user : user; // Utilisateur cible (mentionné ou auteur de la commande)

        const levelUser = await Levels.fetch(targetUser.id, guildId);

        if (!levelUser) return interaction.reply({ content: "Seems like this user has not earned any XP so far." });

        const status = targetUser.presence?.status || "offline";

        const nextLevel = parseInt(Levels.xpFor(levelUser.level + 1));
        const xp = parseInt(levelUser.xp);
        const rank = await new canvafy.Rank()
            .setAvatar(targetUser.displayAvatarURL({ format: "png", dynamic: false, size: 256 }))
            .setBackground("image", "https://cdnb.artstation.com/p/assets/images/images/035/460/893/large/leaphymoon-ahjin-guild4.jpg?1615020451")
            .setUsername(targetUser.username)
            .setBorder("#190C58")
            .setStatus(status)
            .setLevel(levelUser.level)
            .setCurrentXp(xp)
            .setRequiredXp(nextLevel)
            .setBarColor("#190C58")
            .build();

        return interaction.reply({ files: [rank], content: `Rank of ${targetUser.username}` });
    }
};
    