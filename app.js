// Fetch the list of text files from the API
document.getElementById('fetch-files-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/get-files');
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    
    const data = await response.json();
    
    // Get the file list container
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';  // Clear previous list
    
    // Loop through the files and add them to the list
    data.files.forEach(file => {
      const li = document.createElement('li');
      li.textContent = file;
      fileList.appendChild(li);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});
