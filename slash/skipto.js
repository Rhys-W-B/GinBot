const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to a certain track number")
        .addNumberOption((option) =>
            option
            .setName("tracknumber")
            .setDescription("The track to skip to")
            .setMinValue(1)
            .setRequired(true)),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild.id)

        if(!queue || !queue.playing){
            return await interaction.editReply("there are no songs in the queue")
        }

        const currentSong = queue.current
        
        const trackNum = interaction.options.getNumber("tracknumber")
        if(trackNum > queue.tracks.length){
            return await interaction.editReply("Invalid track number")
        }
        queue.skipTo(trackNum -1)
        await interaction.editReply(`skipped ahead to track number ${trackNum}`)
    }
}