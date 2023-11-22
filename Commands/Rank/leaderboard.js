const { SlashCommandBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");

// Assurez-vous d'avoir la police de caractères que vous souhaitez utiliser dans le même répertoire que votre bot ou spécifiez le chemin complet.
registerFont("serpentine.ttf", { family: "serpentine" });

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Get the leaderboard of xp's members."),

    async execute(interaction, client) {
        const { guildId } = interaction;

        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

        if (rawLeaderboard.length < 1) return interaction.reply("Personne n'est encore dans le classement.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const canvas = createCanvas(1200, 543);
        const ctx = canvas.getContext("2d");    

        // Charger l'image du fond
        const backgroundImage = await loadImage("https://static.wikia.nocookie.net/solo-leveling/images/d/de/Knight3.jpg/revision/latest/scale-to-width-down/1200?cb=20210626042220");
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Ajouter un rectangle noir transparent sur le fond
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Noir transparent (avec une opacité de 0.5)
        ctx.fillRect(50, 0, 1100, 543);

        // Écrire du texte sur l'image
        ctx.fillStyle = "#FFFFFF"; // Blanc
        ctx.font = "75px serpentine";
        ctx.fillText("Classement", 300, 50);

        // Écrire les données du classement
        ctx.font = "35px serpentine";
        leaderboard.forEach((entry, index) => {
            const text = `${index + 1}. ${entry.username} - Niveau : ${entry.level} - XP : ${entry.xp.toLocaleString()}`;
            ctx.fillText(text, 70, 100 + (index * 30));
        });

        // Enregistrer l'image sur le disque
        const imageBuffer = canvas.toBuffer("image/png");
        fs.writeFileSync("classement.png", imageBuffer);

        // Répondre avec l'image générée
        return interaction.reply({ files: ["classement.png"] });
    }
}