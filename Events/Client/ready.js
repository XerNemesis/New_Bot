const {Client} = require('discord.js');
const config = require("../../config.json");
const mongoose = require('mongoose');
const Levels = require("discord.js-leveling");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        await mongoose.connect(config.mongodb || '', {

        });
        if (mongoose.connect) {
            console.log('MongoDb connection etablished.');
        }
        Levels.setURL(config.mongodb);
        console.log(`${client.user.username} est maintenant connecté.`);
    }
};