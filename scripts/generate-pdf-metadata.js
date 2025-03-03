import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener el directorio actual con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array de colores para las cartas
const colors = [
    '#FF6B6B', // Rojo coral
    '#4ECDC4', // Turquesa
    '#45B7D1', // Azul claro
    '#96CEB4', // Verde menta
    '#FFEEAD', // Amarillo claro
    '#D4A5A5', // Rosa antiguo
    '#9B786F', // Marrón
    '#A8E6CE', // Verde agua
    '#3498DB', // Azul
    '#E74C3C', // Rojo
    '#2ECC71', // Verde
    '#F1C40F', // Amarillo
    '#9B59B6', // Púrpura
    '#1ABC9C', // Turquesa oscuro
    '#D35400', // Naranja oscuro
];

function generateMetadata() {
    const pdfDir = join(__dirname, '../static/pdfs');
    const files = readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));

    const metadata = {
        pdfs: files.map((filename, index) => {
            // Eliminar la extensión .pdf para el título
            const title = filename.replace('.pdf', '');

            return {
                id: index + 1, // Añadir un número identificador
                title: `${title}`, // No incluimos el número en el título ya que se mostrará aparte
                filename,
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                color: colors[index % colors.length], // Rotar a través de los colores
            };
        }),
    };

    // Guardar el metadata en static/pdfs.json
    writeFileSync(
        join(__dirname, '../static/pdfs.json'),
        JSON.stringify(metadata, null, 2)
    );

    console.log('Metadata generado con éxito.');
    console.log(`Se encontraron ${files.length} archivos PDF.`);
}

try {
    generateMetadata();
} catch (error) {
    console.error('Error generando metadata:', error);
    process.exit(1);
}