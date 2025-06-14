import * as fs from 'fs';
import * as path from 'path';

const sourceDir = path.resolve(__dirname, '../template');
const targetDir = path.resolve(process.cwd());

// Function to copy files and directories recursively
function copyFolderSync(source: string, target: string) {
    if (!fs.existsSync(source)) {
        console.error(`Source directory "${source}" does not exist.`);
        return;
    }

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const items = fs.readdirSync(source);
    for (const item of items) {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);

        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyFolderSync(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

// Copy the template folder to the current directory
copyFolderSync(sourceDir, targetDir);

console.log('Template folder copied successfully.');