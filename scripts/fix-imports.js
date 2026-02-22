const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'app', 'client');
const clientComponentsDir = path.join(__dirname, '..', 'src', 'components', 'client');

const replacements = [
    { from: /@\/components\//g, to: '@/components/client/' },
    { from: /@\/lib\//g, to: '@/lib/client/' },
    { from: /@\/models\//g, to: '@/models/client/' },
    { from: /@\/types\//g, to: '@/types/client/' },
    { from: /@\/config\//g, to: '@/config/client/' },
    { from: /@\/data\//g, to: '@/data/client/' },
];

function processDirectory(directory) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;
            replacements.forEach(r => {
                newContent = newContent.replace(r.from, r.to);
            });
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated imports in ${fullPath}`);
            }
        }
    });
}

console.log('Starting import fix for client app...');
processDirectory(targetDir);
processDirectory(clientComponentsDir);
processDirectory(path.join(__dirname, '..', 'src', 'lib', 'client'));
console.log('Import fix complete.');
