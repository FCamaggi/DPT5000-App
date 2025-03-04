<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import PdfViewer from '$lib/components/PdfViewer.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  type PDFMetadata = {
    id: number;
    title: string;
    filename: string;
    slug: string;
    color: string;
  };

  let pdfs: PDFMetadata[] = [];
  let mounted = false;
  let selectedPdf: string | null = null;
  let searchTerm = '';

  $: filteredPdfs = pdfs.filter(pdf =>
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  onMount(async () => {
    try {
      const response = await fetch('/pdfs.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }
      const data = await response.json();
      pdfs = data.pdfs || [];
      mounted = true;
    } catch (error) {
      console.error('Error loading PDFs:', error);
      pdfs = [];
    }
  });

  function openPDF(filename: string) {
    const safePath = `/pdfs/${encodeURIComponent(filename)}`;
    selectedPdf = safePath;
  }

  function closePDF() {
    selectedPdf = null;
  }
</script>

<style>
  .container-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 350px));
    gap: 1rem;
    width: 100%;
    padding: 1rem;
  }

  @media (max-width: 640px) {
    .container-grid {
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }
  }

  .card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    min-height: 120px;
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .card-body {
    padding: 1rem;
  }

  @media (max-width: 640px) {
    .card-body {
      padding: 0.75rem;
    }

    .card-title {
      font-size: 1.1rem;
    }
  }
</style>

<div class="min-h-screen bg-base-100 text-base-content">

  {#if mounted}
    <div class="w-full px-4 sm:container sm:mx-auto py-4 sm:py-8 mt-12" transition:fade>
      <!-- Barra de búsqueda -->
      <div class="mb-4 px-1">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Buscar por título..."
          class="input input-bordered w-full max-w-[350px] bg-base-200"
        />
      </div>

      <div class="container-grid">
        {#each filteredPdfs as pdf}
          <div
            role="button"
            tabindex="0"
            class="card bg-base-200 shadow-xl hover:shadow-2xl cursor-pointer w-full text-left"
            style="border-left: 4px solid {pdf.color}"
            on:click={() => openPDF(pdf.filename)}
            on:keydown={(e) => e.key === 'Enter' && openPDF(pdf.filename)}
            transition:fade
          >
            <div class="card-body">
              <div class="flex items-start gap-2">
                <span class="text-lg font-bold text-primary">#{pdf.id}</span>
                <h2 class="card-title text-base-content flex-1">{pdf.title}</h2>
              </div>
              <p class="text-base-content/60 text-sm mt-2">Click para abrir</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="flex justify-center items-center min-h-[50vh]">
      <div class="loading loading-spinner loading-lg text-primary"></div>
    </div>
  {/if}

  {#if selectedPdf}
    <div class="pdf-viewer-container {selectedPdf ? '' : 'hidden'}">
      <PdfViewer url={selectedPdf} onClose={closePDF} />
    </div>
  {/if}
</div>