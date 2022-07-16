const input = document.querySelector('#subirimgs');

// Listen for files selection
input.addEventListener('change', (e) => {
    // Retrieve all files
    const files = input.files;

    // Check files count
    if (files.length > 4) {
        alert(`Solo puedes subir 4 imagenes.`);
        return;
    }

    // TODO: continue uploading on server