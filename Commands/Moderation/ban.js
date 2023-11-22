const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user from the discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to ban.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options, user } = interaction;

        const targetUser = options.getUser("user");
        const reason = options.getString("reason");

        if (user.id === targetUser.id) {
            return interaction.reply("Vous ne pouvez pas vous bannir vous-même.");
        }
        const member = await interaction.guild.members.fetch(targetUser.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't ban ${targetUser.username} since he/she have a higher role.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        const banMessage = `Vous avez été banni du serveur ${interaction.guild.name} avec la raison suivante : ${reason}`;
        await targetUser    .send(banMessage)
            .catch(error => console.error(`Impossible d'envoyer un message en privé à l'utilisateur: ${error}`));

        await member.ban({ reason });
        const embed = new EmbedBuilder()
            .setDescription(`Successfully banned ${targetUser} with reason: ${reason}`)
            .setColor(0x5fb041)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
}