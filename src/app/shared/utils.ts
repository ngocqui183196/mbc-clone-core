import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';

async function renderPdf() {
    const pdf = await pdfjsLib.getDocument('/assets/images/request.pdf').promise;
    const page = await pdf.getPage(1);

    const scale = 1.2;
    const viewport = page.getViewport({ scale });

    const canvas = document.getElementById('pdfCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
        canvasContext: context,
        canvas: canvas,
        viewport: viewport,
    }).promise;
}

renderPdf();
