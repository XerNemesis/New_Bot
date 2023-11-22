const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('love')
        .setDescription('Check love compatibility between two users')
        .addUserOption(option =>
            option.setName('user1')
                .setDescription('First user for love meter')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user2')
                .setDescription('Second user for love meter')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        if (!user1 || !user2) {
            return interaction.reply({
                content: "Please provide two different users for the love meter.",
                ephemeral: true
            });
        }

        if (user1.id === user2.id) {
            return interaction.reply({
                content: "You cannot give two identical names!",
                ephemeral: true
            });
        }

        const result = Math.ceil(Math.random() * 100);

        interaction.reply({
            embeds: [
                {
                    title: "💖 Love Meter",
                    description: "See how much they match!",
                    fields: [
                        {
                            name: "User 1",
                            value: user1.toString(),
                            inline: true,
                        },
                        {
                            name: "User 2",
                            value: user2.toString(),
                            inline: true,
                        },
                        {
                            name: "Result",
                            value: `**${user1.tag}** and **${user2.tag}** match **${result}%**`,
                            inline: false,
                        },
                    ],
                }
            ]
        });
    },
};
