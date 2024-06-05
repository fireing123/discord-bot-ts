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
    execute: (...args) => Promise
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

// process.env as unkown as TypeCheckedEnv 
// 이미 검사함 undefined 일수 없음 ! 을 제거함
export interface TypeCheckedEnv {

}