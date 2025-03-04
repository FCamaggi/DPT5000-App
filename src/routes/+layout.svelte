<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Calculator from '$lib/components/Calculator.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte'; // Asegúrate de importar el ThemeToggle

  let calculatorOpen = false;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  function toggleCalculator() {
    calculatorOpen = !calculatorOpen;
  }
</script>

<style global>
  /* Estilos corregidos para la calculadora */
  .calculator-sidebar {
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 350px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9999;
    overflow-y: auto;
  }

  .calculator-closed {
    transform: translateX(100%);
  }

  .calculator-open {
    transform: translateX(0);
  }

  /* Asegurar que el nav tenga prioridad en z-index */
  nav {
    z-index: 50;
    position: relative;
  }

  /* Espaciado entre botones */
  .nav-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  /* footer sutil */
  footer {
    background-color: var(--surface); /* Usa el color de fondo del nav */
    color: rgba(var(--base-content), 0.8); /* Aplica 80% de opacidad */
    padding: 1rem 0; /* Espaciado vertical */
    text-align: center; /* Centrar el texto */
    font-size: 0.875rem; /* Tamaño de texto pequeño */
    border-top: 1px solid var(--base-300); /* Línea sutil en la parte superior */
  }

</style>

{#if mounted}
  <main class="min-h-screen bg-background pt-16" transition:fade>
    <nav class="bg-surface p-4 shadow-md fixed top-0 left-0 w-full">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-primary">DPT5000</h1>
      </div>
    </nav>

    <!-- Botones fijos en la esquina inferior izquierda -->
    <div class="fixed bottom-4 left-4 flex flex-col gap-2 z-[9999]">
      <ThemeToggle />
      <button
        class="btn btn-primary w-32"
        on:click={toggleCalculator}
        aria-expanded={calculatorOpen}
        aria-controls="calculator-sidebar"
      >
        {calculatorOpen ? 'Cerrar' : 'Calculadora PR'}
      </button>
    </div>

    <slot />

    <!-- Calculadora Sidebar -->
    <aside
      id="calculator-sidebar"
      class="calculator-sidebar {calculatorOpen ? 'calculator-open' : 'calculator-closed'}"
      aria-label="Calculadora PR"
    >
      <div class="h-full bg-base-100 border border-base-300 rounded-bl-2xl">
        <div class="flex justify-end p-4 sticky top-0 bg-base-100 z-10 border-b border-base-300">
          <button
            class="btn btn-circle btn-ghost"
            on:click={toggleCalculator}
            aria-label="Cerrar calculadora"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Calculator />
      </div>
    </aside>
  </main>

  <!-- Footer sutil -->
  <footer class="py-4 bg-surface text-center text-sm text-base-content/80">
    Hecho con ❤️ por Fabrizio Camaggi
  </footer>
{/if}