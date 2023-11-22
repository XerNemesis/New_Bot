const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gayrate')
        .setDescription('Check your gay rate')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to check the gay rate for')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let result;
        if (user.id === '1094173372084146177')
            result = -200;
        else if (user.id === '283369347425107968')
            result = 300;
        else
            result = Math.ceil(Math.random() * 100);
        let response = '';

        if (user) {
            if (user.id === '283369347425107968')
                response = `${user} is ${result}% gay ! Congratulation bro !! :clap: :clap:`;
            else
                response = `${user} is ${result}% gay !`;
        } else {
            response = `You are ${result}% gay !`;
        }

        interaction.reply(response);
    },
};
