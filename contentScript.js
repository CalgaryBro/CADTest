// contentScript.js
// This file contains the code that interacts with the webpage and renders the CAD file.

// Create a container element for the CAD model
const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.zIndex = '999999';
document.body.appendChild(container);

// Load Three.js library
const script = document.createElement('script');
script.src = chrome.runtime.getURL('lib/three.js');
script.onload = function () {
  // Three.js library is loaded and ready to use
  // You can now use Three.js code in your content script

  // Function to render the CAD file
  function renderCADFile(content) {
    // Parse the CAD file content and extract the necessary information
    // You'll need to use a library or implement the parsing logic yourself

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create a scene and a camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Load the CAD file (example: STL format)
    const loader = new THREE.STLLoader();
    const geometry = loader.parse(content);

    // Create a material and a mesh
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animate the CAD model
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }

  // Listen for messages from the extension popup
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'renderCAD') {
      renderCADFile(message.content);
    }
  });
};

// Append the Three.js script to the document body
document.body.appendChild(script);
