import fs from 'fs';
import path from 'path';

const colors = [
    '#4299E1', // blue
    '#48BB78', // green
    '#F56565', // red
    '#ED8936', // orange
    '#9F7AEA', // purple
    '#38B2AC', // teal
    '#F687B3', // pink
];

function generateSlug(filename) {
    return filename
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/\.pdf$/, '');
}

function generateMetadata() {
    const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
    const files = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));

    const pdfs = files.map((filename, index) => {
        const colorIndex = index % colors.length;
        return {
            title: filename.replace(/\.pdf$/, ''),
            filename,
            slug: generateSlug(filename),
            color: colors[colorIndex]
        };
    });

    const metadata = { pdfs };
    const outputPath = path.join(process.cwd(), 'public', 'pdfs.json');
    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`Generated metadata for ${pdfs.length} PDFs`);
}

generateMetadata();