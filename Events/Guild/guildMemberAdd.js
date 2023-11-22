const { TextChannel } = require('discord.js');
const { EmbedBuilder } = require("@discordjs/builders");
const canvafy = require("canvafy");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        try {
            const data = await Schema.findOne({ Guild: member.guild.id });

            if (!data) return;

            const { user, guild } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcome = await new canvafy.WelcomeLeave()
                .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
                .setBackground("image", "https://cdnb.artstation.com/p/assets/images/images/035/460/893/large/leaphymoon-ahjin-guild4.jpg?1615020451")
                .setTitle("Welcome")
                .setDescription("Welcome to Ahjin Guild. Go read the rules please !")
                .setBorder("#2a2e35")
                .setAvatarBorder("#2a2e35")
                .setOverlayOpacity(0.3)
                .build();

            welcomeChannel.send({
                content: `Welcome to you, Hunter ${member}!`,
                files: [{
                    attachment: welcome,
                    name: `welcome-${member.id}.png`
                }]
            });
        } catch (error) {
            console.error(error);
            // Gérer l'erreur ici
        }
    }
}
