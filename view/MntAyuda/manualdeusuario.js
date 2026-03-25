function descargarArchivo() {
    // 1. Crear el contenido (ejemplo)
    const contenido = "Contenido del archivo de texto";
    const blob = new Blob([contenido], { type: 'text/plain' });

    // 2. Crear un enlace temporal
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'archivo_dinamico.txt'; // Nombre de descarga

    // 3. Simular clic y limpiar
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url); // Liberar memoria
    document.body.removeChild(a);
}