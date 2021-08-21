import { Event, Command } from "../Interfaces";
import { Message } from "discord.js";

export const event: Event = {
    name: 'message',
    execute: (client, message: Message) => {
        if(message.author.bot) return;
        if(!message.guild) return message.reply(`I'm not responding in dms please use me in to a guild!`);
        if(!message.content?.toLowerCase().startsWith(client.config.prefix)) return;
        
        const args = message.content.slice(client.config.prefix.length).trim().split(/ + /g);

        const cmd = args.shift().toLowerCase();
        if(!cmd) return message.reply(`This command does not exist!`);
        const command = client.commands.get(cmd);
        if(command) (command as Command).execute(client, message, args);
        console.log(`${message.author.tag} (${message.author.id}) Used Command ${command.name}`);
    }
}