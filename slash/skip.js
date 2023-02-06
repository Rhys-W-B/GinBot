const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips current song"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild.id)

        if(!queue || !queue.playing){
            return await interaction.editReply("there are no songs in the queue")
        }

        const currentSong = queue.current
        queue.skip()
        await interaction.editReply({
            embeds:[
                new EmbedBuilder().setDescription(`${currentSong.title} has been skipped!`).setThumbnail(currentSong.thumnail)
            ]
        })
    }
}