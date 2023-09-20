import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { executeFile }  from './functions';
import { SlashCommand } from './types';
import { config } from 'dotenv';

config();

const {
    TOKEN,
    CLIENT_ID
} = process.env;

if (typeof TOKEN != 'string') throw Error('token is not defined');
if (typeof CLIENT_ID != 'string') throw Error('client id is not defined');

const rest = new REST().setToken(TOKEN);
const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

(async () => {
    await executeFile('/commands', (file) => {
        const command : SlashCommand = file.command;
        if ('command' in command && typeof command.execute == 'function') {
            commands.push(command.command.toJSON());
        } else {
            throw Error(' not include command or execute');
        }
    });
})().then(async () => {
    console.log(`Started refreshing ${commands.length} application (/) commands.`); 

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
});