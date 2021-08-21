import { Event } from '../InterFaces';

export const event: Event = {
    name: 'ready',
    execute: (client) => {
        console.log(`[ Logged In ] Logged in as ${client.user.tag} at ${new Date().toLocaleTimeString()}`);
    }
}