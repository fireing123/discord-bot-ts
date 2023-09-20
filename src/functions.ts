import { readdirSync, statSync } from 'fs';
import { join } from 'path';


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