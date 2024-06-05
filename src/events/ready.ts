import { Event } from '../types';

export const event : Event = {
    name: 'ready',
    once: true,
    execute: async () => {  // client: Client
        console.log('discord bot is ready!');
    }
};