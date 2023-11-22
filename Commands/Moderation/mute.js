const { client, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a member from the discord server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to mute.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("time")
                .setDescription("How long should the user must wait before speaking ?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the mute.")
        ),

    async execute(interaction) {
        const { guild, options, user } = interaction;

        const targetUser = options.getUser("user");
        const reason = options.getString("reason") || "No reason provided";
        if (user.id === targetUser.id) {
            return interaction.reply("Vous ne pouvez pas vous mute vous-même.");
        }
        const member = guild.members.cache.get(targetUser.id);
        const time = options.getString("time");
        const convertedTime = ms(time);

        const errEmbed = new EmbedBuilder()
            .setDescription("Something went wrong. Please try again later.")
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle("**:white_check_mark: Mute**")
            .setDescription(`${targetUser} has been successfully muted !`)
            .addFields(
                { name: "Reason", value: `${reason}`, inline: true },
                { name: "Duration", value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp();

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });


        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        if (!convertedTime)
            return interaction.reply({ embeds: [errEmbed], ephemeral: false });

        try {
            await member.timeout(convertedTime, reason);

            interaction.reply({ embeds: [succesEmbed], ephemeral: false });
            const muteMessage = `Vous avez été mute sur le serveur ${interaction.guild.name} avec la raison suivante : ${reason}`;
            await targetUser.send(muteMessage)
                .catch(error => console.error(`Impossible d'envoyer un message en privé à l'utilisateur: ${error}`));
        } catch (err) {
            console.log(err);
        }

    }
}