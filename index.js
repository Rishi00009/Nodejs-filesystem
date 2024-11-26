// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Folder where text files will be stored
const folderPath = path.join(__dirname, 'textFiles');

// Make sure the folder exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Middleware to parse JSON request body (if needed)
app.use(express.json());

// Endpoint 1: Create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const currentDateTime = new Date().toISOString();
    const fileName = `${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;  // Replace colons and dots in the file name
    const filePath = path.join(folderPath, fileName);

    // Write the timestamp into the text file
    fs.writeFile(filePath, currentDateTime, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.status(201).send({ message: `File created successfully: ${fileName}` });
    });
});

// Endpoint 2: Retrieve all text files in the folder
app.get('/get-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files');
        }

        // Filter text files only
        const textFiles = files.filter(file => file.endsWith('.txt'));

        res.status(200).json(textFiles);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
