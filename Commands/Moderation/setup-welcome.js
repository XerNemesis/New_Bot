const {Message, Client, SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const welcomeSchema = require("../../Models/Welcome");
const {model, Schema} = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-welcome")
    .setDescription("Set up your welcome message for the discord bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("Channel for the welcome message.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("welcome-message")
        .setDescription("Enter your welcome message.")
        .setRequired(false)
    )
    .addRoleOption(option =>
        option.setName("welcome-role")
        .setDescription("Enter your welcome role.")
        .setRequired(false)
    ),

    async execute(interaction) {
        const { channel, options } = interaction;
    
        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("welcome-message");
        const roleId = options.getRole("welcome-role");
    
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({ content: "I don't have permissions for this.", ephemeral: true });
            return; // Arrêtez l'exécution ici pour éviter les erreurs supplémentaires
        }
    
        try {
            const data = await welcomeSchema.findOne({ Guild: interaction.guild.id });
    
            if (!data) {
                const newWelcome = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Msg: welcomeMessage,
                    Role: roleId ? roleId.id : null,
                });
            }
    
            interaction.reply({ content: "Successfully created a welcome message", ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
        }
    }
}