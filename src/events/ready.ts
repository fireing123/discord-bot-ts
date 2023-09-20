import { Event } from '../types';

export const event : Event = {
    name: 'ready',
    once: true,
    execute: () => {
        console.log('discord bot is ready!');
    }
};