const { Client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute a member from the discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to unmute.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, user } = interaction;

        const targetUser = options.getUser("user");
        if (user.id === targetUser.id) {
            return interaction.reply("Vous ne pouvez pas vous unmute vous-même.");
        }
        const member = guild.members.cache.get(targetUser.id);

        const errEmbed = new EmbedBuilder()
            .setDescription("Something went wrong. Please try again later.")
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Unmute**")
            .setDescription(`${targetUser} has been successfully unmuted !`)
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });


        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        if (!member.isCommunicationDisabled()) return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        try {
            await member.timeout(null);

            interaction.reply({ embeds: [succesEmbed], ephemeral: false });
            const muteMessage = `Vous avez été unmute sur le serveur ${interaction.guild.name}`;
            await targetUser.send(muteMessage)
                .catch(error => console.error(`Impossible d'envoyer un message en privé à l'utilisateur: ${error}`));
        } catch (err) {
            console.log(err);
        }
    }
}