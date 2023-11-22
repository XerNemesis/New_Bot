const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a user\'s avatar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to get the avatar for')
                .setRequired(false)
        ),

    async execute(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;

        if (user) {
            const avatarURL = user.displayAvatarURL({ size: 512 });
            return interaction.reply({
                content: `Here is ${user.tag}'s avatar:`,
                embeds: [
                    {
                        title: `${user.tag}'s Avatar`,
                        image: {
                            url: avatarURL,
                        },
                    },
                ],
            });
        } else {
            return interaction.reply('User not found.');
        }
    },
};
