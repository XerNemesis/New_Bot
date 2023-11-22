const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const calins = [
  "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
  "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
  "https://media.giphy.com/media/LIqFOpO9Qh0uA/giphy.gif",
  "https://media.tenor.com/UUDWXyIeKvkAAAAC/hug.gif",
  "https://media.tenor.com/dI_LcyWYuLMAAAAC/hug-anime.gif",
  "https://media.tenor.com/LAyPORbxIQsAAAAC/hug.gif",
  "https://media.tenor.com/kCZjTqCKiggAAAAM/hug.gif",
  "https://media.tenor.com/J7eGDvGeP9IAAAAM/enage-kiss-anime-hug.gif",
  "https://media.tenor.com/IpGw3LOZi2wAAAAM/hugtrip.gif",
  "https://media.tenor.com/9e1aE_xBLCsAAAAM/anime-hug.gif",
  "https://media.tenor.com/H7i6GIP-YBwAAAAM/a-whisker-away-hug.gif",
  "https://media.tenor.com/wUQH5CF2DJ4AAAAM/horimiya-hug-anime.gif",
  "https://media.tenor.com/7oCaSR-q1kkAAAAM/alice-vt.gif",
  "https://media.tenor.com/bLttPccI_I4AAAAM/cuddle-anime.gif",
  "https://media.tenor.com/nd_M3VFwVD0AAAAM/anime-hug.gif",
  "https://media.tenor.com/7wZsxjO2_0YAAAAM/haze-lena.gif",
  "https://media.tenor.com/m_bbfF_KS-UAAAAM/engage-kiss-anime-hug.gif",
  "https://media.tenor.com/3mr1aHrTXSsAAAAM/hug-anime.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hug")
    .setDescription("Fais un câlin à un utilisateur !")
    .addUserOption((option) =>
      option
        .setName("cible")
        .setDescription("À qui veux-tu faire un câlin ?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, member } = interaction;

    const user = options.getUser("cible");

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x025c15)
          .setImage(calins[Math.floor(Math.random() * calins.length)])
          .setDescription(`${member} a fait un câlin à ${user} !`),
      ],
    });
  },
};
