const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user from the discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to kick.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("user");
        const reason = options.getString("reason") || "No reason specified";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't kick ${user.username} since he/she have a higher role.`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        const kickMessage = `Vous avez été expulsé du serveur ${interaction.guild.name} avec la raison suivante : ${reason}`;
        await user.send(kickMessage)
            .catch(error => console.error(`Impossible d'envoyer un message en privé à l'utilisateur: ${error}`));   
        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Successfully kicked ${user} with reason: ${reason}`);

        await interaction.reply({ embeds: [embed] });
    }
}