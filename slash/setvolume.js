const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setvolume")
        .setDescription("sets the volume to the specified number")
        .addNumberOption((option) =>
            option
            .setName("volumenumber")
            .setDescription("value to set volume to")
            .setMinValue(1)
            .setRequired(true)),
run: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guild.id)

    if(!queue || !queue.playing){
        return await interaction.editReply("there are no songs in the queue")
    }
    const volumenumber = interaction.options.getNumber("volumenumber");
    if(volumenumber < Number.MAX_SAFE_INTEGER-1){
        queue.setVolume(volumenumber);
        await interaction.editReply(`volume set to ${volumenumber}`);
    }
    else{
        await interaction.editReply('number too big, i cant ear rape you that hard');
    }
    
}
}