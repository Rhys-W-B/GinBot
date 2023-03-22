const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("rolls a dice with x sides")
        .addStringOption((option) =>
            option
            .setName("die")
            .setDescription("input form: xdy. ex: 1d20")
            .setRequired(true)),
        
    run: async ({client, interaction}) => {
        const string = interaction.options.getString("die")
        let string2 = string.trim();
        const myArr = string2.split("d");
        let amount = parseInt(myArr[0])
        let x = parseInt(myArr[1])
        let val = 0;
        for(let i = 0; i < amount; i++){
            val+=getRandomInt(x);
        }
        await interaction.editReply("rolled "+amount+"d" + x + " and got: " + val)
    }
    
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }