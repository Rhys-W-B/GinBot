const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild.id)

        if(!queue || !queue.playing){
            return await interaction.editReply("there are no songs in the queue")
        }

        queue.shuffle()
        await interaction.editReply(`${queue.tracks.length} songs have been shuffled`)
    }
}