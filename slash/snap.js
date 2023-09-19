const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("snap")
        .setDescription("Thanos Snap"),
    run: async ({client, interaction}) => {
        await interaction.editReply("Not Implemented Yet");
    }
}