import { Command } from './../Interfaces';

export const command: Command = {
    name: 'help',
    execute: async(client, message, args) => {
       message.channel.send(client.buildEmbed(`Help`, `${client.config.prefix}ping`, `BLURPLE`, null, message.author.avatarURL({ dynamic: true }), client.user.avatarURL(), `XD`))
    }
}