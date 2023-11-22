const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const calins = [
  "",
  "https://media.tenor.com/Ogthkl9rYBMAAAAM/ichigo-hiro.gif",
  "https://media.tenor.com/ye6xtORyw_8AAAAM/2.gif",
  "https://media.tenor.com/C96g4M5OPsYAAAAM/anime-couple.gif",
  "https://media.tenor.com/_8oadF3hZwIAAAAM/kiss.gif",
  "https://media.tenor.com/YeitcPAdSCYAAAAM/kyo-x-tohru-kiss.gif",
  "https://media.tenor.com/9u2vmryDP-cAAAAM/horimiya-animes.gif",
  "https://media.tenor.com/F02Ep3b2jJgAAAAM/cute-kawai.gif",
  "https://media.tenor.com/lYKyQXGYvBkAAAAM/oreshura-kiss.gif",
  "https://media.tenor.com/ZDqsYLDQzIUAAAAM/shirayuki-zen-kiss-anime.gif",
  "https://media.tenor.com/cKJjPT4OdC0AAAAM/kiss-anime-kiss-anime-couple-gif.gif",
  "https://media.tenor.com/8ln6Z1e-FVYAAAAM/nagumi-koushi-hozumi-serene.gif",
  "https://media.tenor.com/2tB89ikESPEAAAAM/kiss-kisses.gif",
  "https://media.tenor.com/dn_KuOESmUYAAAAM/engage-kiss-anime-kiss.gif",
  "https://media.tenor.com/GAr1rMm39pcAAAAM/anime-hug.gif",
  "https://media.tenor.com/Bw0OLA1NefUAAAAM/anime-chuunibyou.gif",
  "https://media.tenor.com/9OV4Q-nMTxsAAAAM/yosuga-no-sora-anime-kiss.gif",
  "https://media.tenor.com/-tntwZEqVX4AAAAM/anime-kiss.gif",
  "https://media.tenor.com/fVMPQro2eZAAAAAM/anime-kiss.gif",
  "https://media.tenor.com/fiafXWajQFoAAAAM/kiss-anime.gif",
  "https://media.tenor.com/el8DHxNp9IsAAAAM/kiss-anime-love.gif",
  "https://media.tenor.com/fXn_Vgx-92YAAAAM/yuri-kiss.gif",
  "https://media.tenor.com/iVKQga_D3mYAAAAM/kiss-anime-couple.gif",
  "https://media.tenor.com/2guktpM58WcAAAAM/anime-kiss-kyo-x-tohru.gif",
  "https://media.tenor.com/rQ8qlj_oQ-YAAAAM/anime-kiss.gif",
  "https://media.tenor.com/t_4994kXYE8AAAAM/kiss-anime-kiss-anime-couple-gif.gif",
  "https://media.tenor.com/AtcFtesvEcEAAAAM/kissing-anime.gif",
  "https://media.tenor.com/S0qEJi4eE9kAAAAM/lesbian.gif",
  "https://media.tenor.com/LlUh6Wu8YCUAAAAM/anime-kiss.gif",
  "https://media.tenor.com/bXx6PmyjeNIAAAAM/anime-anime-kiss.gif",
  "https://media.tenor.com/TWbZjCy8iN4AAAAM/girl-anime.gif",
  "https://media.tenor.com/sHAz5XMtP0kAAAAM/anime-kiss.gif",
  "https://media.tenor.com/Es8Ln8Lh3Q8AAAAM/kissing-couple.gif",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription("Fais un bisous à un utilisateur !")
    .addUserOption((option) =>
      option
        .setName("cible")
        .setDescription("À qui veux-tu faire un bisous ?")
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
          .setDescription(`${member} a fait un bisous à ${user} !`),
      ],
    });
  },
};
