const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pauses the music"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild.id)

        if(!queue || !queue.playing){
            return await interaction.editReply("there are no songs in the queue")
        }

        queue.setPaused(true)
        await interaction.editReply("music has been paused! Use '/resume' to resume")
    }
}