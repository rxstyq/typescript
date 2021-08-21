import Discord from 'discord.js';// {Client, ktlp} alla mpori na xrisimopiisw kialla so kanw import to discord.
import { readdirSync } from 'fs';
import { Command, Event, Config } from '../Interfaces';
import ConfigJson from '../config.json';
import path from 'path';
import { initial } from 'lodash';

class ExtendedClient extends Discord.Client {
    public commands: Discord.Collection<string, Command> = new Discord.Collection();
    public events: Discord.Collection<string, Event> = new Discord.Collection();
    public config: Config = ConfigJson;
    public success: string = "✅";
    public error: string = "❌";
    public buildEmbed: any = function(title, description, color, fields, thumbnail, image, footer){
    const embed = new Discord.MessageEmbed();
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    else embed.setDescription(`No description specified`)
    if(color) embed.setColor(color);
    return embed;
        //Ta alla dn ta thelw pros to paron.
    }
    public handleError: any = async function(error){
    const embed = this.buildEmbed(`Error`, `${error}`, `RED`, null, null, null, null);
    const errorChannel = this.client.channels.cache.get(this.config.errorLogs) || this.client.channels.fetch(this.config.errorLogs);
    if(!error) return;
    else if(errorChannel) return errorChannel.send(embed);
    }

    public async init(){
    this.login(this.config.token);
    console.log(`[ Logging In  ${this.success} ] Loading...`);

    
const ePath = path.join(__dirname, "..", 'Events');;

readdirSync(ePath).forEach(async(file) => {
    const { event } = await import(`${ePath}/${file}`);
    try{ 
    this.events.set(event?.name, event);
    this.on(event.name, event.execute.bind(null, this))
    console.log(`[ Event ${this.success} ] ${event.name}`)
    }catch(er){
        console.log(er)
       if(event?.name) console.log(`[ Command ${this.error} ] ${event.name}`);
    }
})

const cPath = path.join(__dirname, "..", 'Commands');

readdirSync(cPath).forEach(async(r) => {
    const cmds = readdirSync(`${cPath}`).filter((file) => file.endsWith('.ts'));
    
    for(const file of cmds){
        const { command } = require(`${cPath}/${file}`);
        try{ 
            if(this.commands.get(command.name)) return;
            this.commands.set(command.name, command)
            console.log(`[ Command ${this.success} ] ${command.name}`);
        }catch(er){
            console.log(er)
        console.log(`[ CommandError ${this.error} ] ${command.name}`);
        }
    }
})

}}

export default ExtendedClient;