import { Command } from './../Interfaces';

export const command: Command = {
    name: 'ping',
    execute: async(client, message, args) => {
        const msg = await message.channel.send(`Pinging...`);
        return msg.edit(`Pong **${client.ws.ping}**!`);
    }
}