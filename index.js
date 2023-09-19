const { Client, GatewayIntentBits,Collection } = require(`discord.js`);
const dotenv = require("dotenv")
const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const fs = require("fs")
const {Player} = require("discord-player")
const noderequire = require(`node-require`);

dotenv.config()
const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

//music bot stuff
const LOAD_SLASH = process.argv[2] == "load"

const Client_ID = "842408531684622357"
const GUILD_ID = "901689120684929116" //ID for server it will be running in

client.slashcommands = new Collection()
 client.player = new Player(client,{
     ytdlOptions:{
        quality:"highestaudio",
        highWaterMark: 1 << 25
     }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for(const file of slashFiles){
    const slashcmd = require(`./slash/${file}`) 
    // goes to directory and inserts file name, then puts 
    //"contents of file into slash command variable"
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) {commands.push(slashcmd.data.toJSON())}
}

if(LOAD_SLASH){
    const rest = new REST({version: "9"}).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(Client_ID,GUILD_ID),{body: commands})
    .then(()=>{
        console.log("successfully loaded")
        process.exit(0);
    })
    .catch((err)=>{
        if(err){
            console.log(err)
            process.exit(1)
        }
    })
}
else{
    client.on("ready",()=>{
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate",(interaction) => {
        async function handleCommand(){
            if(!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if(!slashcmd) {interaction.reply("Not a valid slash command")} 

            await interaction.deferReply()
            await slashcmd.run({client,interaction})
        }
        handleCommand()
    })
}

//nutting messages
client.on(`ready`,() => {
    console.log(`bot ready!`)
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let isFunctionAllowed = true;
  let gobecount = 0;
client.on(`messageCreate`, message =>{
    if(!message.author.bot && message.author.id == '357981604569808899'){
        if (isFunctionAllowed) {
            isFunctionAllowed = false;
            message.react(`🥜`)
            setTimeout(() => {
              isFunctionAllowed = true;
            }, 10000);
          }
    }
    if(!message.author.bot&&message.author.id == "364085988357701642"){
        gobecount++;
        if(gobecount%10 == 0){
            message.react('<:gobe:1114364659663917186>')
        }
        
    }
    if(!message.author.bot){
        
        if(getRandomInt(50) == 25){
            message.react(`🥜`)
        }
        if(getRandomInt(50) == 12){
            message.react('<:gobe:1114364659663917186>')
        }
    }
    if(!message.author.bot){
        if(message.content == '!quote'){
            try{
                const repliedmessageID = message.reference.messageId
                message.channel.messages.fetch(repliedmessageID)
                    .then(message => client.channels.cache.get('1092845261681873017').send(message.author.username + ":\n" + message.content))
                    .catch(console.error);
            }
            catch(error){
                console.error
            }
            
        }
    }
})

client.login(TOKEN)