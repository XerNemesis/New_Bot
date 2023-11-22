const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specific amount of messages from a user or channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName("amount")
        .setDescription("Amount of messages to clear.")
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Select a user to clear their messages.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        const user = options.getUser("user");

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setColor("#070D5B")
        if (user) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if(msg.author.id === user.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from ${user}.`);
                interaction.reply({embeds: [res]});
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({embeds: [res]});
            });
        }
    }
}