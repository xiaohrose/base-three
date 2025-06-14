import * as fs from 'fs';
import * as path from 'path';
// Function to parse command-line arguments
function parseCommandLineArgs() {
    const args = process.argv.slice(2);
    const options: { [key: string]: string } = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].substring(2);
            const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
            options[key] = value;
            if (value !== 'true') i++; // Skip the value
        }
    }

    return options;
}

// Example usage of the function
const cliArgs = parseCommandLineArgs();

const sourceDir = path.resolve(__dirname, '../template');
const targetDir = path.resolve(process.cwd());

// Function to copy files and directories recursively
function copyFolderSync(source: string, target: string, pn: string) {
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
            copyFolderSync(sourcePath, targetPath, pn);
        } else {
            if (item === 'package.json') {
                const packageJson = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
                packageJson.name = pn;
                fs.writeFileSync(targetPath, JSON.stringify(packageJson, null, 2), 'utf-8');
            } else {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    }
}



export default (args: any[]) => {
    let packageName: string = 'threejs-demo';

    if (args.length > 0) {
        packageName = args[0]
    }

    // Copy the template folder to the current directory
    copyFolderSync(sourceDir, targetDir, packageName);
    console.log('Template folder copied successfully.');
}