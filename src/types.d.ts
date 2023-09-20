import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, Collection } from 'discord.js';

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number
}

export interface Event {
    name: string,
    once?: boolean,
    execute: (...args) => void
}

export interface RestCommandData {
    id: string,
    name: string,
    description: string,
    length: number
}

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, SlashCommand>
    }
}