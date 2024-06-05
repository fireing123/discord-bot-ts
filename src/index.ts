import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';
import { checkEnv, executeFile } from './functions';
import { SlashCommand, Event } from './types';

config();

const client = new Client({
    intents: []
});

client.commands = new Collection<string, SlashCommand>();

const login = async (token: string | undefined) => {
    checkEnv([
        'TOKEN',
        'CLIENT_ID'
    ]);

    await executeFile('/commands', (file) => {
        const command : SlashCommand = file.command;
        if ('command' in command && 'execute' in command) {
            client.commands.set(command.command.name, command);
        } else {
            throw Error('requred command and execute');
        }
    });

    await executeFile('/events', (file) => {
        const event : Event = file.event;
        if (typeof event?.once == 'boolean' && event?.once) {
            client.once(event.name, event.execute);
        } else {
            client.on(event.name, event.execute);
        }
    });

    client.login(token);
};

login(process.env.TOKEN);