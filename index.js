const {Client, GatewayIntentBits} = require('discord.js')
require('dotenv/config')

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready',() => {
    console.log('bot ready!')
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
client.on('messageCreate', message =>{
    if(!message.author.bot && message.author.username == 'Jacktbear04'){
        message.react('🥜')
    }
    if(!message.author.bot){
        
        if(getRandomInt(10) == 10){
            message.react('🥜')
        }
        
    }
})

client.login(process.env.DISCORD_TOKEN)