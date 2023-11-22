const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user who has previously banned")
        .addStringOption(option =>
            option.setName("userid")
                .setDescription("User to unban.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for unban.")
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const userId = options.getString("userid");
        const reason = options.getString("reason") || "no reason provided";

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setDescription(`Succesfully unbanned id ${userId} from the guild for reason: ${reason}`)
                .setColor(0x5fb041)
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Please provide a valid member's ID.`)
                .setColor(0xc72c3b);

            interaction.reply({ embeds: [errEmbed] });
        }
    }
}
