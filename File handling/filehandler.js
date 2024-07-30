const fs = require('fs');
const path = require('path');

const commandFile = path.join(__dirname, 'command.txt');

fs.watch(commandFile, (eventType, filename) => {
    if (eventType === 'change') {
        fs.readFile(commandFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            const command = data.trim();
            executeCommand(command);
        });
    }
});

function executeCommand(command) {
    if (command.startsWith('create a file')) {
        const fileName = command.split(' ').pop();
        fs.writeFile(fileName, '', (err) => {
            if (err) console.error('Error creating file:', err);
            else console.log(`File ${fileName} created successfully.`);
        });
    } else if (command.startsWith('delete the file')) {
        const fileName = command.split(' ').pop();
        fs.unlink(fileName, (err) => {
            if (err) console.error('Error deleting file:', err);
            else console.log(`File ${fileName} deleted successfully.`);
        });
    } else if (command.startsWith('rename the file')) {
        const [oldName, newName] = command.split(' ').slice(-3, -1);
        fs.rename(oldName, newName, (err) => {
            if (err) console.error('Error renaming file:', err);
            else console.log(`File renamed from ${oldName} to ${newName} successfully.`);
        });
    } else if (command.startsWith('add to the file')) {
        const fileName = command.split(' ')[4];
        const text = command.split(fileName)[1].trim();
        fs.appendFile(fileName, text + '\n', (err) => {
            if (err) console.error('Error appending to file:', err);
            else console.log(`Text added to ${fileName} successfully.`);
        });
    } else {
        console.log('Unknown command');
    }
}

console.log('Watching for changes in command.txt...');