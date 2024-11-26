const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Folder to store text files
const folderPath = path.join(__dirname, 'files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API to create a text file with current timestamp
app.get('/create-file', (req, res) => {
  const currentDate = new Date();
  const filename = `${currentDate.toISOString()}.txt`;
  const filePath = path.join(folderPath, filename);
  const content = `Timestamp: ${currentDate.toISOString()}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating file', error: err });
    }
    res.status(200).json({ message: 'File created successfully', filename });
  });
});

// API to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading files', error: err });
    }
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    res.status(200).json({ files: txtFiles });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
