document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
  });
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const content = event.target.result;
        // Send the CAD file content to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: renderCADFile,
            args: [content]
          });
        });
      };
      reader.readAsText(file);
    }
  }
  
  function renderCADFile(content) {
    // Handle the rendering of the CAD file in the browser
    // You'll need to write the code to render the CAD file based on the file format (e.g., STL)
  }
  