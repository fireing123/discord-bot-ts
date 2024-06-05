import { Channel, ChannelManager, ChannelType, Guild, GuildChannelManager, GuildMember, NewsChannel, StageChannel, TextChannel, ThreadChannel, VoiceChannel } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function getChannelTypeof<T extends Channel>(
    channels: GuildChannelManager | ChannelManager,
    id: string
): Promise<T> {
    const channel = await channels.fetch(id);
    if (channel == null) {
        throw Error('undefined channel by id: ' + id);
    }

    if (channel.type === ChannelType.GuildText && (channel instanceof TextChannel)) {
        return channel as T;
    }
    if (channel.type === ChannelType.GuildVoice && (channel instanceof VoiceChannel)) {
        return channel as T;
    }
    if (channel.type === ChannelType.GuildNews && (channel instanceof NewsChannel)) {
        return channel as T;
    }
    if (channel.type === ChannelType.GuildCategory && (channel instanceof ThreadChannel)) {
        return channel as T;
    }
    if (channel.type === ChannelType.GuildStageVoice && (channel instanceof StageChannel)) {
        return channel as T;
    }
    if (channel.type === ChannelType.PrivateThread || channel.type === ChannelType.PublicThread && channel instanceof ThreadChannel) {
        return channel as T;
    }
    throw Error('채널타입이 다름');
}

export async function getRoleGuild(guild: Guild, id: string) {
    const role = await guild.roles.fetch(id);
    if (role == null) {
        throw Error('role undefined id');
    } else {
        return role;
    }
}

export function getRoleState(oldMember: GuildMember, newMember: GuildMember, id: string) {
    const hasRoleByOldMember = oldMember.roles.cache.has(id);
    const hasRoleByNewMember = newMember.roles.cache.has(id);

    if (hasRoleByOldMember) {
        if (hasRoleByNewMember) {
            return 'has';
        } else {
            return 'sub';
        }
    } else {
        if (hasRoleByNewMember) {
            return 'add';
        } else {
            return 'none';
        }
    }
}

export function isMemberHasRole(member: GuildMember, id: string) {
    return member.roles.cache.has(id);
}

export function checkEnv(envList: string[]) {
    const nullEnv = envList.filter(element => {
        if (process.env[element] == undefined) {
            return true;
        }
        return false;
    });
    if (nullEnv.length != 0) {
        throw Error(nullEnv.join(', ') + ' 결핍');
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeFile = async (path : string, func : (file: any) => void) => {
    const files: string[] = readdirSync(__dirname+path);
    
    for (const file of files) {
        const filePath = join(__dirname+path, file);

        if (statSync(filePath).isDirectory()) {
            await executeFile(filePath, func);
        } else if (file.endsWith('.js')) {
            const file = await require(filePath);
            func(file);
        }
    }
};