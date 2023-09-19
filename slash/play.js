const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const {QueryType} = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("loads songs from youtube")
        .addSubcommand((subcommand)=>
            subcommand
            .setName("song")
            .setDescription("loads song from url")
            .addStringOption((option)=>option.setName("url").setDescription("the song`s url").setRequired(true))
            )/*
        .addSubcommand((subcommand)=>
            subcommand
            .setName("playlist")
            .setDescription("loads playlist of songs from url")
            .addStringOption((option)=>option.setName("url").setDescription("the playlist`s url").setRequired(true))
            )*/
        .addSubcommand((subcommand)=>
            subcommand
            .setName("search")
            .setDescription("searches for song based on keywords")
            .addStringOption((option)=>option.setName("searchterms").setDescription("the search keywords").setRequired(true))
            ),
        run: async ({client,interaction}) => {
            if(!interaction.member.voice.channel){
                return interaction.editReply("you need to be in a voice channel to use this command!")
            }
            const queue = await client.player.createQueue(interaction.guild.id)
            if(!queue.connection){await queue.connect(interaction.member.voice.channel)}

            let embed = new EmbedBuilder()

            if(interaction.options.getSubcommand() === "song"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url,{
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if(result.tracks.length === 0){
                    return interaction.editReply("no results")
                }
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            } else if(interaction.options.getSubcommand() === "playlist"){
                let url = interaction.options.getString("url")
                const result = await client.player.search(url,{
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if(result.tracks.length === 0){
                    return interaction.editReply("no results")
                }
                const playlist = result.playlist
                await queue.addTracks(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to the Queue`)
                    .setThumbnail(playlist.thumbnail)
            } else if(interaction.options.getSubcommand() === "search"){
                let url = interaction.options.getString("searchterms")
                const result = await client.player.search(url,{
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                if(result.tracks.length === 0){
                    return interaction.editReply("no results")
                }
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            }
            if(!queue.playing) await queue.play()
            await interaction.editReply({
                embeds: [embed]
            })
        }
}