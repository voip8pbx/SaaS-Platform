const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join(__dirname, '..', 'src', 'app', 'client'),
    path.join(__dirname, '..', 'src', 'components', 'client'),
    path.join(__dirname, '..', 'src', 'lib', 'client'),
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
            // Replace fetch('/api/...') with fetch('/api/client/...')
            // Be careful not to replace /api/config or other superadmin ones if they were called from client?
            // Actually, the client only calls client APIs usually.
            const newContent = content.replace(/fetch\(['"]\/api\/(?!(config|mobile|generate-ai|superadmin))/g, "fetch('/api/client/");

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated API paths in ${fullPath}`);
            }
        }
    });
}

console.log('Updating API paths in client code...');
targetDirs.forEach(processDirectory);
console.log('Update complete.');
