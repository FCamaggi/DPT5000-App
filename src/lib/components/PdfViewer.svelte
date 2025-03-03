<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  let pdfjsLib: any;

  export let url: string;
  export let onClose: () => void;

  let container: HTMLDivElement;
  let pageNum = 1;
  let numPages = 0;
  let scale = 1;
  let pdfDoc: any = null;
  let loading = true;

  // Función para deshabilitar el scroll del body
  function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  }

  // Función para habilitar el scroll del body
  function enableBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  

  async function initPdfjs() {
    const pdfjsScript = document.createElement('script');
    pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    
    await new Promise((resolve) => {
      pdfjsScript.onload = resolve;
      document.head.appendChild(pdfjsScript);
    });

    // @ts-ignore
    pdfjsLib = window.pdfjsLib;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  async function calculateInitialScale(page: any) {
    const viewport = page.getViewport({ scale: 1 });
    const containerWidth = container.clientWidth - 40;
    return containerWidth / viewport.width; // Simplificado para usar solo el ancho
  }

  async function loadPDF() {
    try {
      loading = true;
      if (!pdfjsLib) {
        await initPdfjs();
      }
      
      // Cargar el documento
      pdfDoc = await pdfjsLib.getDocument(url).promise;
      numPages = pdfDoc.numPages;
      
      if (container) {
        const page = await pdfDoc.getPage(pageNum);
        scale = await calculateInitialScale(page);
        await renderPage();
      }
    } catch (error) {
      console.error('Error loading PDF:', error);
    } finally {
      loading = false;
    }
  }

  async function renderPage() {
    if (!pdfDoc || !container) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(canvas);

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }

  function zoomIn() {
    scale = Math.min(scale + 0.2, 3);
    renderPage();
  }

  function zoomOut() {
    scale = Math.max(scale - 0.2, 0.4);
    renderPage();
  }

  function prevPage() {
    if (pageNum > 1) {
      pageNum--;
      renderPage();
    }
  }

  function nextPage() {
    if (pageNum < numPages) {
      pageNum++;
      renderPage();
    }
  }

  function handleResize() {
    if (pdfDoc && container) {
      loadPDF();
    }
  }

  function handleClose() {
    enableBodyScroll();
    onClose();
  }

  function fitToWidth() {
  if (!pdfDoc || !container) return;
  
  pdfDoc.getPage(pageNum).then((page: any) => {
    const viewport = page.getViewport({ scale: 1 });
    const containerWidth = container.clientWidth - 40;
    scale = containerWidth / viewport.width;
    renderPage();
  }); 
  }

  // Observar cambios en el contenedor
  $: if (container && pdfDoc) {
    renderPage();
  }

  onMount(() => {
    disableBodyScroll();
    loadPDF();
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
    enableBodyScroll();
    window.removeEventListener('resize', handleResize);
  });
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
  <div class="bg-base-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
    <!-- Encabezado con controles de zoom y cierre -->
    <div class="p-4 flex justify-between items-center border-b border-base-300">
      <div class="flex items-center space-x-2">
        <button 
          class="btn btn-circle btn-sm" 
          on:click={zoomOut}
          disabled={loading || scale <= 0.4}
          aria-label="Reducir zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="btn btn-circle btn-sm" 
          on:click={zoomIn}
          disabled={loading || scale >= 3}
          aria-label="Aumentar zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="btn btn-circle btn-sm" 
          on:click={fitToWidth}
          disabled={loading}
          aria-label="Ajustar al ancho"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 8V4m0 0h4M4 4l5 5m11-1h-4m4 0V4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5h-4m0 0v-4"/>
          </svg>
        </button>
      </div>
      <button 
        class="btn btn-circle btn-sm" 
        on:click={handleClose}
        aria-label="Cerrar visor"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Área del PDF -->
    <div class="flex-1 overflow-auto p-4 bg-base-200">
      {#if loading}
        <div class="w-full h-full flex items-center justify-center">
          <div class="loading loading-spinner loading-lg text-primary"></div>
        </div>
      {:else}
        <div bind:this={container} class="w-full h-full flex justify-center bg-base-100 rounded-lg"></div>
      {/if}
    </div>

    <!-- Pie de página con controles de navegación -->
    <div class="p-4 border-t border-base-300 flex justify-center items-center space-x-4">
      <button 
        class="btn btn-circle btn-sm" 
        on:click={prevPage} 
        disabled={pageNum <= 1 || loading}
        aria-label="Página anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <span class="text-base-content">
        {#if loading}
          Cargando...
        {:else}
          Página {pageNum} de {numPages}
        {/if}
      </span>
      <button 
        class="btn btn-circle btn-sm" 
        on:click={nextPage} 
        disabled={pageNum >= numPages || loading}
        aria-label="Página siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</div>